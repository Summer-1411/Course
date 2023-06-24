const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://levantung14112002:levantung14112002@course.a6tgx0w.mongodb.net/`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    );
    console.log("success");
  } catch (error) {
    console.log(error);
  }
}
//`mongodb+srv://dinhkhactuan2002:060702002@cluster0.qzxx1kq.mongodb.net/WebCouse_Learning`
module.exports = { connect };
