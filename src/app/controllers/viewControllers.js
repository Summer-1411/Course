const Coures = require("../models/coures");
const User = require("../models/Users");
const Doc = require("../models/Docs");
const Lesson = require("../models/lesson_name");

exports.pageOverView = async (req, res, next) => {
  try {
    const coures = await Coures.find({});
    // const lesson = await Lesson.find({});
    // console.log(req.user);

    res.status(200).render("home", {
      title: "home",
      coures,

      // lesson,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

exports.pageLogin = async (req, res, next) => {
  try {
    const user = User.findOne(User._id);
    // console.log(user);
    res.render("login", {
      title: "login",
      // user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};
exports.pageSignup = async (req, res, next) => {
  try {
    res.status(200).render("sign_up", {
      title: "signup",
    });
  } catch (error) {}
};
exports.page_category = async (req, res, next) => {
  try {
    const coures = await Coures.find({});
    res.status(200).render("page_category", {
      title: "category",
      coures,
    });
  } catch (error) {}
};
exports.Page_about = async (req, res, next) => {
  try {
    res.status(200).render("page_about", {
      title: "About",
    });
  } catch (error) {}
};
exports.page_test = async (req, res, next) => {
  try {
    res.status(200).render("page_test", {
      title: "test",
    });
  } catch (error) {}
};
exports.user_view = async (req, res, next) => {
  try {
    res.status(200).render("user_view", {
      title: "user",
    });
  } catch (error) {}
};
exports.profile = async (req, res, next) => {
  try {
    res.status(200).render("profile", {
      title: "User-profile",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.pageCreateCoures = async (req, res, next) => {
  try {
    res.status(200).render("admin/createCoures", {
      title: "createCoures",
    });
  } catch (error) {}
};
exports.PageManagerCoures = async (req, res, next) => {
  try {
    const coures = await Coures.find({});
    res.status(200).render("admin/ManagerCoures", {
      title: "Update Coures",
      coures,
    });
  } catch (error) {}
};
exports.PageUpdateCoures = async (req, res, next) => {
  try {
    const coures = await Coures.findOne({ _id: req.params.id });
    console.log(coures);
    res.status(200).render("admin/UpdateCoures", {
      title: "Update Coures",
      coures,
    });
  } catch (error) {}
};
exports.PageDeletecoures = async (req, res, next) => {
  try {
    const coures = await Coures.find({});
    res.status(200).render("admin/Delete_Coures", {
      title: "Delete Coures",
      coures,
    });
  } catch (error) {}
};
exports.PageSystem = async (req, res, next) => {
  const users = await User.find({});
  try {
    res.status(200).render("admin/System", {
      title: "System",
      users,
    });
  } catch (error) {}
};
exports.Pagecreate_admin = async (req, res, next) => {
  try {
    res.status(200).render("admin/CreateAdmin", {
      title: "Create Admin",
    });
  } catch (error) {}
};
exports.PageEdit_admin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    res.status(200).render("admin/EditAdmin", {
      title: "Edit Admin",
      user,
    });
  } catch (error) {}
};
exports.pageChitiet = async (req, res, next) => {
  try {
    const reqslug = req.params.slug;

    const coures = await Coures.findOne({ slug: reqslug });
    const lesson = await Lesson.find({});
    res.status(200).render("pageChitiet", { coures, lesson });
  } catch (error) {
    console.log(error);
  }
};

exports.pageProfine = async (req, res, next) => {
  try {
    res.status(200).render("pageProfine");
  } catch (error) {}
};
exports.pageAdmin_Profine = async (req, res, next) => {
  // const user = await User.findById();
  // console.log(user);

  try {
    res.status(200).render("admin/profine");
  } catch (error) {
    console.log(error);
  }
};
exports.pageAdmin_Dashboard = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).render("admin/Dashboard", {
      users,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.pageManagerUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).render("admin/ManagerUsers", {
      users,
    });
  } catch (error) {}
};
exports.pageDocs = async (req, res, next) => {
  try {
    const coures = await Coures.find({});
    const docs = await Doc.find({});

    res.status(200).render("doc", {
      title: "Docs",
      coures,
      docs,
      // lesson,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};
exports.pageXemchitiet = async (req, res, next) => {
  try {
    const reqslug = req.params.slug;
    const coures = await Coures.findOne({ slug: reqslug });
    const lesson = await Lesson.find({});
    res.status(200).render("pageXemkhoahoc", {
      coures,
      lesson,
    });
  } catch (error) {
    console.log(error);
  }
};
