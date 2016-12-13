var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
var express = require('express');
var app = express();
app.use(express.static('../'));
app.get('/myStream.jpg', new MjpegProxy('http://192.168.43.134:8080/?action=stream').proxyRequest);
app.listen(8000);
