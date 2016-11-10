var express = require("express");
var bodyParser = require("body-parser");

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route("/")
.all(function(req, res, next) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    next();
})
.get(function(req, res, next) {
    res.end("Will get all leaders");
})
.post(function(req, res, next) {
    res.end("Will create a new leader with name " + req.body.name + " and role " + req.body.role);
})
.delete(function(req, res, next) {
    res.end("Will delete all leaders");
});

leaderRouter.route("/:leaderId")
.all(function(req, res, next) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    next();
})
.get(function(req, res, next) {
    res.end("Will get leader with id " + req.params.leaderId);
})
.put(function(req, res, next) {
    res.end("Will edit leader with id " + req.params.leaderId);
})
.delete(function(req, res, next) {
    res.end("Will delete leader with id " + req.params.leaderId);
});

module.exports = leaderRouter;
