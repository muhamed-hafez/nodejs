var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var assert = require('assert');

var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    User.find({}, function(err, users) {
        assert.equal(err, null);
        res.json(users);
    });
});

router.post('/register', function(req, res, next) {
    User.register(new User(req.body), req.body.password, function(err, user) {
        if(err) {
            return res.status(500).json({err : err});
        }

        passport.authenticate('local')(req, res, function() {
            return res.status(200).json({status : 'Registeration Successful'});
        });
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err : info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err : 'Could not log user in'
                });
            }
            var token = Verify.getToken(user);
            return res.status(200).json({
                status : 'Logged in succcessfully',
                success : true,
                token : token
            });
        });
    })(req, res, next);
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err : info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err : 'Could not log user in'
                });
            }
            var token = Verify.getToken(user);
            return res.status(200).json({
                status : 'Logged in succcessfully',
                success : true,
                token : token
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res, next) {
    req.logouit();
    res.status(200).json({
        status : 'Bye!'
    });
});

module.exports = router;
