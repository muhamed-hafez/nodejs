var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var app = express();

var hostname = "localhost";
var port = 3000;

app.use(morgan("dev"));
app.use(express.static("./public"));
app.use(bodyParser.json());

app.all("/dishes", function(req, res, next) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    next();
});

app.get("/dishes", function(req, res, next) {
    res.end("Will get all the dishes");
});

app.post("/dishes", function(req, res, next) {
    res.end("Will create a new dish with the name " + req.body.name + " and discription " + req.body.discription);
});

app.delete("/dishes", function(req, res, next) {
    res.end("Will delete all dishes");
});

app.get("/dishes/:dishId", function(req, res, next) {
    res.end("Will get the dish with id " + req.params.dishId);
});

app.put("/dishes/:dishId", function(req, res, next) {
    res.end("Will edit dish with id " + req.params.dishId);
});

app.delete("/dishes/:dishId", function(req, res, next) {
    res.end("Will delete dish with id " + req.params.dishId);
});

app.listen(port, hostname, function() {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
