import express from "express";
import cors from "cors";

// routes would be imported and used here
import userRouter from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

// api routes would be used here
app.use("/api/users", userRouter);

export default app;
