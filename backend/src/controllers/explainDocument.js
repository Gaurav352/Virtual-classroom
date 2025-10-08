import axios from "axios";
import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import Document from "../models/document.model.js";

export const explainDocument = async (req, res) => {
  try {
    const { topic, documentId } = req.body;

    if (!topic || !documentId)
      return res.status(400).json({ error: "Topic and documentId required" });

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
      `You are a friendly virtual teacher.
       Explain the following topic clearly and engagingly.
       Use simple language, examples, and analogies.
       <context>{context}</context>
       Topic: {input}`
    );

    const combineDocsChain = await createStuffDocumentsChain({ llm, prompt });
    const retrievalChain = await createRetrievalChain({
      retriever,
      combineDocsChain,
    });

const result = await retrievalChain.invoke({ input: topic });
let explanationText = result.answer;

if (explanationText.length > 3000) {
  explanationText = explanationText.slice(0, 3000);

  const lastPeriod = explanationText.lastIndexOf(".");
  if (lastPeriod > 0) {
    explanationText = explanationText.slice(0, lastPeriod + 1);
  }
}

if (!explanationText || explanationText.trim().length === 0) {
  return res.status(500).json({ error: "Gemini returned no content" });
}

    try {
      // const murfResponse = await axios.post(
      //   "https://api.murf.ai/v1/speech/generate",
      //   {
      //     voice_id: "en-US", 
      //     format: "MP3",
      //     text: explanationText,
      //     speaking_rate: 1.0,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "api-key": process.env.MURF_API_KEY,
      //     },
      //   }
      // );

      const data = {
        text: explanationText,
        voiceId: "en-US-natalie",
        format: "MP3",
        channelType: "MONO",
        sampleRate: 44100,
      };
      const murfResponse=await axios
        .post ("https://api.murf.ai/v1/speech/generate", data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "api-key": process.env.MURF_API_KEY,
          },
        })


      const audioUrl =
        murfResponse.data.audioFile ||
        "No audio URL returned";

      res.status(200).json({
        explanation: explanationText,
        audioUrl,
      });
    } catch (murfError) {
      return res.status(500).json({
        error: "Murf API failed",
        details: murfError.response?.data || murfError.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to generate explanation" });
  }
};
