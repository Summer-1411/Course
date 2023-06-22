const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const About_Me = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "tên băt buộc phải có"],
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    age: {
      type: Number,
    },
    mota: {
      type: String,
      trim: true,
    },
    School: {
      type: String,
      trim: true,
    },
    Quocgia: {
      type: String,
      require: [true, "quoc gia bat buoc phai co"],
    },
    Link: {
      Link_Fb: {
        type: String,
        trim: true,
      },
      Link_Instagram: {
        type: String,
        trim: true,
      },
      link_Zalo: {
        type: String,
        trim: true,
      },
      Link_GitHub: {
        type: String,
        trim: true,
      },
      Link_Gmail: {
        type: String,
        trim: true,
      },
      Phone: {
        required: [true, "phone bắt buộc phải có"],
        type: String,
      },
      DiaChi: {
        type: String,
        trim: true,
      },
    },
  },
  {
    collection: "About_Me",
  }
);
module.exports = mongoose.model("About_Me", About_Me);
