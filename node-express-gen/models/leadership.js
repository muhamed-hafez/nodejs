var mongoose = require("mongoose");
var Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var leadershipSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    abbr : {
        type : String,
        required : false,
        default : ""
    },
    description : {
        type : String,
        required : true
    }
});

var Leadership = mongoose.model("Leadership", leadershipSchema);
module.exports = Leadership;
