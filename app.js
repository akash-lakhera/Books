const express = require("express");
const app = express();
const path=require("path")
const router=require("./routes/book")
require("dotenv").config(); //initialize environment variables
port = process.env.PORT || 4000;
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const{register}=require("./controllers/authentication")
errorHandlerMid =require("./utils/error");
const conn = require("./db/db");
app.use(express.json()); //parse json

const MongoStore = require("connect-mongo")(session);
let sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});
const checkAuth = (req, res, next) => {
  //checks logged in status of a user
  if (req.isAuthenticated()) {
    next();
  } else res.status(401).send({error:"Unauthorised"});
};
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);
require("./auth/passport");

const pathLogger = (req, res, next) => {

  next();
};

const redirector=(req,res,next)=>{
  if(req.isAuthenticated()){
    res.redirect("/")
  }
  else
  next()
}
app.use(pathLogger);

app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{

  next()
})
app.use("/api/books",checkAuth,router)//api route

app.get("/",(req,res,next)=>{
  res.status(200).send("Home")
})

/* auth routes     */
app.get("/login",redirector,(req,res,next)=>{
  res.status(200).send("login please")
})
app.post("/login",redirector,passport.authenticate('local',{successRedirect:"/",failureRedirect:"/login"}))
app.post("/register",redirector,register)

  app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

/* auth routes     */

//default route
app.get("*", (req,res) => {
  res.status(400).send("<h1>The route does not exist</h2>");
});
app.use(errorHandlerMid)

//start the server if database is connected
conn
  .then(() => {
    app.listen(port, () => {
      console.log("Server is online on port : "+port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
