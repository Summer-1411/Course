const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const SchemaDoc = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    link_Office: {
      href: {
        type: String,
      },
    },
    My_link: {
      My_href: {
        type: String,
      },
    },
  },
  {
    collection: "Docs",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
module.exports = mongoose.model("Docs", SchemaDoc);
