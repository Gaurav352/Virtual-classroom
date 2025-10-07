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
import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vectorStoresPath = path.join(__dirname, "..", "..", "vector_stores");
if (!fs.existsSync(vectorStoresPath)) {
  fs.mkdirSync(vectorStoresPath, { recursive: true });
}


export const uploadDocument = async (req, res) => {
  if (!req.file || !req.body.username) {
    return res.status(400).json({ error: "No PDF file or username provided." });
  }

  try {
    const { username } = req.body;
    const { originalname } = req.file;

    const loader = new PDFLoader(new Blob([req.file.buffer]));
    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splitDocs = await splitter.splitDocuments(docs);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "text-embedding-004", // The latest model
    });

    const vectorstore = await FaissStore.fromDocuments(splitDocs, embeddings);
    const storePath = path.join(vectorStoresPath, `${Date.now()}-${originalname}.faiss`);
    await vectorstore.save(storePath);

    const newDocument = new Document({
      username: username,
      originalFilename: originalname,
      faissStorePath: storePath,
    });
    await newDocument.save();

    res.status(201).json({ message: "PDF processed and saved.", document: newDocument });
  } catch (error) {
    console.error("Error during upload:", error);
    res.status(500).json({ error: "Failed to process PDF." });
  }
};

export const askQuestion = async (req, res) => {


  try {
    console.log(req.body);
    const { question, documentId } = req.body;
    if (!question || !documentId) {
      return res.status(400).json({ error: "Question and documentId are required." });
    }
    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ error: "Document not found." });
    }
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "text-embedding-004",
    });
    const vectorstore = await FaissStore.load(doc.faissStorePath, embeddings);

   
    console.log("GOOGLE_API_KEY loaded:", process.env.GOOGLE_API_KEY,question);
    const llm = new ChatGoogleGenerativeAI({
      apiKey:'AIzaSyBXh5r976JV1H6B0Q7HAeDBD-Pbpz5kLCk',
      
      model: "gemini-2.0-flash-lite", // Use a powerful Gemini model
    });
    //console.log(llm);

    const prompt = ChatPromptTemplate.fromTemplate(
      `Answer the user's question based only on the following context:\n\n<context>{context}</context>\n\nQuestion: {input}`
    );
    const combineDocsChain = await createStuffDocumentsChain({ llm, prompt });
    const retriever = vectorstore.asRetriever();
    const retrievalChain = await createRetrievalChain({ retriever, combineDocsChain });

    const result = await retrievalChain.invoke({ input: question });
    res.status(200).json({ answer: result.answer });
  } catch (error) {
    console.error("Error during question answering:", error);
    res.status(500).json({ error: "Failed to get an answer." });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ username: req.params.username });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
};