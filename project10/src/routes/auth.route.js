import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendStatus(202);
});

router.post("/register", register);
router.post("/login", login);

router.get("/user", authenticate, (req, res) => {
  res.json({ message: "Hello User", user: req.user });
});

router.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Hello admin", role: req.role });
});
export default router;
