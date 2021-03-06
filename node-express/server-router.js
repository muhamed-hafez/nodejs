var express = require("express");
var morgan = require("morgan");
var dishRouter = require("./dishRouter");
var leaderRouter = require("./leaderRouter");
var promoRouter = require("./promoRouter");

var hostname = "localhost";
var port = 3000;

var app = express();
app.use(morgan("dev"));

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leadership", leaderRouter);

app.use(express.static("./public"));

app.listen(port, hostname, function() {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
