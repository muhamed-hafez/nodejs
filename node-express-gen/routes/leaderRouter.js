var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leadership = require('../models/leadership');
var assert = require('assert');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(function(req, res, next) {
    Leadership.find({}, function(err, leaderships) {
        assert.equal(err, null);
        res.json(leaderships);
    });
})
.post(function(req, res, next) {
    Leadership.create(req.body, function(err, leadership) {
        assert.equal(err, null);
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Created leadership with id ' + leadership._id);
    });
})
.delete(function(req, res, next) {
    Leadership.remove({}, function(err, resp) {
        assert.equal(err, null);
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')
.get(function(req, res, next) {
    Leadership.findById(req.params.leaderId, function(err, leadership) {
        assert.equal(err, null);
        res.json(leadership);
    });
})
.put(function(req, res, next) {
    Leadership.findByIdAndUpdate(req.params.leaderId, {
        $set : req.body
    }, {
        new : true
    }, function(err, leadership) {
        assert.equal(err, null);
        res.json(leadership);
    });
})
.delete(function(req, res, next) {
    Leadership.findByIdAndRemove(req.params.leaderId, function(err, resp) {
        assert.equal(err, null);
        res.json(resp);
    });
});

module.exports = leaderRouter;
