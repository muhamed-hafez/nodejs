var assert = require("assert");
var mongoose = require("mongoose");
var Dishes = require("./models/dishes.js");
var Promotion = require("./models/promotions.js");
var Leadership = require("./models/leadership.js");

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error : "));

db.once("open", function() {
    console.log("Succcessfully connected to the db driver");

/*
    var promotion = new Promotion({
        name : "Weekend Grand Buffet",
        "image": "images/buffet.png",
        "label": "New",
        "price": "19.99",
        "description": "Featuring . . ."
    });

    promotion.save(function(err) {
        assert.equal(err, null);
        Promotion.find({}, function(err, promotions) {
            assert.equal(err, null);
            console.log(promotions);
            db.collection("promotions").drop(function() {
                db.close();
            });
        });
    });
*/
    var leader = new Leadership({
        "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."
    });

    leader.save(function(err) {
        assert.equal(err, null);
        Leadership.find({}, function(err, leaders) {
            assert.equal(err, null);
            console.log(leaders);
            db.collection("leaderships").drop(function() {
                db.close();
            });
        });
    });
/*
    Dishes.create({
        name : "Fatta",
        image : "images/uthapizza.png",
        category : "mains",
        price : "4.99",
        description : "A very popular egyptian meal",
        comments : [
            {
                rating : 5,
                comment : "This was very delecious",
                author : "Muhamed Hafez"
            }
        ]
    }, function(err, dish) {
        assert.equal(err, null);

        console.log("Dish created!");
        console.log(dish);
        var id = dish._id;

        setTimeout(function() {
            Dishes.findByIdAndUpdate(id, {
                $set : {
                    description : "The best meal ever"
                }
            }, {
                new : true
            })
            .exec(function(err, dish) {
                assert.equal(err, null);
                console.log("Dish updated!");
                console.log(dish);

                dish.comments.push({
                    rating : 4,
                    comment : "I really enjoyed it, but it was a little spicy",
                    author : "Mohamed Shehata"
                });

                dish.save(function(err, dish) {
                    assert.equal(err, null);
                    console.log("Comments updated!");
                    console.log(dish);

                    db.collection("dishes").drop(function() {
                        db.close();
                    });
                });
            });
        }, 3000);
    });
    */
});
