const Model = require("../models/book");

const getAll = async (req, res, next) => {
    try {
        let data = await Model.find({});
        res.status(200).json(data);
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "something went wrong" });
    }

};
const getBook = async (req, res, next) => {
  try {
    let book = req.params.book;
    let data = await Model.findOne({ name: book });
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "something went wrong" });
  }
};
const addBook = async (req, res, next) => {
  try {
    const { name, price, author, pages, imageurl } = req.body;
    let data = await Model.insertMany({
      name: name,
      price: price,
      author: author,
      imageurl: imageurl,
      pages: pages,
    });
    res.status(200).send({ data: "book inserted" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "something went wrong" });
  }
};
const modBook = async (req, res, next) => {
  try {
    console.log("Mod")
    const book = req.params.book;
    const { name, price, author, pages, imageurl } = req.body;
    let val
    if (name) {
        [val]=Object.keys({name})
        v=name;
    }
    if (price) {
         [val]=Object.keys({price})
        v=price
    }
    if (author) {
       [val]=Object.keys({author})
        v=author
    }
    if (pages) {
         [val]=Object.keys({pages})
        v=pages
    }
    if (imageurl) {
       [val]=Object.keys({imageurl})
        v=imageurl
    }
    let data=await Model.updateOne({name:book},{$set:{[val]:v}})
    console.log(val)
    console.log(v)
    res.status(200).send({ data: "book updated" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "something went wrong" });
  }
};
const deleteBook = async (req, res, next) => {
  try {
    const book=req.params.book
    let data=await Model.findOneAndDelete({name:book})
    res.status(200).send({ data: "book deleted" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "something went wrong" });
  }
};

module.exports = { getAll, getBook, addBook, modBook, deleteBook };
