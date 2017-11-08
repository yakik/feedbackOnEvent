
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('<!DOCTYPE html><html><head><title>Agile Sparks Event Feedback</title></head><body></body></html>');
})

// This responds a POST request for the homepage
//app.post('/', function (req, res) {
//    console.log("Got a POST request for the homepage");
//    res.send('Hello POST');
//})

// This responds a GET request for the /list_user page.
//app.get('/list_user', function (req, res) {
//    console.log("Got a GET request for /list_user");
//    res.send('Page Listing');
//})

//1337
var port = process.env.PORT ;
var server = app.listen(port, function () {});

    var host = server.address().address;
    var myport = server.address().port;

    console.log("Example app listening at http://%s:%s", host, myport);




