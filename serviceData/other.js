var WebTool = require("../custom/WebTool.js");
var Feedback = require("../custom/Feedback.js");
var ConfigObject = require("../custom/ConfigObject.js");
var path = require('path')
var qs = require('querystring');
var request = require('request');
var http = require('http');
var fs = require("fs");
const urlTool = require('url');
var axios = require("axios");
var MongoClient = require('mongodb').MongoClient;

var data = {
  type: "service",
  cardData: [{
    cardName: "gateway",
    url: "/gateway",
    method: "get",
    callback: function (req, res, task) {
      var query = req.query;
      var tUrl = query.url;
      var method = query.method || "get";
      var dsl = query.dsl;
      if (!tUrl) {
        WebTool.requestTool.sendData({
          ret: 1,
          message: "缺少要的参数。"
        }, req, res);
      }
      var headers = query.headers || "{}";
      delete query.url;
      delete query._t;
      delete query.method;
      delete query.dsl;
      delete query.headers;
      var tQuery = {};
      for (var k in query) {
        if (typeof (query[k]) === "string") {
          tQuery[k] = Number(query[k]) || query[k];
        } else {
          tQuery[k] = JSON.stringify(query[k]);
        }
      }

      headers = JSON.parse(headers);

      console.log(headers);

      for (var k in headers) {
        axios.defaults.headers.common[k] = headers[k];
      }

      if (method === "get" || method === "delete") {
        tQuery = tQuery || {};
        tQuery.time = (new Date()).getTime();
        var tUrl = WebTool.objectTool.attachParams(tUrl, tQuery);
        console.log(tUrl);
        axios[method](tUrl).then(function (res4) {
          WebTool.requestTool.sendData(res4.data, req, res);
        });
      } else if (dsl) {
        dsl = JSON.parse(dsl);
        var tUrl = WebTool.objectTool.attachParams(tUrl, tQuery);
        axios[method](tUrl, dsl, {
          'Content-Type': 'application/json; charset=UTF-8'
        }).then(function (res4) {
          WebTool.requestTool.sendData(res4.data, req, res);
        });
      } else {
        axios[method](tUrl, qs.stringify(tQuery), {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }).then(function (res4) {
          WebTool.requestTool.sendData(res4.data, req, res);
        });
      }

    }
  }]
}

module.exports = data;