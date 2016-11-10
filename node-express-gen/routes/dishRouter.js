var express = require("express");
var bodyParser = require("body-parser");

var dishRouter = express.Router();
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

module.exports = dishRouter;
