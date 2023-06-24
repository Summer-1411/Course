const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require("../app/models/Users");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin } = require('../middleware/verifyToken')


router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
        return res.status(500).json({
            status: false,
            message: "Vui lòng nhập đầy đủ thông tin !"
        });
    }
    try {
        const userExist = await User.findOne({ email }).select("+password");
        //Nếu email đã được đăng ký
        // console.log({userExist});
        if (userExist) {
            return res.status(401).json({
                status: false,
                message: "Email đã tồn tại !"
            });
        }
        const user = await User.create({
            email: email,
            username: username,
            password: password,
            confirmpassword: confirmPassword,
        });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Có lỗi khi kết nối cơ sở dữ liệu !"
            });
        }
        user.password = undefined;
        user.confirmpassword = undefined;
        res.status(200).json({
            status: true,
            message: "Đăng ký thành công",
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Có lỗi trong quá trình đăng ký !",
            error,
        });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password || !email) {
            return res.status(500).json({
                status: false,
                message: "Thiếu email hoặc password !"
            });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(500).json({
                status: false,
                message: "Tài khoản không tồn tại !"
            });
        }
        if (password != user.password) {
            return res.json({
                status: false,
                message: "Mật khẩu không chính xác !",
            });
        }
        user.password = undefined;
        user.confirmpassword = undefined;
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.role
            },
            process.env.ACCESS_TOKEN_SECRET
        )
        return res.status(200).json({
            status: true,
            message: "Đăng nhập thành công !",
            user,
            accessToken
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Có lỗi xảy ra trong quá trình đăng nhập !",
            err,
        });
    }
})


router.post('/createAdmin', verifyTokenAndAdmin ,async (req, res) => {
    try {
        const { username, email, password, confirmPassword, role } = req.body;

        if ( !username || !email || !password || !confirmPassword || !role ) {
            return res.status(500).json({
                status: false,
                message: "Vui lòng nhập đầy đủ thông tin !"
            });
        }
        if (role !== "admin") {
            return res.status(500).json({
                status: false,
                message: "Vui lòng nhập đúng vai trò admin !"
            });
        }
        const userExist = await User.findOne({ email }).select("+password");
        //Nếu email đã được đăng ký
        // console.log({userExist});
        if (userExist) {
            return res.status(401).json({
                status: false,
                message: "Email đã tồn tại !"
            });
        }
        const user = await User.create({
            email: email,
            username: username,
            password: password,
            confirmpassword: confirmPassword,
            role: role,
        });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Có lỗi khi kết nối cơ sở dữ liệu !"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Đăng ký tài khoản Admin thành công",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Lỗi máy chủ !" })
    }
})

;

module.exports = router

