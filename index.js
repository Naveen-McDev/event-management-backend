//express package
const express = require("express");
//dotenv package
require("dotenv").config();
//importing database config file from database folder
const dbConnection = require("./database/config");
//cors package
const cors = require("cors");
//path
const path = require("path");

//PORT for running the web server
const PORT = process.env.PORT || 5000;

// Server
const app = express();

// Database
dbConnection();

// Cors
app.use(cors({origin: '*'}));

// Public path
app.use(express.static("public"));

// Read and parse body
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events.js"));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/public/index.html"));
// });

// Listening PORT
app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
