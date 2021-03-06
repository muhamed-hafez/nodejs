var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promotion = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(function(req, res, next) {
    Promotion.find(req.query, function(err, promotions) {
        if (err) return next(err);
        res.json(promotions);
    });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Promotion.create(req.body, function(err, promotion) {
        if (err) return next(err);
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Created promotion with id ' + promotion._id);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Promotion.remove({}, function(err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

promoRouter.route('/:promoId')
.get(function(req, res, next) {
    Promotion.findById(req.params.promoId, function(err, promotion) {
        if (err) return next(err);
        res.json(promotion);
    });
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Promotion.findByIdAndUpdate(req.params.promoId, {
        $set : req.body
    }, {
        new : true
    }, function(err, promotion) {
        if (err) return next(err);
        res.json(promotion);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Promotion.findByIdAndRemove(req.params.promoId, function(err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = promoRouter;
