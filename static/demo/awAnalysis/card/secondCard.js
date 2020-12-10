secondCard({
  titleMenu: [{
    text: '<div class="input-group">\
              <input type="text" class="form-control" placeholder="输入用户ID">\
              <span class="input-group-btn">\
                <button class="btn btn-default searchBtn" type="button">检索</button>\
              </span>\
            </div>',
    data: {

    }
  }],
  titleStyle: {
    "background-color": "rgba(220,220,220,0.5)"
  },
  titleHeight: 45,
  task: {
    cards: {
      "leftItem": {
        "key": 'manageItems',
        "url": "product/manageItems.js",
        "callback": function (c, d, t) {
          d.task.url = "demo/idsAnalysis/mockData/analysisMenu.json";
          d.task.requestType = "get";
          d.task.dataType = "json";
          var _self = this;
          d.task.clickCallback = function (data) {
            var centerItem = webCpu.cards.centerItem;
            _self.current = data.title;
            if (data.content) {
              return false;
            } else if (data.title === "密码关联账号") {
              centerItem.task.option.attributeMap = {
                "account": "账号",
                "type": "类型",
                "password": "密码明文",
                "ciphertext": "密码密文",
                "rAccount": "关联账号",
              };
              centerItem.task.url = "demo/idsAnalysis/mockData/accountInfo.json";
              centerItem.task.requestType = "get";
              centerItem.task.dataType = "json";
              centerItem.task.dataFilter = null;
              $(webCpu.cards.analysis.task.container).find(".rightArea").hide();
            } else {
              centerItem.task.option.attributeMap = {
                "uid": "账号",
                "password": "密码明文",
                "md5hash_16": "16位hash",
                "md5hash_32": "32位hash",
                "valid": "有效性"
              };
              // centerItem.task.url = "demo/idsAnalysis/mockData/accountInfo.json";
              centerItem.task.url = "gateway";
              centerItem.task.query = {
                url: "http://10.170.130.230:9081/store-rest/store/v2.1/email_db/info",
              }
              centerItem.task.query.query = JSON.stringify({
                domin: data.title
              })
              centerItem.task.requestType = "get";
              centerItem.task.dataType = "json";
              centerItem.task.dataFilter = function (d) {
                return d.data;
              }
              $(webCpu.cards.analysis.task.container).find(".rightArea").show();

              var rightItem = webCpu.cards.rightItem;
              rightItem.task.option = rightItem.task.option || {};
              rightItem.task.option.filter = {
                key: "domain",
                value: data.title
              }
              webCpu.CardItem.fresh(rightItem);
            }
           
            centerItem.task.promise.afterRenderCard = function (c2, d2, t2) {
              $(t2.titleArea).find(".exportBtn").on("click", function () {
                if (t2.exportCSV) {
                  t2.exportCSV(c2, data.title);
                }
              })
         
            }
            centerItem.title = "<p style='margin: 0px; width: 100%; padding: 0px;'><span style='float: left;'>" + data.title + "</span><button style='float: right; margin-right: 5px;' class='btn btn-sm btn-primary exportBtn'>导出</button></p>"
            webCpu.CardItem.fresh(centerItem);
          }
        }
      },
      "centerItem": {
        url: "product/golaxy_dataTable.js",
        key: "golaxy_dataTable",
        exportCSV: function (c2, title) {
          var $trs = $(c2).find("tr");
          var str = "";
          var $ths = $trs.find("th");
          for (var j = 0; j < $ths.length; j++) {
            str += $ths.eq(j).text() + ",";
          }
          str += "\n";
          for (var i = 0; i < $trs.length; i++) {
            var $tds = $trs.eq(i).find("td");
            for (var j = 0; j < $tds.length; j++) {
              str += $tds.eq(j).text() + ",";
            }
            str += "\n";
          }

          var aaaa = "data:text/csv;charset=utf-8,\ufeff" + str;
          var link = document.createElement("a");
          link.setAttribute("href", aaaa);

          link.setAttribute("download", title + ".csv");
          link.click();
        },
        callback: function (c1, d1, t1) {
          d1.title = "<p style='margin: 0px; width: 100%; padding: 0px;'><span style='float: left;'>密码关联账号</span><button style='float: right;  margin-right: 5px;' class='btn btn-sm btn-primary exportBtn'>导出</button></p>";
          d1.task.option.attributeMap = {
            "account": "账号",
            "type": "类型",
            "password": "密码明文",
            "ciphertext": "密码密文",
            "rAccount": "关联账号"
          };
          d1.task.url = "demo/idsAnalysis/mockData/accountInfo.json";
          d1.task.requestType = "get";
          d1.task.dataType = "json";
          d1.task.exportCSV = this.exportCSV;
          var t = (new Date()).getTime();
          d1.task.promise.afterRenderCard = function (c2, d2, t2) {
            $(t2.titleArea).find(".exportBtn").on("click", function () {
              if (t2.exportCSV) {
                t2.exportCSV(c2, "密码关联账号");
              }
            })
            var gap = (new Date()).getTime() - t;
            console.log(gap);
          }
        }
      },
      rightItem: {
        "key": 'domainInfoList',
        "url": "demo/idsAnalysis/card/domainInfoList.js",
        "callback": function (c, d, t) {
          d.task.url = "demo/idsAnalysis/mockData/domainInfo.json";
          d.task.requestType = "get";
          d.task.dataType = "json";
        }
      }
    },
    template: '<div style="width: 100%; height: 100%;  position: relative;">\
                        <div style="padding-left:360px; padding-right: 350px;  width: 100%; height: 100%; position: relative;">\
                            <div component="CardItem" cardName="centerItem" class="conterArea" style="padding: 5px; width: 100%; height: 100%; position: relative; text-align: center;"></div>\
                        </div>\
                        <div class="leftArea" component="CardItem" cardName="leftItem" style="box-shadow: 0px 1px 1px #000; padding: 10px 15px; width: 350px; height:100%; position: absolute; overflow: auto; top: 0px;"></div>\
                        <div class="rightArea" component="CardItem" cardName="rightItem" style="padding: 10px 15px; width: 350px; height:100%; position: absolute; overflow: auto; top: 0px; right: 0px;"></div>\
                    </div>',
    promise: {
      beforeRender: function (container, data, task) {

      },
      afterRender: function (container, data, task) {
        if (task.cards.leftItem.current === "密码关联账号" || !task.cards.leftItem.current) {
          $(container).find(".rightArea").hide();
        }

        $(task.titleArea).find(".searchBtn").on("click", function(){
          var v = $(task.titleArea).find("input").val();
          if(v) {
            var option = webCpu.router.index.children.accountTable;
            option.query = {
              uid: v
            };
            option.queryConfig = {
              uid: "like"
            }
            webCpu.CardItem.cardDialog(webCpu.cards.centerItem, option.url, v, null, option);
            // option.query = null;
            // option.queryConfig = null;
            $(task.titleArea).find("input").val("");
          }
        });

        $(task.titleArea).children("div").css({
          "justify-content":"left",
          "padding-left": "365px"
        })

      }
    }

  }
});