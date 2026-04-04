import express from "express";
import * as taskController from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", taskController.controllerAll);
router.post("/", taskController.controllerCreate);
router.get("/:id", taskController.controllerGetOne);
router.put("/:id", taskController.controllerUpdate);
router.delete("/:id", taskController.controllerDelete);

export default router;
