var express = require("express");
var http = require("http");
var morgan = require("morgan");

var hostname = "localhost";
var port = 3000;

var app = express();

app.use(morgan("dev"));

app.use(function(req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    var username, password;
    if(authHeader) {
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        username = auth[0];
        password = auth[1];
    }

    if(username === 'admin' && password === 'password') {
        next();
    }
    else {
        var error = new Error('You are not authenticated!');
        error.status = 401;
        next(error);
    }
});

app.use(express.static("./public"));

app.use(function(err, req, res, next) {
    res.writeHead(err.status || 500, {'Content-Type' : 'text/plain', 'WWW-Authenticate' : 'Basic'});
    res.end(err.message);
});

app.listen(port, hostname, function() {
    console.log(`Server is running at http://${hostname}:${port}/`);
})
