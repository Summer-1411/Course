const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const CreateToken = (id) => {
  return jwt.sign({ id }, "mk1");
};

const SaveTokenCookie = async (user, statusCode, req, res) => {
  const token = CreateToken(user._id);

  res.cookie("jwt", token, {
    // expires: new Date() + 60 * 1000,
    httpOnly: true,
  });
  user.password = undefined;
  user.confirmpassword = undefined;

  // localStorage.setItem("token", token);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { password, email } = req.body;
    if (!password || !email) return res.json("email || pass ko hợp lệ");

    const user = await User.findOne({ email }).select("+password");
    // console.log(user);

    if (!user) {
      return res.status(500).json({
        status: "failed",
      });
    }
    if (password != user.password)
      return res.json({
        status: "failed",
        message: "vui lòng nhập đúng mật khẩu",
      });
    SaveTokenCookie(user, 200, req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      err,
    });
  }
};

exports.CreateUser = async (req, res, next) => {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password ||
      !req.body.confirmpassword
    ) {
      return res.json("vui lòng nhập đầy đủ thông tin");
    }

    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
    });
    if (!user) {
      return res.status(401).json({
        status: "failed",
      });
    }
    const token = CreateToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};
exports.createAdmin = async (req, res, next) => {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password ||
      !req.body.confirmpassword ||
      !req.body.role
    ) {
      return res.json("vui lòng nhập đầy đủ thông tin");
    }
    if (req.body.role != "admin") {
      return res.json("vui long nhap dung vai tro");
    }
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      role: req.body.role,
    });
    if (!user) {
      return res.status(401).json({
        status: "failed",
      });
    }
    const token = CreateToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.isLogin = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const token = jwt.verify(req.cookies.jwt, "mk1");
      if (!token) return next();
      const currentUser = await User.findById({ _id: token.id });
      if (!currentUser) return next();
      res.locals.user = currentUser;

      return next();
    } catch (error) {
      return next();
    }
  }
  if (req.user) {
    try {
      console.log(req.user);
      res.locals.user = req.user;
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

exports.protect = async (req, res, next) => {
  try {
    if (req.user) {
      res.locals.user = req.user;
      return next();
    }
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) return res.status(400).redirect("/login");
    const decode = jwt.verify(token, "mk1");
    const CurrentUser = await User.findById({ _id: decode.id });

    if (!CurrentUser)
      return res.json("The user belonging to this token does no longer exist");
    req.user = CurrentUser;
    res.locals.user = CurrentUser;
    next();
  } catch (error) {
    res.status(500).render("err", {
      msg: "đăng xuất thành công",
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy(function (err) {
      console.log("session destroyed.");
    });
    res.cookie("jwt", "logout", {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({
      status: "failed logout",
      error,
    });
  }
};
exports.decentralization = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return res.status(500).render("err", {
        msg: "rất tiếc bạn không đủ quyền truy cập",
      });
    }
    next();
  };
};
exports.checkDocs = (res, req, next) => {
  if (!this.protect) {
    window.location.assign("/login");
  }
  next();
};
