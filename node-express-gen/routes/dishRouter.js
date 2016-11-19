var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dish = require('../models/dishes');
var Verify = require('./verify');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(function(req, res, next) {
    Dish.find(req.query).populate('comments.postedBy').exec(function(err, dishes) {
        if (err) return next(err);
        res.json(dishes);
    });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Dish.create(req.body, function(err, dish) {
        if (err) return next(err);
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Created the dish with id ' + dish._id);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Dish.remove({}, function(err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

dishRouter.route('/:dishId')
.get(function(req, res, next) {
    Dish.findById(req.params.dishId).populate('comments.postedBy').exec(function(err, dishes) {
        if (err) return next(err);
        res.json(dish);
    });
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Dish.findByIdAndUpdate(req.params.dishId, {
        $set : req.body
    }, {
        new : true
    }, function(err, dish) {
        if (err) return next(err);
        res.json(dish);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Dish.findByIdAndRemove(req.params.dishId, function(err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

dishRouter.route('/:dishId/comments')
.get(function(req, res, next) {
    Dish.findById(req.params.dishId).populate('comments.postedBy').exec(function(err, dish) {
        if (err) return next(err);
        res.json(dish.comments);
    });
})
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        if (err) return next(err);
        req.body.postedBy = req.decoded._id;
        dish.comments.push(req.body);
        dish.save(function(err, dish) {
            assert.equal(err, null);
            res.json(dish);
        });
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        if (err) return next(err);
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
.get(function(req, res, next) {
    Dish.findById(req.params.dishId).populate('comments.postedBy').exec(function(err, dish) {
        if (err) return next(err);
        res.json(dish.comments.id(req.params.commentId));
    });
})
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        if (err) return next(err);
        var comment = dish.comments.id(req.params.commentId);

        if (comment.postedBy.equals(req.decoded._id)) {
            comment.remove();
            req.body.postedBy = req.decoded._id;
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
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        if (err) return next(err);
        var comment = dish.comments.id(req.params.commentId);

        if (comment.postedBy.equals(req.decoded._id)) {
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
