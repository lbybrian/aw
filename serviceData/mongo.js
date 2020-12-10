var WebTool = require("../custom/WebTool.js");
var Feedback = require("../custom/Feedback.js");
var http = require('http');
var fs = require("fs");

var data = {
  type: "service",
  cardData: [{
    cardName: "countData",
    url: "/countData",
    method: "get",
    callback: function (req, res, task) {
      
    }
  }]
}

module.exports = data;