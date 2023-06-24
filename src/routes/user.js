const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require("../app/models/Users");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin } = require('../middleware/verifyToken')


//Get user
router.get('/:id', async (req, res) => {
    try {
        const Doc = await User.findById(req.params.id).select("+password");
        if (!Doc) {
            res.status(500).json({
                status: false,
                message: "Người dùng này ko tồn tại !"
            });
        }

        Doc.confirmpassword = undefined;
        return res.status(200).json({
            status: true,
            user: Doc,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Lỗi máy chủ !"
        });
    }
})
//Get all user (Chỉ admin mới có quyền lấy ra tất cả user)
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const Docs = await User.find({});
        return res.status(200).json({
            status: true,
            users: Docs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Lỗi máy chủ !"
        });
    }
})

//Cập nhật người dùng (admin và người dùng đó có quyền cập nhật)
router.put('/update/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        console.log(req.body);
        const { password, confirmPassword, username, email } = req.body;
        if (password || confirmPassword)
            return res.status(500).json({
                status: false,
                message: "Không được chỉnh sửa mật khẩu !",
            });
        const newUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                username: username,
                email: email,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!newUser) return res.status(500).json({
            status: false,
            message: "Người dùng không tồn tại !",
        });
        res.status(200).json({
            status: true,
            message: "Cập nhật người dùng thành công !",
            user: newUser,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Lỗi máy chủ !"
        });
    }
})

//Xoá tạm thời (Xoá có thể khôi phục, chỉ thay đổi thuộc tính active của user)
router.put('/temporaryDelete/:id', verifyTokenAndAdmin, async (req, res) => {
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

        res.status(200).json({
            status: true,
            message: "Xoá user thành công",
            user: newUser,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Lỗi máy chủ !"
        });
    }
})


module.exports = router

