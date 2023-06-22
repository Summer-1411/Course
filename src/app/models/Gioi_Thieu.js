const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Gioi_Thieu = new Schema(
  {
    tieude: {
      type: String,
      trim: true,
      require: [true, "tiêu đề bắt buộc phải có"],
    },
    slug: {
      type: String,
      slug: "tieude",
      unique: true,
    },
    mota: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "Gioi_Thieu",
  }
);
module.exports = mongoose.model("Gioi_Thieu", Gioi_Thieu);
