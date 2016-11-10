var express = require("express");
var bodyParser = require("body-parser");

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route("/")
.all(function(req, res, next) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    next();
})
.get(function(req, res, next) {
    res.end("Will get all the promotions");
})
.post(function(req, res, next) {
    res.end("Will add promotion with name " + req.body.name + " and discription " + req.body.discription);
})
.delete(function(req, res, next) {
    res.end("Delete all promotions");
});

promoRouter.route("/:promoId")
.all(function(req, res, next) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    next();
})
.get(function(req, res, next) {
    res.end("Will get information for promotion with id " + req.params.promoId);
})
.put(function(req, res, next) {
    res.end("Will update promotion with id " + req.params.promoId);
})
.delete(function(req, res, next) {
    res.end("Will delete promotion with id " + req.params.promoId);
});

module.exports = promoRouter;
