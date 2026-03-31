const express = require("express");
const taskRoute = require("./routes/task.route");

const app = express();
app.use(express.json());

app.use("/task", taskRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;
