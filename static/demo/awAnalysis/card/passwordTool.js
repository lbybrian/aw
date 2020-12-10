passwordTool({
  titleMenu: [{
    text: '<div class="input-group" style="margin-right: 10px;">\
              <span class="input-group-addon"  id="basic-addon1">域名</span>\
              <input type="text" class="form-control domainInput"  placeholder="输入域名" aria-describedby="basic-addon1">\
            </div><div class="input-group">\
            <div class="input-group-btn">\
              <button type="button" style="width: 100px;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="buttonText">精确匹配</span> <span class="caret"></span></button>\
              <ul class="dropdown-menu">\
                <li><a >精确匹配</a></li>\
                <li><a >前缀匹配</a></li>\
                <li><a >后缀匹配</a></li>\
                <li><a >模糊匹配</a></li>\
                <li><a >正则匹配</a></li>\
              </ul>\
            </div>\
            <input type="text" style="width: 180px;" class="form-control keywordInput" placeholder="输入查询字符串">\
            <span>\
              <button class="btn btn-primary searchBtn" type="button">查询</button>\
              <button class="btn btn-default transPasswordBtn" type="button">生成密码</button>\
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
        // "interface": "passwordTool",
        "filter": {

        },
        "callback": function (c, d, t) {
          d.cardName = "resultTableCard"
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
          // d.title = "<div style='width: 100%;'><button class='btn btn-primary btn-sm'>导出</button></div>"
          d.task.option.attributeMap = {
            "password": {
              name: "密码明文",
              titleTips: "always",
              render: function (v, d) {
                var pass = d._id || "#";
                return pass;
              }
            },
            "users": {
              name: "账号",
              render: function (v, d) {
                var str = "";
                for (var i = 0; i < d.users.length; i++) {
                  str += `<div>${d.users[i]}</div>`;
                }
                return str;
              }
            },
            "domain": {
              name: "所属域名",
              render: function (v, d) {
                var str = "";
                for (var i = 0; i < d.users.length; i++) {
                  var domain = d.users[i].split("@");
                  domain = domain[domain.length - 1] || "";
                  str += `<div>${domain}</div>`;
                }
                return str;
              }
            },
            "md5": {
              name: "md5",
              render: function (v, d) {
                // var t = d.key.split("@")[1] || "";
                var t = d.md5 || "#";
                return t;
              }
            },
            "sha1": {
              name: "sha1",
              render: function (v, d) {
                // var t = d.key.split("@")[1] || "";
                var t = d.sha1 || "";
                return t;
              }
            },
            "ntlm": {
              name: "ntlm",
              render: function (v, d) {
                // var t = d.key.split("@")[1] || "";
                var t = d.ntlm || "#";
                return t;
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
              "total": tData.total || 10000,
              "size": Number(tData.size) || 50,
              "current": Number(tData.from) || 1
            }

            return t;
          };

          d.task.copyText = function (obj) {
            var elem = document.createElement("input");
            $(elem).css({
              position: "absolute"
            })
            $(elem).val(obj.innerText);
            document.body.appendChild(elem);
            elem.select();
            document.execCommand("Copy")
            // elem.collapse(false);
            document.body.removeChild(elem);
          };

          d.task.promise.afterRender = function (cc, dd, tt) {
            $(cc).find("div[key=password]").on("click", function () {
              tt.copyText(this);
            });
          }

        }
      }
    },
    searchType: {
      "plain": "明文",
      "md5": "md5",
      "sha1": "sha1",
      // "wpa2": "wpa2",
      "ntlm": "ntlm"
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
        });

        $(task.titleArea).find(".transPasswordBtn").on("click", function () {
          var card = webCpu.cards.resultTableCard;
          var v = $(task.titleArea).find("input.keywordInput").val();
          var template = "<span style='font-size: 30px; color: #fff;'>请先输入密码明文。</span>";
          if (v) {
            var query = webCpu.interface.passwordTrans.query;
            query.q = v;
            webCpu.adapter.passwordTrans(query, function (dd) {
              template = "<p style='text-align: left; padding: 20;'><span style='font-weight: 900; '>明文字符串</span>: " + v + "</p>";
              for (var k in dd) {
                template += "<p style='text-align: left; font-size: 14px; padding: 20; margin-top: 10px;'><span style='font-weight: 900; '>" + k + "密文</span>: " + dd[k] + "</p>";
              }
              webCpu.CardItem.showTips(card, template, null, {
                tipsTitle: "结果展示"
              }, {
                width: "450px",
                height: "220px",
                background: "rgba(100, 100, 100, 0.6)"
              });
            })
          } else {
            webCpu.CardItem.showTips(card, template, null, {
              tipsTitle: "结果展示"
            }, {
              width: "600px",
              height: "300px",
              background: "rgba(100, 100, 100, 0.6)"
            });
          }
        });

        $(task.titleArea).find(".searchBtn").on("click", function () {
          var v = $(task.titleArea).find("input.keywordInput").val();
          var t = $(task.titleArea).find(".buttonText").attr("data");
          var domain = $(task.titleArea).find("input.domainInput").val();
          $(task.titleArea).find(".exportItem").css("display", "inline-block");
          if (v || domain) {
            var option = task.cards.results;
            var interface = WebTool.copyObject(webCpu.interface["passwordTool"]);
            interface.query.q = v;
            interface.query.hashType = t;
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

            var params = {
              q: v,
              hashType: t,
              domain: domain,
              from: 1,
              limit: 200
            }
            var url = WebTool.attachParams(interface.query.url, params);
            url += "&download=1";
            $(task.titleArea).find(".exportLink").attr("href", url);


            webCpu.updateView(container, task.cards.results, interface, 1);


          }
        });
      }
    }

  }
});