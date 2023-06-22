const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");

const User = new Schema(
  {
    username: {
      type: String,
      required: [true, "username bắt buộc phải có"],
      trim: true,
    },
    email: {
      type: String,
      require: true,
      index: true,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      required: [true, "email bắt buộc phải có"],
      validate: [validator.isEmail, " vui lòng nhập email đúng định dạng"],
    },
    img: {
      type: String,
      default:
        "data:image/jpeg;base64,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",
    },
    phoneNumber: {
      type: String,
      require: [true, "sdt bắt buộc phải có"],
    },
    password: {
      type: String,
      required: [true, "password bắt buộc phải có"],
      minlength: 6,
      select: false,
    },
    confirmpassword: {
      type: String,
      required: [true, "confirmpassword bắt buộc phải có"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "xác nhận mật khẩu không chính xác",
      },
    },
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
User.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// User.pre("save", async function (next) {
//   // Only run this function if password was actually modified
//   if (!this.isModified("password")) return next();

//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);

//   // Delete passwordConfirm field
//   this.passwordConfirm = undefined;
//   next();
// });
// User.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };
module.exports = mongoose.model("User", User);
