const mongoose = require("mongoose");
const products = new mongoose.Schema({

  name: String,
  price: Number,
  author: String,
  pages:Number,
  imageurl: String,
});
module.exports = mongoose.model("book", products);
