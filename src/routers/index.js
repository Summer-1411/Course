// const routernew = require('./news');
const UserRouter = require("./user");
const couresRouter = require("./coures");
const viewRouter = require("./viewRouter");
const LessonRouter = require("./Lesson_nameRouter");
const facebookRouter = require("../app/controllers/Login_Application/Login_Facebook");
const GithubRouter = require("../app/controllers/Login_Application/Login_Github");
const GoogleRouter = require("../app/controllers/Login_Application/Login_Google");
function routs(app) {
  app.use("/api/v1/coures", couresRouter);
  app.use("/api/v1/lesson", LessonRouter);
  app.use("/api/v1/user", UserRouter);
  app.use("/auth/facebook", facebookRouter);
  app.use("/auth/github", GithubRouter);
  app.use("/auth/google", GoogleRouter);
  app.use("/", viewRouter);

  app.all("*", (req, res, next) => {
    res.status(404).render("admin/404", {});
    // next(new appError(`loi ${req.originalUrl} can't not find`, 404))
  });
}
module.exports = routs;
