const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../../models/Users");
const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, done) {
      //   userProfile = profile;
      return done(null, profile);
    }
  )
);

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/error" }),
  (req, res) => {
    res.redirect("/");
  }
);
router.get("/success", async (req, res) => {
  res.json(req.user);
});

module.exports = router;
