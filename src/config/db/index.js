const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://Levantung:Levantung1@courestest.hfzdtdl.mongodb.net/?retryWrites=true&w=majority`, {
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
