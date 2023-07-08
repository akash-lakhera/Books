const mongoose=require("mongoose");
url=process.env.MONGO
module.exports=mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true })