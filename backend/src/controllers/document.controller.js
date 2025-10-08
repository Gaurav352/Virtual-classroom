import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Document from "../models/document.model.js";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vectorStoresPath = path.join(__dirname, "..", "..", "vector_stores");
if (!fs.existsSync(vectorStoresPath)) {
  fs.mkdirSync(vectorStoresPath, { recursive: true });
}

// ✅ Upload PDF
export const uploadDocument = async (req, res) => {
  if (!req.file || !req.body.username) {
    return res.status(400).json({ error: "No PDF file or username provided." });
  }

  try {
    const { username } = req.body;
    const { originalname } = req.file;

    // Save temp PDF file (Node 18+ compatible)
    const tempPath = path.join(__dirname, `${Date.now()}-${originalname}`);
    fs.writeFileSync(tempPath, req.file.buffer);

    const loader = new PDFLoader(tempPath);
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splitDocs = await splitter.splitDocuments(docs);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "text-embedding-004",
    });

    const vectorstore = await FaissStore.fromDocuments(splitDocs, embeddings);
    const storePath = path.join(vectorStoresPath, `${Date.now()}-${originalname}.faiss`);
    await vectorstore.save(storePath);

    const newDocument = new Document({
      username,
      originalFilename: originalname,
      faissStorePath: storePath,
    });
    await newDocument.save();

    // Delete temp PDF file
    fs.unlinkSync(tempPath);

    res.status(201).json({ message: "PDF processed and saved.", document: newDocument });
  } catch (error) {
    console.error("Error during upload:", error.message);
    res.status(500).json({ error: "Failed to process PDF." });
  }
};

// ✅ Ask a question about the PDF
export const askQuestion = async (req, res) => {
  try {
    const { question, documentId } = req.body;
    if (!question || !documentId) {
      return res.status(400).json({ error: "Question and documentId are required." });
    }

    const doc = await Document.findById(documentId);
    if (!doc) return res.status(404).json({ error: "Document not found." });

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "text-embedding-004",
    });

    const vectorstore = await FaissStore.load(doc.faissStorePath, embeddings);
    const llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-2.0-flash-lite",
    });

    const prompt = ChatPromptTemplate.fromTemplate(
      `Answer the user's question based only on the following context:\n\n<context>{context}</context>\n\nQuestion: {input}`
    );

    const combineDocsChain = await createStuffDocumentsChain({ llm, prompt });
    const retriever = vectorstore.asRetriever();
    const retrievalChain = await createRetrievalChain({ retriever, combineDocsChain });

    const result = await retrievalChain.invoke({ input: question });
    res.status(200).json({ answer: result.answer });
  } catch (error) {
    console.error("Error during question answering:", error.message);
    res.status(500).json({ error: "Failed to get an answer." });
  }
};

// ✅ Get all documents for a user
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ username: req.params.username });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error.message);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
};

// ✅ Explain a topic and generate audio with Murf
export const explainDocument = async (req, res) => {
  try {
    const { topic, documentId } = req.body;
    if (!topic || !documentId) return res.status(400).json({ error: "Topic and documentId required" });

    const doc = await Document.findById(documentId);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "text-embedding-004",
    });

    const vectorstore = await FaissStore.load(doc.faissStorePath, embeddings);

    const llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-2.0-flash-lite",
    });

    const retriever = vectorstore.asRetriever();
    const prompt = ChatPromptTemplate.fromTemplate(
      `You are a virtual narrator for students.
       Explain the following topic in a simple, engaging, teacher-like tone.
       Use examples and analogies if needed.
       <context>{context}</context>
       Topic: {input}`
    );

    const combineDocsChain = await createStuffDocumentsChain({ llm, prompt });
    const retrievalChain = await createRetrievalChain({ retriever, combineDocsChain });

    const result = await retrievalChain.invoke({ input: topic });
    const explanationText = result.answer;

    const murfResponse = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      { voiceId: "en-US-jenny", format: "mp3", text: explanationText },
      { headers: { "Content-Type": "application/json", "api-key": process.env.MURF_API_KEY } }
    );

    res.status(200).json({ explanation: explanationText, audioUrl: murfResponse.data.audioUrl });
  } catch (error) {
    console.error("Error generating explanation:", error.message);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
};
