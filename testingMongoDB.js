var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var dboper = require("./operations")

var url = "mongodb://localhost:27017/conFusion";

mongoClient.connect(url, function(err, db) {
    assert.equal(err, null);
    console.log("Connect correctly to server");

    dboper.insertDocument(db, {name : "Fatta", description : "An egyptian meal"}, "dishes", function(result) {
        console.log(result.ops);

        dboper.findDocument(db, "dishes", function(docs) {
            console.log(docs);

            dboper.updateDocument(db, {name : "Fatta"}, {description : "The best meal ever"}, "dishes", function(result) {
                console.log(result.result);

                dboper.findDocument(db, "dishes", function(docs) {
                    console.log(docs);

                    db.dropCollection("dishes", function(result) {
                        console.log("drop collection result : " + result);
                        db.close();
                    });
                });
            });
        });
    });
});
