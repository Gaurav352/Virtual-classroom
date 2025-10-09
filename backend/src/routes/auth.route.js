import express from "express";
import { register, login, logout, me } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Routes
router.post("/signup", register);
router.post("/login", login);
router.post("/logout", authMiddleware,logout);
router.get("/me",authMiddleware, me);

export default router;
