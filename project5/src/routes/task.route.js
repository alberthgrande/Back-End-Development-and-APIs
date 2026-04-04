const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const asyncHandler = require("../middlewares/asyncHandler");

router.post("/", asyncHandler(taskController.create));
router.get("/", asyncHandler(taskController.getAll));
router.get("/:id", asyncHandler(taskController.getOne));
router.put("/:id", asyncHandler(taskController.update));
router.delete("/:id", asyncHandler(taskController.delete));

module.exports = router;
