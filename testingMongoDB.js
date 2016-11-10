var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");

var url = "mongodb://localhost:27017/conFusion";

mongoClient.connect(url, function(err, db) {
    assert.equal(err, null);
    console.log("Connect correctly to server");
    var collection = db.collection("dishes");
    collection.insertOne({"name" : "Pizza", "discription" : "The best meal"}
        , function(err, result) {
            assert.equal(err, null);
            console.log("After insert : ");
            console.log(result.ops);
            collection.find({}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found : ");
                console.log(docs);
                db.dropCollection("dishes", function(err, result) {
                    assert.equal(err, null);
                    db.close();
                });
            });
    });
});
