const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/Users");

const router = express.Router();
require("dotenv").config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({
        id: profile.id,
      });

      if (!user) {
        const user = new User({
          id: profile.id,
          username: profile.displayName,
        });
        await user.save();
        console.log("ko co user");
        console.log(user);
        return cb(null, profile);
      } else {
        console.log("user da login fb roi");

        console.log(profile);
        return cb(null, profile);
      }
    }
  )
);
router.get("/", passport.authenticate("facebook", { scope: "email" }));
router.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/facebook/error",
  }),
  function (req, res) {
    res.redirect("/");
  }
);
router.get("/success", async (req, res) => {
  res.json(req.user);
});

router.get("/error", (req, res) => {
  res.send("loiix");
});

module.exports = router;
