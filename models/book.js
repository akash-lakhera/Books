const mongoose = require("mongoose");
const books = new mongoose.Schema({

  name: String,
  price: Number,
  author: String,
  pages:Number,
  imageurl: String,
});
module.exports = mongoose.model("book", books);
