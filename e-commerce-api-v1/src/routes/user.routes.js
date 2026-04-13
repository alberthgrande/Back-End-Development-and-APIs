import express from "express";
import { getProfile, getAllUsers } from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET CURRENT USER PROFILE
router.get("/me", authMiddleware, getProfile);

// GET ALL USERS (ADMIN STYLE BASIC)
router.get("/", getAllUsers);

export default router;
