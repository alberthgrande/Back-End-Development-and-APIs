import express from "express";

// Import route
import taskRoutes from "./routes/task.route.js";

const app = express();
app.use(express.json());

// app.use("/", (req, res) => {
//   res.json({ message: "API CONNECTED" });
// });

// Use route
app.use("/tasks", taskRoutes);

export default app;
