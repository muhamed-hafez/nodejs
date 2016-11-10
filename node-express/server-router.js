var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var hostname = "localhost";
var port = 3000;

var app = express();
var dishRouter = express.Router();

app.use(morgan("dev"));
dishRouter.use(bodyParser.json());

dishRouter.route("/")
.all(function(req, res, next) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    next();
})
.get(function(req, res, next) {
    res.end("Will get all the dishes");
})
.post(function(req, res, next) {
    res.end("Will create a new dish with the name " + req.body.name + " and discription " + req.body.discription);
})
.delete(function(req, res, next) {
    res.end("Will delete all dishes");
});

dishRouter.route("/:dishId")
.all(function(req, res, next) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    next();
})
.get(function(req, res, next) {
    res.end("Will get the dish with id " + req.params.dishId);
})
.put(function(req, res, next) {
    console.log("hello, world!");
    res.end("Will edit dish with id " + req.params.dishId + " with new name " + req.body.name + " and discription " + req.body.discription);
})
.delete(function(req, res, next) {
    res.end("Will delete dish with id " + req.params.dishId);
});

app.use("/dishes", dishRouter);
app.use(express.static("./public"));

app.listen(port, hostname, function() {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
