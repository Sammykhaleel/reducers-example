const express = require("express");
const app = express();
//const Movies = require("./movies");
const morgan = require("morgan");
const bodyParser = require("body-parser"),
  methodOverride = require("method-override");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
// var myLogger = function(req, res, next) {
//   req.url;
//   console.log(req.url);

//   next();
// };
app.use(morgan("common"));
//app.use(myLogger);
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
let topBooks = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling"
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien"
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer"
  }
];

// GET requests
app.get("/", function(req, res) {
  var text = "Welcome to Pain Train ";
  text += "url: " + req.url;
  res.send(text);
});
app.get("/secreturl", function(req, res) {
  var text = "This is a secret url with super top-secret content. ";
  text += "url: " + req.url;
  res.send(text);
});
app.get("/documentation.html");
app.get("/books", function(req, res) {
  res.json(topBooks);
});
// app.get("/movies", function(req, res) {
//   res.json(Movies);
// });
app.get("/movies", function(req, res) {
  Movies.find().then(movies => res.json(movies));
});
app.get("/users", function(req, res) {
  Users.find().then(users => res.json(users));
});
app.get("/index.html");
app.get("/gundam.jpg");

app.post("/users", function(req, res) {
  Users.findOne({ Username: req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(error) {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
