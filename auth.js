// var jwtSecret = "your_jwt_secret"; // This has to be the same key used in the JWTStrategy
// var jwt = require("jsonwebtoken");
// const passport = require("passport");
// require("./passport"); // Your local passport file

// function generateJWTToken(user) {
//   return jwt.sign(user, jwtSecret, {
//     subject: user.UserName, // This is the username you’re encoding in the JWT
//     expiresIn: "7d", // This specifies that the token will expire in 7 days
//     algorithm: "HS256" // This is the algorithm used to “sign” or encode the values of the JWT
//   });
// }

// /* POST login. */
// module.exports = router => {
//   router.post("/login", (req, res) => {
//     passport.authenticate("jwt", { session: false }, (error, user, info) => {
//       if (error || !user) {
//         return res.status(400).json({
//           message: "Something is not right",
//           user: user
//         });
//       }
//       req.login(user, { session: false }, error => {
//         if (error) {
//           res.send(error);
//         }
//         var token = generateJWTToken(user.toJSON());
//         return res.json({ user, token });
//       });
//     })(req, res);
//   });
// };

if (!process.env.JWT_SECRET) {
  console.error("Environment variables not found.");
}

let jwt = require("jsonwebtoken");
const passport = require("passport");
require("../passport"); // passport file with the strategies

function generateJWTToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    subject: user.Username, // this is the Username that will be encoded in the JWT
    expiresIn: "7d", // token expires in 7 days
    algorithm: "HS256" // encryption algorithm used to encode/sign the values of the JWT
  });
}

// POST login.
module.exports.auth = function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      let token = generateJWTToken(user.toJSON());
      return res.json({ user, token });
    });
  })(req, res, next);
};
