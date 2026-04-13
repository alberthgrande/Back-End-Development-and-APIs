import express from "express";
import {
  register,
  login,
  updatePassword,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// protected
router.put("/password", authMiddleware, updatePassword);

export default router;
