import express from "express";
import { signupUser, loginUser, logoutUser, getMe } from "../controllers/auth.controller.js";

const router = express.Router();

// Routes
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", getMe);

export default router;
