var assert = require("assert");
var mongoose = require("mongoose");
var Dishes = require("./models/dishes.js");

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error : "));

db.once("open", function() {
    console.log("Succcessfully connected to the db driver");

    var dish = Dishes({
        name : "Pizza",
        description : "Test"
    });

    dish.save(function(err) {
        assert.equal(err, null);

        Dishes.find({}, function(err, dishes) {
            assert.equal(err, null);
            console.log(dishes);

            db.collection("dishes").drop(function() {
                db.close();
            });
        });
    });
});
