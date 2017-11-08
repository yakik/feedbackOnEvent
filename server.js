var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "html"});
    response.write('<!DOCTYPE html><html><head><title>Agile Sparks Event Feedback</title></head><body></body></html>')
    response.end("Hello W orld!");


});


var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
