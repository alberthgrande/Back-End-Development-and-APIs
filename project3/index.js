const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create-user", (req, res) => {
  const data = req.body;

  // validate the data is an object

  if (data.constructor !== Object) {
    res.status(400).send("Invalid data format. Expected an object.");
    return;
  }

  // validate the required fields are present
  const { name, age, hobbies } = data;
  if (!name || name.constructor !== String) {
    res
      .status(400)
      .send("Invalid data format. 'name' is required and should be a string.");
  }
  if (!age || age.constructor !== Number) {
    res
      .status(400)
      .send("Invalid data format. 'age' is required and should be a number.");
    return;
  }
  if (!hobbies || hobbies.constructor !== Array) {
    res
      .status(400)
      .send(
        "Invalid data format. 'hobbies' is required and should be an array.",
      );
    return;
  }

  // all checks passed, send a success response
  return res.status(200).send({ message: "User created successfully", data });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
