var passport = require('passport');
var User = require('./models/user.js');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.facebook = passport.use(new FacebookStrategy({
        clientID : config.facebook.clientID,
        clientSecret : config.facebook.clientSecret,
        callbackURL : config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({oAuthId : profile.id}, function(err, user) {
            if (err) {
                console.log(err);
                done(err, null);
                return;
            }
            if(!err && user != null) {
                done(null, user);
            }
            else {
                var user = new User({
                    username : profile.displayName,
                    oAuthId : profile.id,
                    oAuthToken : accessToken
                });
                user.save(function(err) {
                    if (err) {
                        done(err, null);
                    }
                    else {
                        done(null, user);
                    }
                });
            }
        });
    }
));
