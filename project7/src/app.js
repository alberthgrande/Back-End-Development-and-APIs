import express from "express";
import cors from "cors";
import pool from "./config/db.js";

// import routes
import taskRouter from "./routes/task.route.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// tasks route
app.use("/api", taskRouter);

// Global error handler must come after routes
app.use(errorHandler);

export default app;
