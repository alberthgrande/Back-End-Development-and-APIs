import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { refresh } from "../controllers/token.controller.js";
import { logout } from "../controllers/logout.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
