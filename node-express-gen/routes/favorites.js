var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Favorite = require('../models/favorite');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
    Favorite.findOne({postedBy : req.decoded._id}).populate('postedBy').populate('dishes').exec(function(err, favorites) {
        if (err) return next(err);
        res.json(favorites);
    });
})
.post(function(req, res, next) {
    Favorite.findOne({postedBy : req.decoded._id}, function(err, favorite) {
        if (err) return next(err);
        if(favorite != null) {
            favorite.dishes.push(req.body._id);
        }
        else {
            favorite = new Favorite({
                postedBy : req.decoded._id,
                dishes : [req.body._id]
            });
        }
        favorite.save(function(err) {
            assert.equal(err, null);
            res.json(favorite);
        });
    });
})
.delete(Verify.verifyAdmin, function(req, res, next) {
    Favorite.remove({ postedBy : req.decoded._id }, function(err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

router.route('/:favoriteDishId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorite.update({ postedBy : req.decoded._id }, { $pull : { dishes : req.params.favoriteDishId } }
        , { new : true }, function(err, favorite) {
            if (err) return next(err);
            res.json(favorite);
    });
});

module.exports = router;
