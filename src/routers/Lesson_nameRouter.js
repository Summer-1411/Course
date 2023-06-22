const express = require("express");
const router = express.Router();
const lessonControllers = require("../app/controllers/LessonControllers");

router.get("/", lessonControllers.GetAllLessonId);
router.post("/", lessonControllers.CreateLessonId);
router.delete("/", lessonControllers.DeleteLessonId);
// router.post("/", lessonControllers.CreateLessonId);

module.exports = router;
