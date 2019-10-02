const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require('passport')

// POST api/auth/signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Your password must be 8 char. min." });
  }
  if (!username) {
    return res.status(400).json({ message: "Your username cannot be empty" });
  }

  User.findOne({ username: username })
    .then(found => {
      if (found) {
        return res
          .status(400)
          .json({ message: "This username is already taken" });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({ username: username, password: hash }).then(
        dbUser => {
          // res.json(dbUser);
          //login the user on signup

          req.login(dbUser, err => {
            if (err) {
              return res
              .status(500)
              .json({ message: "Error while attempting to login"});
            }
            res.json(dbUser);
          })
        }
      );
    })
    .catch(err => {
      res.json(err);
    });
});

// login route with POST
// POST / api /auth/ login

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" })
    }
    if (!User) {
      return res.status(400).json({ message: "Wrong credentials" })
    }
    req.login(User, (err) => {
      if (err) {
        return res.status(500).json({
          message:
            "Error while attempting to login"
        })
      }
      return res.json(user);
    });
  })(req, res);
})

// logout route with ???
//DELETE/ api/ auth/ login
router.delete('/logout', (req, res) => {
  req.logout()
  res.json({ message: "Successful logout" });
});

// checks if the user has an active session
router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
