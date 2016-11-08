var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
var express = require('express');
var app = express();
app.use(express.static('.'));
app.get('/stream.jpg', new MjpegProxy('http://192.168.43.33:8080/?action=stream').proxyRequest);
app.listen(8080);
