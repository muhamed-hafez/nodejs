var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    postedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamps : true
});

var Comments = mongoose.model("Comment", commentSchema);

exports.commentSchema = commentSchema;
exports.Comments = Comments;
