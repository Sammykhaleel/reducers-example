const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser"),
  methodOverride = require("method-override");
const mongoose = require("mongoose");
const Models = require("./models.js");
var jwtSecret = "your_jwt_secret"; // This has to be the same key used in the JWTStrategy
var jwt = require("jsonwebtoken");
const passport = require("passport");
require("./passport"); // Your local passport file
const cors = require("cors");
app.use(cors());
const { check, validationResult } = require("express-validator");

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
var auth = require("./auth")(app);
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
app.use(morgan("common"));
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
// app.get("/movies", function(req, res) {
//   Movies.find().then(movies => res.json(movies));
// });

// Get all users
app.get("/users", function(req, res) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
app.get("/users/:UserName", function(req, res) {
  Users.findOne({ UserName: req.params.UserName })
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
app.get("/index.html");
app.get("/gundam.jpg");

app.post(
  "/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("UserName", "Username is required").isLength({ min: 5 }),
    // check(
    //   "UserName",
    //   "Username contains non alphanumeric characters - not allowed."
    // ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    // check the validation object for errors
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ UserName: req.body.UserName }) // Search to see if a user with the requested username already exists
      .then(function(user) {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.UserName + " already exists");
        } else {
          Users.create({
            UserName: req.body.UserName,
            Password: hashedPassword,
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
  }
);

app.put("/users/:UserName", function(req, res) {
  Users.findOneAndUpdate(
    { UserName: req.params.UserName },
    {
      $set: {
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.delete("/users/:UserName", function(req, res) {
  Users.findOneAndRemove({ UserName: req.params.UserName })
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.UserName + " was not found");
      } else {
        res.status(200).send(req.params.UserName + " was deleted.");
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
app.post("/users/:Username/Movies/:MovieID", function(req, res) {
  Users.findOneAndUpdate(
    { UserName: req.params.UserName },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.get("/movies", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// listen for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
//app.listen(8080, () => console.log("Your app is listening on port 8080."));
