var mongoose = require("mongoose");
var comments = require("./comments.js");
require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = comments.commentSchema;

var Schema = mongoose.Schema;

var dishSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true
    },
    label : {
        type : String,
        required : false,
        default : ""
    },
    price : {
        type : Currency,
        required : true
    },
    featured : {
      type : Boolean,
      default : false
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
