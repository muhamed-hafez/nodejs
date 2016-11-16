var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leadership = require('../models/leadership');
var assert = require('assert');
var Verify = require('./verify');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
    Leadership.find({}, function(err, leaderships) {
        assert.equal(err, null);
        res.json(leaderships);
    });
})
.post(Verify.verifyAdmin, function(req, res, next) {
    Leadership.create(req.body, function(err, leadership) {
        assert.equal(err, null);
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Created leadership with id ' + leadership._id);
    });
})
.delete(Verify.verifyAdmin, function(req, res, next) {
    Leadership.remove({}, function(err, resp) {
        assert.equal(err, null);
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
    Leadership.findById(req.params.leaderId, function(err, leadership) {
        assert.equal(err, null);
        res.json(leadership);
    });
})
.put(Verify.verifyAdmin, function(req, res, next) {
    Leadership.findByIdAndUpdate(req.params.leaderId, {
        $set : req.body
    }, {
        new : true
    }, function(err, leadership) {
        assert.equal(err, null);
        res.json(leadership);
    });
})
.delete(Verify.verifyAdmin, function(req, res, next) {
    Leadership.findByIdAndRemove(req.params.leaderId, function(err, resp) {
        assert.equal(err, null);
        res.json(resp);
    });
});

module.exports = leaderRouter;
