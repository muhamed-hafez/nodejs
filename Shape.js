var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var notes = [
  {id : 1, creater : "Hafez", content : "Node is good"},
  {id : 2, creater : "Hafez", content : "Hello, world!"},
  {id : 3, creater : "Hafez", content : "Playing around with Node.js"},
  {id : 4, creater : "Hafez", content : "See the orange of modified :)"}
];

app.use(bodyParser.json());

app.get("/notes", function(req, res) {
  res.json(notes);
})

app.post("/add_note", function(req, res) {
  console.log(req.body);
  notes.push(req.body);
  res.json(notes);
})

app.listen(3000);
