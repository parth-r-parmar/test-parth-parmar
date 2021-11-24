var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
var app = express();
var logger = require("morgan");

var indexRouter = require("./routes/index");
var dishRouter = require("./routes/dish");

var mongoDB = process.env.MONGODB_URI;
const connect = mongoose.connect(mongoDB);

connect.then(
  (db) => {
    console.log("Connected to server : " + db);
  },
  (err) => {
    console.log(err);
  }
);

app.use(logger("dev"));
app.use("/", indexRouter);
app.use("/dishes", dishRouter);

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
