import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  createUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.post("/users/batch", createUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
