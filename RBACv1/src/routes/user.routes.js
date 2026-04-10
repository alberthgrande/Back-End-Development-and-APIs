import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { authorizePermissions } from "../middlewares/permission.middleware.js";

const router = express.Router();

router.get(
  "/user",
  authenticate,
  authorizeRoles("admin"),
  authorizePermissions("read"),
  userController.getUsers,
);

// update user
router.put(
  "/admin/:id",
  authenticate,
  authorizeRoles("admin"),
  userController.updateUser,
);

// delete user
router.delete(
  "/admin/:id",
  authenticate,
  authorizeRoles("admin"),
  userController.deleteUser,
);

export default router;
