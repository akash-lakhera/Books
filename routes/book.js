const { getAll, getBook, addBook, modBook, deleteBook }=require("../controllers/book")
const router=require('express').Router();
router.route('/').get(getAll).post(addBook)
router.route('/:book').get(getBook).delete(deleteBook).put(modBook)
module.exports=router;