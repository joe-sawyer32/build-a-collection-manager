// IMPORTS
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const DB = albumDB;
const dbUrl = `mongodb://localhost:27017/${DB}`;
const Album = require(path.join(__dirname, "/models/Album"));

//MIDDLEWARE
app.use(bodyParser.json());

// CONNECT TO DB
mongoose.connect(dbUrl).then((error, db) => {
  if (error) {
    res.send(`Error In Connecting To Database ${DB}: `, error);
  }
  console.log(`Connected to ${DB}`);
});

//ROUTES
app.listen(port, () => {
  console.log(`Spinning with express: Port ${port}`);
});
