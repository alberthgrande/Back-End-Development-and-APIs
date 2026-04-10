import express from "express";
import {
  createPermission,
  assignPermission,
} from "../controllers/permission.controller.js";

const router = express.Router();

router.post("/", createPermission);
router.post("/assign", assignPermission);

export default router;
