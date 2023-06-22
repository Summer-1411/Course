const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Language = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "name bắt buộc phải có"],
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
    UuDiem: {
      type: String,
      trim: true,
    },
    NhuocDiem: {
      type: String,
      trim: true,
    },
    LuuY: {
      type: Date,
    },
  },
  {
    collection: "Language",
  }
);
module.exports = mongoose.model("Language", Language);
