var mongoose = require("mongoose");
var comments = require("./comments.js");

var commentSchema = comments.commentSchema;

var Schema = mongoose.Schema;

var dishSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    comments : [commentSchema]
}, {
    timestamps : true
});

var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;
