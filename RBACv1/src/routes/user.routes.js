import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { authorizePermissions } from "../middlewares/permission.middleware.js";

const router = express.Router();

router.get(
  "/user",
  authenticate,
  authorizeRoles("admin"),
  authorizePermissions("read_users"),
  getUsers,
);

export default router;
