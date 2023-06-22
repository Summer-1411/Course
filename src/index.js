const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const routs = require("./routers");
const db = require("./config/db");
require("dotenv").config();
db.connect();
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//http
app.use(morgan("combined"));

app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "resources/view"));

app.set("trust proxy", 1);

routs(app);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
