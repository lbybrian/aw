var express = require("express");
var path = require('path')

var querystring = require('querystring');
var ConfigObject = require("./custom/ConfigObject.js");
var WebService = require("./custom/WebService.js");

var t = path.resolve(__dirname, '.');
var prefix = {
  root: t + "/",
  configData: t + '/config/',
  serviceData: t + '/serviceData/',
}

var app = express();

app.use(express.static("static", {}));
//初始化Web服务
const port = 8080;
var server = app.listen(port, function (a, b, c) {
  const host = "localhost";
  console.log("http://%1:%2".replace("%1", host).replace("%2", port));
});

var otherConfig = ConfigObject.create(prefix.serviceData + "other.js");
var webService = WebService.create(app, otherConfig, {
  prefix: prefix
});


app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, "static", 'index.html'));
});

