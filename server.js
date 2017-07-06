// IMPORTS
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const DB = "albumDB";
const dbUrl = `mongodb://localhost:27017/${DB}`;
const Album = require(path.join(__dirname, "/models/Album"));

// SET VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "/views"));

// MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));

// CONNECT TO DB
mongoose.connect(dbUrl).then((error, db) => {
  if (error) {
    res.send(`Error In Connecting To Database ${DB}: `, error);
  }
  console.log(`Connected to ${DB}`);
});

//ROUTES
app.get("/albums", (req, res) => {
  res.render("index");
});

app.get("/albums/add", (req, res) => {
  res.render("add");
});

app.get("/albums/:id", (req, res) => {});

app.post("/albums", (req, res) => {
  let albumData = req.body;
  let favorites = albumData.favorites.reduce((items, item) => items + item);
  // if any favorites, parse to model format
  if (favorites) {
    let formattedFavs = [];
    for (let i = 0; i < albumData.favorites.length; i++) {
      let favsObj = {};
      favsObj.track = albumData.favorites[i++];
      favsObj.title = albumData.favorites[i];
      formattedFavs.push(favsObj);
    }
    albumData.favorites = formattedFavs;
  }
  // res.send(albumData);
  let newAlbum = new Album(albumData);
  newAlbum
    .save()
    .then(addedAlbum => {
      res.send(addedAlbum);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.put("/albums/:id", (req, res) => {});

app.delete("/album/:id", (req, res) => {});

app.listen(port, () => {
  console.log(`Spinning with express: Port ${port}`);
});
