var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assert = require('assert');
var Dish = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(function(req, res, next) {
    Dish.find({}, function(err, dishes) {
        assert.equal(err, null);
        res.json(dishes);
    });
})
.post(function(req, res, next) {
    Dish.create(req.body, function(err, dish) {
        assert.equal(err, null);
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Created the dish with id ' + dish._id);
    });
})
.delete(function(req, res, next) {
    Dish.remove({}, function(err, resp) {
        assert.equal(err, null);
        res.json(resp);
    });
});

dishRouter.route('/:dishId')
.get(function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        res.json(dish);
    });
})
.put(function(req, res, next) {
    Dish.findByIdAndUpdate(req.params.dishId, {
        $set : req.body
    }, {
        new : true
    }, function(err, dish) {
        assert.equal(err, null);
        res.json(dish);
    });
})
.delete(function(req, res, next) {
    Dish.findByIdAndRemove(req.params.dishId, function(err, resp) {
        assert.equal(err, null);
        res.json(resp);
    });
});

dishRouter.route('/:dishId/comments')
.get(function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        res.json(dish.comments);
    });
})
.post(function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        dish.comments.push(req.body);
        dish.save(function(err, dish) {
            assert.equal(err, null);
            res.json(dish);
        });
    });
})
.delete(function(req, res, next) {
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
.get(function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        res.json(dish.comments.id(req.params.commentId));
    });
})
.put(function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function(err, dish) {
            assert.equal(err, null);
            res.json(dish);
        });
    });
})
.delete(function(req, res, next) {
    Dish.findById(req.params.dishId, function(err, dish) {
        assert.equal(err, null);
        dish.comments.id(req.params.commentId).remove();
        dish.save(function(err, dish) {
            assert.equal(err, null);
            res.json(dish);
        });
    });
});

module.exports = dishRouter;
