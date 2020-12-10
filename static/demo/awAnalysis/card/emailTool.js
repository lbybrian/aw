emailTool({
  titleMenu: [{
    text: '<div class="input-group" style="margin-right: 10px;">\
              <span class="input-group-addon" id="basic-addon1">域名</span>\
              <input type="text" class="form-control  domainInput"  placeholder="输入域名"  aria-describedby="basic-addon1">\
            </div><div class="input-group">\
            <div class="input-group-btn">\
              <button type="button" style="width: 120px;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="buttonText">精确匹配</span> <span class="caret"></span></button>\
              <ul class="dropdown-menu">\
                <li><a >精确匹配</a></li>\
                <li><a >前缀匹配</a></li>\
                <li><a >后缀匹配</a></li>\
                <li><a >模糊匹配</a></li>\
                <li><a >正则匹配</a></li>\
              </ul>\
            </div>\
            <input type="text" class="form-control keywordInput" placeholder="输入查询字符串">\
            <span class="input-group-btn">\
              <button class="btn btn-primary searchBtn" type="button">查询</button>\
              <button style="display: none;" class="btn btn-default regExampleBtn" type="button">正则表达式示例</button>\
            </span>\
          </div>',
    data: {

    }
  }, {
    text: '<span class="exportItem" style="display: none; width: 100%; text-align: right; padding-right: 20px;"><a class="exportLink" download="密码列表数据.xlsx"><button class="btn btn-primary exportBtn" type="button">导出Excel</button></a></span>'
  }],
  titleStyle: {
    "background-color": "rgba(220,220,220,0.5)"
  },
  titleHeight: 45,
  task: {
    cards: {
      "results": {
        "key": 'manageDataTable',
        "url": "demo/awAnalysis/card/manageDataTable.js",
        "filter": {

        },
        "callback": function (c, d, t) {
          d.cardName = "resultTableCard";
          d.style = {
            padding: "0px 20px"
          }
          d.foot = "-";
          d.task.option = d.task.option || {};
          d.task.option.page = d.task.option.page || {
            "flag": true,
            "total": 0,
            "size": 50,
            "current": 1
          };
          d.task.option.attributeMap = {
            "uid": {
              name: "账号",
              render: function (v, d) {
                return d._id || "#"
              }
            },
            "domin": {
              name: "域名",
              render: function (v, d) {
                var t = "";
                if (d._id) {
                  t = d._id.split("@")[1] || "#";
                }
                return t;
              }
            },
            "password": {
              name: "密码明文",
              render: function (v, d) {
                var str = "";
                for (var i = 0; i < d.pass.length; i++) {
                  str += `<div>${d.pass[i]}</div>`;
                }
                return str;
              }
            }
          };

          d.task.pageCallback = function (n, size) {
            this.query = this.query || {};
            if (n === "0" || n === 0) {
              n = 1;
            }
            this.query.from = n;
            this.query.limit = size || 10;
            webCpu.render("DataTable", this);
          }

          d.task.dataFilter = function (tData) {
            var t = tData.data;
            if (t && t.constructor.name === "Object") {
              t = [t];
            }
            this.option.page = {
              "flag": true,
              "total": tData.total || 1999,
              "size": Number(tData.size) || 50,
              "current": Number(tData.from) || 1
            }
            return t;
          }
        }
      }
    },
    searchType: {
      "default": "默认",
      "id": "精确匹配",
      "prefix": "前缀匹配",
      "suffix": "后缀匹配",
      "substr": "模糊匹配",
      "regex": "正则匹配"
    },
    updateSelectList: function (elem, data) {
      var btnSelector = $(elem).find("button .buttonText");
      var menuSelector = $(elem).find(".dropdown-menu");
      menuSelector.html("");
      var temp = Object.keys(data)[0];
      btnSelector.html(data[temp]);
      btnSelector.attr("data", temp);
      for (var k in data) {
        $('<li data="' + k + '"><a >' + data[k] + '</a></li>').appendTo(menuSelector);
      }
    },
    promise: {
      beforeRender: function (container, data, task) {

      },
      afterRender: function (container, data, task) {
        webCpu.updateView(container, task.cards.results);
        var tSelector = $(task.titleArea).find(".input-group-btn");
        task.updateSelectList(tSelector[0], task.searchType);

        webCpu.bindEnter(task.titleArea, $(task.titleArea).find(".searchBtn")[0]);

        $(task.titleArea).find(".dropdown-menu>li>a").on("click", function () {
          var text = $(this).html();
          var data = $(this).parent().attr("data");
          var btnSelector = $(this).parent().parent().parent().children("button");
          btnSelector.children(".buttonText").html(text);
          btnSelector.children(".buttonText").attr("data", data);
          if(data === "regex") {
            $(task.titleArea).find(".regExampleBtn").show();
          }
          else {
            $(task.titleArea).find(".regExampleBtn").hide();
          }
        });

        $(task.titleArea).find(".regExampleBtn").on("click", function () {
          var card = webCpu.cards.resultTableCard;
          var v = $(task.titleArea).find("input.keywordInput").val();
          var template = "<p style='font-size: 30px; color: #fff;'>a[abc].*com</p>";
          template += "<p style='font-size: 30px; color: #fff;'>^\\d[qwe].*\\.ru</p>";
          template += "<p style='font-size: 30px; color: #fff;'>^[0-9]+.*com</p>"

          webCpu.CardItem.showTips(card, template, null, {
            tipsTitle: "正则表达式示例"
          }, {
            width: "400px",
            height: "250px",
            background: "rgba(100, 100, 100, 0.6)"
          });

        });

        $(task.titleArea).find(".searchBtn").on("click", function () {
          var v = $(task.titleArea).find("input.keywordInput").val();
          var t = $(task.titleArea).find(".buttonText").attr("data");
          var domain = $(task.titleArea).find("input.domainInput").val();
          $(task.titleArea).find(".exportItem").css("display", "inline-block");

          if (v || domain) {
            var option = task.cards.results;
            var interface = WebTool.copyObject(webCpu.interface["emailTool"]);
            interface.query.q = v;
            interface.query.searchType = t;
            interface.query.domain = domain;
            interface.query.from = 1;
            interface.query.limit = 50;
            var logined = webCpu.cards._main.task.logined;
            if (logined && logined.name) {
              interface.query.headers = {
                userId: logined.name,
                token: 123456
              }
            }

            webCpu.updateView(container, task.cards.results, interface, 1);

            var params = {
              q: v,
              searchType: t,
              domain: domain,
              from: 1,
              limit: 200
            }
            var url = WebTool.attachParams(interface.query.url, params);
            url += "&download=1";
            $(task.titleArea).find(".exportLink").attr("href", url);

          }
        });
      }
    }

  }
});