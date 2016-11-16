var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username : String,
    password : String,
    firstName : {
        type : String,
        default : ''
    },
    lastName : {
        type : String,
        default : ''
    },
    admin : {
        type : Boolean,
        default : false
    }
});

User.methods.getName = function() {
    return this.firstName + ' ' + this.lastName;
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
