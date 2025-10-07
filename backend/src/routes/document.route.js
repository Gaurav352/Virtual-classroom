import express from "express";
import multer from "multer";
import {
  uploadDocument,
  getDocuments,
  askQuestion,
} from "../controllers/document.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the routes
router.post("/upload", upload.single("pdf"), uploadDocument);
router.get("/documents/:id", getDocuments);
router.post("/ask", askQuestion);

export default router;