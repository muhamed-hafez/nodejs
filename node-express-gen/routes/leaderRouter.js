var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leadership = require('../models/leadership');
var Verify = require('./verify');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(function(req, res, next) {
    Leadership.find(req.query, function(err, leaderships) {
        if (err) return next(err);
        res.json(leaderships);
    });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Leadership.create(req.body, function(err, leadership) {
        if (err) return next(err);
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Created leadership with id ' + leadership._id);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Leadership.remove({}, function(err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')
.get(function(req, res, next) {
    Leadership.findById(req.params.leaderId, function(err, leadership) {
        if (err) return next(err);
        res.json(leadership);
    });
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Leadership.findByIdAndUpdate(req.params.leaderId, {
        $set : req.body
    }, {
        new : true
    }, function(err, leadership) {
        if (err) return next(err);
        res.json(leadership);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Leadership.findByIdAndRemove(req.params.leaderId, function(err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = leaderRouter;
