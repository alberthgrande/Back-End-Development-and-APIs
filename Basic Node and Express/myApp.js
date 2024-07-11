let express = require("express");
const path = require("path");
const dotenv = require("dotenv"); // Import dotenv package
const bodyParser = require("body-parser");

let app = express();

dotenv.config();

module.exports = app;

// Logger middleware function
const loggerMiddleware = (req, res, next) => {
  // Extract method, path, and IP from the request object
  const { method, path, ip } = req;
  // Log the request details to the console
  console.log(`${method} ${path} - ${ip}`);
  // Call next middleware in the chain
  next();
};

// Middleware to log every request
app.use(loggerMiddleware);

// Middleware to serve static files from /public directory
app.use("/public", express.static(__dirname + "/public"));

// Route to serve index.html file
app.get("/", (req, res) => {
  const absolutePath = path.join(__dirname, "views", "index.html");
  res.sendFile(absolutePath);
});

// Route to handle /json endpoint
app.get("/json", (req, res) => {
  let message = "Hello json";

  // call the .env
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message: message });
});

// Middleware function to add current time to req.time
const addCurrentTime = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

// Route handler for /now with chained middleware
app.get("/now", addCurrentTime, (req, res) => {
  res.json({ time: req.time });
});

// api route for word
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

// Use body-parser middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
// Your routes go here
app.post("/bodyParser", (req, res) => {
  // Access parsed data using req.body
  res.send(`Data received: ${JSON.stringify(req.body)}`);
});

// api route for name
app
  .route("/name")
  .get((req, res) => {
    const firstname = req.query.first;
    const lastname = req.query.last;
    const name = `${firstname} ${lastname}`;
    res.json({ name: name });
  })
  .post((req, res) => {
    const firstname = req.body.first;
    const lastname = req.body.last;
    const name = `${firstname} ${lastname}`;
    res.json({ name: name });
  });
