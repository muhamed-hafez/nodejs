var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assert = require('assert');
var Dish = require('../models/dishes');
var Verify = require('./verify');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
    Dish.find({}).populate('comments.postedBy').exec(function(err, dishes) {
        assert.equal(err, null);
        res.json(dishes);
    });
})
.post(Verify.verifyAdmin, function(req, res, next) {
    Dish.create(req.body, function(err, dish) {
        assert.equal(err, null);
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Created the dish with id ' + dish._id);
    });
})
.delete(Verify.verifyAdmin, function(req, res, next) {
    Dish.remove({}, function(err, resp) {
        assert.equal(err, null);
        res.json(resp);
    });
});

dishRouter.route('/:dishId')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
    Dish.findById(req.params.dishId).populate('comments.postedBy').exec(function(err, dishes) {
        assert.equal(err, null);
        res.json(dish);
    });
})
.put(Verify.verifyAdmin, function(req, res, next) {
    Dish.findByIdAndUpdate(req.params.dishId, {
        $set : req.body
    }, {
        new : true
    }, function(err, dish) {
        assert.equal(err, null);
        res.json(dish);
    });
})
.delete(Verify.verifyAdmin, function(req, res, next) {
    Dish.findByIdAndRemove(req.params.dishId, function(err, resp) {
        assert.equal(err, null);
        res.json(resp);
    });
});

dishRouter.route('/:dishId/comments')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
    Dish.findById(req.params.dishId).populate('comments.postedBy').exec(function(err, dish) {
        assert.equal(err, null);
        res.json(dish.comments);
    });
})
.post(function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        req.body.postedBy = req.decoded._doc._id;
        dish.comments.push(req.body);
        dish.save(function(err, dish) {
            assert.equal(err, null);
            res.json(dish);
        });
    });
})
.delete(Verify.verifyAdmin, function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        for (comment of dish.comments) {
            comment.remove();
        }
        dish.save(function(err, dish) {
            assert.equal(err, null);
            res.writeHead(200, {'Content-Type' : 'text/plain'});
            res.end('Comments deleted successfully');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
    Dish.findById(req.params.dishId).populate('comments.postedBy').exec(function(err, dish) {
        assert.equal(err, null);
        res.json(dish.comments.id(req.params.commentId));
    });
})
.put(function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        var comment = dish.comments.id(req.params.commentId);

        if (comment.postedBy.equals(req.decoded._doc._id)) {
            comment.remove();
            req.body.postedBy = req.decoded._doc._id;
            dish.comments.push(req.body);
            dish.save(function(err, dish) {
                assert.equal(err, null);
                res.json(dish);
            });
        }
        else {
            var err = new Error('You are not authorized to do this operation');
            err.status = 403;
            return next(err);
        }
    });
})
.delete(function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        var comment = dish.comments.id(req.params.commentId);

        if (comment.postedBy.equals(req.decoded._doc._id)) {
            comment.remove();
            dish.save(function(err, dish) {
                assert.equal(err, null);
                res.json(dish);
            });
        }
        else {
            var err = new Error('You are not authorized to do this operation');
            err.status = 403;
            return next(err);
        }
    });
});

module.exports = dishRouter;
