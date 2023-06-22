const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Khoa_hoc_hot = new Schema({
  name: {
    type: String,
    require: [true, "tên bắt buộc phải có"],
    trim: true,
    minlength: 1,
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
  mota: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    href: String,
  },
  level: {
    type: String,
    require: [true, "level bắt buộc phải có"],
  },
});
module.exports = mongoose.model("Khoa_hoc_hot", Khoa_hoc_hot);
