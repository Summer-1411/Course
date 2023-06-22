const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../../models/Users");

const router = express.Router();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_KEY,
      callbackURL: process.env.GITHUB_CALLBACK,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({
        accountId: profile.id,
        provider: "github",
      });
      if (!user) {
        console.log("Adding new github user to DB..");
        const user = new User({
          id: profile.id,
          username: profile.username,
        });
        await user.save();
        // console.log(user);
        return cb(null, profile);
      } else {
        console.log("Github user already exist in DB..");
        // console.log(profile);
        return cb(null, profile);
      }
    }
  )
);

router.get("/", passport.authenticate("github", { scope: ["user:email"] }));
router.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/github/error",
  }),
  function (req, res) {
    res.redirect("/");
  }
);
router.get("/success", async (req, res) => {
  res.json(req.user);
});

module.exports = router;
