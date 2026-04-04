import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

app.use(express.json());

import authRoutes from "./routes/auth.route.js";

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log(`Server running... ${3000}`);
});
