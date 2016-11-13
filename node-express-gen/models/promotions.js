var mongoose = require("mongoose");
var Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    image : {
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
    description : {
        type : String,
        required : true
    }
});

var Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
