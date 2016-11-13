var assert = require("assert");

exports.insertDocument = function(db, document, collection, callback) {
    var coll = db.collection(collection);
    coll.insert(document, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted " + result.result.n + " documents into the collection " + collection);
        callback(result);
    });
};

exports.findDocument = function(db, collection, callback) {
    var coll = db.collection(collection);
    coll.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocument = function(db, document, callback) {
    var coll = db.collection(collection);
    coll.deleteOne(document, function(err, result) {
        assert.equal(err, null);
        console.log("Removed the document " + document);
        callback(result);
    });
};

exports.updateDocument = function(db, document, update, collection, callback) {
    var coll = db.collection(collection);
    coll.updateOne(document, {$set : update}, null, function(err, result) {
        assert.equal(err, null);
        console.log("Updated document with update " + update);
        callback(result);
    });
}
