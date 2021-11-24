const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dishRouter = require("./routes/dishRouter");

const hostname = "localhost";
const port = 4000;

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/dishes", dishRouter);
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>Express example</h1></body></html>");
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port} at the time`);
});
