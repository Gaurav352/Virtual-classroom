import express from "express";
import multer from "multer";
import {
  uploadDocument,
  getDocuments,
  askQuestion,
} from "../controllers/document.controller.js";
import { explainDocument } from "../controllers/explainDocument.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
  
// 📚 Upload a PDF
router.post("/upload", upload.single("pdf"), uploadDocument);

// 🗂️ Get all documents for a user
// Route param matches controller
router.get("/documents/:username", getDocuments);

// ❓ Ask a question about a document
router.post("/ask", askQuestion);

// 🧠🎙️ Explain part of a document (Gemini + Murf)
router.post("/explain", explainDocument);

export default router;
