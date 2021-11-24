// require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// var dishRouter = require("./routes/dishRouter");
var usersRouter = require("./routes/users");
var leaderRouter = require("./routes/leaderRouter");
var promoRouter = require("./routes/promoRouter");

const mongoose = require("mongoose");
// const Dishes = require("./models/dishes");
// const url = "mongodb://localhost:27017/conFusion"; //For local database
var url = "mongodb+srv://user:1234@parth-parmar.btna0.mongodb.net/";
var mongoDB = process.env.MONGODB_URI || url;
const connect = mongoose.connect(mongoDB);
const Dishes = require("./models/dishes");
connect.then(
  (db) => {
    console.log("Connected to server");
    Dishes.find({})
      .then(
        (dishes) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dishes);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  },
  (err) => {
    console.log(err);
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
