var http = require("http");
var path = require("path");
var fs = require("fs");

var hostname = "localhost";
var port = 3000;

var server = http.createServer(function(req, res) {
    console.log("Request for " + req.url + " by method " + req.method);

    if(req.method == "GET") {
        var fileURL;
        if(req.url == "/") {
            fileURL = "/index.html";
        }
        else {
            fileURL = req.url;
        }

        var filePath = path.resolve("./public" + fileURL);
        var fileExt = path.extname(filePath);

        console.log(fileExt);

        if(fileExt == ".html") {
            // only return the file if it ends with .html
            fs.exists(filePath, function(exists) {
                if(exists) {
                    res.writeHead(200, {"Content-Type" : "text/html"});
                    fs.createReadStream(filePath).pipe(res);
                }
                else {
                    res.writeHead(404, {"Content-Type" : "text/html"});
                    res.end("<h1>File not found!</h1>");
                }
            });
        }
        else {
            res.writeHead(404, {"Content-Type" : "text/html"});
            res.end("<h1>File is not html!</h1>");
        }
    }
    else {
        res.writeHead(404, {"Content-Type" : "text/html"});
        res.end("<h1>We only handle GET requests!</h1>");
    }
});

server.listen(port, hostname, function() {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
