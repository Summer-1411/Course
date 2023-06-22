const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const couerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "vui lòng nhập tên"],
    },
    mota: {
      type: String,
      trim: true,
    },
    motachitiet: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    videoId: { type: String },
    img: { type: String },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    Docs: { type: String },
    level: {
      type: String,
      required: [true, "vui lòng nhập cấp độ"],
    },
    Lesson: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "lessons",
      },
    ],
  },
  {
    collection: "couers",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

couerSchema.pre(/^find/, function (next) {
  this.populate({ path: "Lesson" });
  next();
});
module.exports = mongoose.model("couers", couerSchema);
