var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    dishes : [{
        type : Schema.Types.ObjectId,
        ref : 'Dish'
    }]
}, {
    timestamps : true
});

module.exports = mongoose.model('Favorite', favoriteSchema);
