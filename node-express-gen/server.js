var assert = require("assert");
var mongoose = require("mongoose");
var Dishes = require("./models/dishes.js");

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error : "));

db.once("open", function() {
    console.log("Succcessfully connected to the db driver");

    Dishes.create({
        name : "Fatta",
        description : "A very popular egyptian meal"
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

                db.collection("dishes").drop(function() {
                    db.close();
                });
            });
        }, 3000);
    });
});
