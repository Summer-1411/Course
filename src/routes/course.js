const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Coures = require("../app/models/coures");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin } = require('../middleware/verifyToken')

// router.patch("/:id", couerControllers.updateCoures);
// router.get("/:id", couerControllers.getCoures);
// router.delete("/:id", couerControllers.deleteCoures);
// router.get("/", couerControllers.getAllCoures);
// router.post("/", couerControllers.newCoures);

//Thêm khoá học (Chỉ admin được thêm)
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { name, img, mota, videoId, level } = req.body
        if(!name || !img || !mota || !videoId || !level){
            return res.status(500).json({
                status: false,
                message: "Vui lòng nhập đầy đủ thông tin !"
            });
        }
        const Doc = await Coures.create({
            name,
            img,
            mota,
            videoId,
            level
        });
        if (!Doc) {
            return res.status(401).json({
                status: false,
                message: "Có lỗi khi kết nối cơ sở dữ liệu !"
            });
        }
        res.status(200).json({
            status: true,
            message: "Thêm mới khoá học thành công ",
            course: Doc,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Lỗi máy chủ !",
            error
        });
    }
})

//Lấy ds khoá học (Tất cả mn đều có thể lấy ds)
router.get('/', async (req, res) => {
    try {
        const Docs = await Coures.find({});
        return res.status(200).json({
            status: true,
            courses: Docs,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Lỗi máy chủ !"
        });
    }
})

//Get course theo id
router.get('/:id', async (req, res) => {
    try {
        const Doc = await Coures.findById({ _id: req.params.id });
        return res.status(200).json({
            status: true,
            course: Doc,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Lỗi máy chủ !"
        });
    }
})

//Sửa khoá học (Admin)
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { name, mota, videoId, level, img } = req.body
        const updateCoures = await Coures.findByIdAndUpdate(req.params.id, { name, mota, videoId, level, img }, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: true,
            message: "Cập nhật khoá học thành công",
            newUpdateCoures: updateCoures,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Lỗi máy chủ !"
        });
    }
})

//Xoá khoá học (Admin)
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const Doc = await Coures.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: true,
            message: "Xoá khoá học thành công",
            Document: Doc
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

