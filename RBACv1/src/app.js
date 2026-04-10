import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import roleRoutes from "./routes/role.routes.js";
import userRoutes from "./routes/user.routes.js";
import permissionRoutes from "./routes/permission.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/roles", roleRoutes);
app.use("/users", userRoutes);
app.use("/permissions", permissionRoutes);

export default app;
