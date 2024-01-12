var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer"); // Middleware for handling file uploads
const upload = multer().single("upfile"); // Configuring multer to handle a single file upload

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res, next) => {
  // Handling POST requests to the "/api/fileanalyse" URL
  upload(req, res, (err) => {
    if (err) {
      // Handling file upload error
      return res.status(400).json({ error: "File upload failed" }); // Sending an error response if file upload fails
    }

    // File upload successful, process the file
    const { originalname, mimetype, size } = req.file; // Extracting file information from the request object
    res.json({ name: originalname, type: mimetype, size }); // Sending a JSON response with the file information
  });
});

const port = process.env.PORT || 3000; // Setting the port for the application to listen on
app.listen(port, function () {
  console.log("Your app is listening on port " + port); // Logging a message when the application starts listening
});