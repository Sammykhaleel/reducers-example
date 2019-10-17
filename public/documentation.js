const express = require("express");
const app = express();
const Movies = require("./movies");
const morgan = require("morgan");
const bodyParser = require("body-parser"),
  methodOverride = require("method-override");

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
app.get("/movies", function(req, res) {
  res.json(Movies);
});
app.get("/index.html");
app.get("/gundam.jpg");

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
