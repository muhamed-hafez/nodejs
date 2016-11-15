var express = require('express');
var http = require('http');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(session({
    name : 'session-id',
    secret : '12345-67890-09876-54321',
    saveUninitialized : true,
    resave : true,
    store : new FileStore()
}));

app.use(function(req, res, next) {
    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        var username, password;
        if(authHeader) {
            var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
            username = auth[0];
            password = auth[1];
        }

        if(username === 'admin' && password === 'password') {
            req.session.user = 'admin';
            next();
        }
        else {
            var error = new Error('You are not authenticated!');
            error.status = 401;
            next(error);
        }
    }
    else {
        if (req.session.user === 'admin') {
            console.log('req.session : ' + req.session);
            next();
        }
        else {
            var error = new Error('You are not authenticated!');
            error.status = 401;
            next(error);
        }
    }
});

app.use(express.static('./public'));

app.use(function(err, req, res, next) {
    res.writeHead(err.status || 500, {'Content-Type' : 'text/plain', 'WWW-Authenticate' : 'Basic'});
    res.end(err.message);
});

app.listen(port, hostname, function() {
    console.log(`Server is running at http://${hostname}:${port}/`);
})
