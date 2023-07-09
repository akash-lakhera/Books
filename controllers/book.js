const Model = require("../models/book");
const mongoose=require("mongoose")
idC=mongoose.Types.ObjectId
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
    let book = idC(req.params.book);

    let data = await Model.findOne({ _id: book });
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

    let book = idC(req.params.book);
    const { name, price, author, pages, imageurl } = req.body;
    let setObject={}
    if (name) {
        setObject.name=name 
    }
    if (price) {
        setObject.price=price
    }
    if (author) {
      setObject.author=author
    }
    if (pages) {
         setObject.pages=pages
    }
    if (imageurl) {
       setObject.imageurl=imageurl
    }
   
    let data=await Model.updateOne({_id:book},{$set:setObject})
  
    res.status(200).send({ data: "book updated" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "something went wrong" });
  }
};
const deleteBook = async (req, res, next) => {
  try {
    let book = idC(req.params.book);
    let data=await Model.findOneAndDelete({_id:book})
    res.status(200).send({ data: "book deleted" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "something went wrong" });
  }
};

module.exports = { getAll, getBook, addBook, modBook, deleteBook };
