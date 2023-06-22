const User = require("../models/Users");
const handleFactory = require("./handleFactory");

exports.UpdateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { password, confirmpassword } = req.body;
    if (password || confirmpassword)
      return res.status(500).json({
        message: "không được chỉnh sủa mật khẩu",
      });
    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newUser) return res.status(500).json("user ko tồn tại");
    res.status(200).json({
      status: "success",
      Document: newUser,
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      err,
    });
  }
};
exports.UpdateAdmin = async (req, res, next) => {
  try {
    if (req.body.password || req.body.confirmpassword)
      return res.status(500).json({
        message: "không được chỉnh sủa mật khẩu",
      });
    if (!req.body.username || !req.body.email || !req.body.role) {
      return res.json("vui long nhap du thong tin");
    }
    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newUser) return res.status(500).json("user ko tồn tại");
    res.status(200).json({
      status: "success",
      Document: newUser,
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      err,
    });
  }
};
exports.DeleteUserMe = async (req, res, next) => {
  try {
    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newUser) return res.status(500).json("user ko tồn tại");
    res.status(200).json({
      status: "success",
      Document: newUser,
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      err,
    });
  }
};

exports.GetUser = handleFactory.GetUser(User);
exports.getAllUser = handleFactory.getAllResources(User);
exports.DeleteUser = handleFactory.DeleteResources(User);
