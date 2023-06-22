const Lesson = require("../models/lesson_name");
const handleFactory = require("./handleFactory");

exports.CreateLessonId = async (req, res, next) => {
  try {
    const lesson = await Lesson.create({
      lessonName: req.body.lessonName,
      Idvideo: req.body.Idvideo,
    });
    lesson.Idvideo = `https://www.youtube.com/embed/${lesson.Idvideo}`;
    res.status(200).json({
      status: "success",
      lesson,
    });
  } catch (error) {
    error;
  }
};
exports.GetAllLessonId = handleFactory.getAllResources(Lesson);
exports.DeleteLessonId = handleFactory.DeleteResources(Lesson);
