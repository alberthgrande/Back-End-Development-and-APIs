import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running 🚀" });
});

app.use("/api", userRoutes);

export default app;
