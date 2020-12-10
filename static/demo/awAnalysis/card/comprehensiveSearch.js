comprehensiveSearch({
  titleMenu: [{
//<<<<<<< HEAD
//  text: '<div class="input-group" style="margin-right: 10px;">\
//            <span class="input-group-addon" id="basic-addon1">时间段</span>\
//            <input type="text" style="width: 220px;" class="form-control dateRange"  aria-describedby="basic-addon1">\
//            <button value="all" type="button" class="btn btn-default allHistoryBtn">所有</button>\
//          </div><div class="input-group" style="margin-right: 10px; float: left;">\
//              <span class="input-group-addon" id="basic-addon1">域名</span>\
//=======
    text: '<div style="position: absolute;left: 5px; z-index: 9993; display: inline-block; left: 15px; padding: 10px;"   where="leftArea" >\
				        	<div style="display: inline-block;"  class="btn-group" role="group">\
					          <button value="1" type="button" class="btn btn-default">今天</button>\
					          <button value="7" type="button" class="btn btn-default">近一周</button>\
					          <button value="30" type="button" class="btn btn-default">近一月</button>\
					          <button value="all" type="button" class="btn btn-default">所有</button>\
				          </div>\
				          <div class="dateRange" style="display: inline-block;"><input class="form-control" style="width: 230px;" type="text" /></div>\</div>\
								<div class="input-group" style="margin-right: 10px; float: left;">\
                        <span class="input-group-addon" id="basic-addon1">域名</span>\
                <input type="text" class="form-control domainInput"  placeholder="输入域名" aria-describedby="basic-addon1">\
              </div>\
              <div class="input-group" style="margin-left: 10px;">\
              <span class="input-group-addon" id="basic-addon1">语种</span>\
              <div class="input-group-btn" aria-describedby="basic-addon1">\
                <button type="button" style="width: 90px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data="cn" class="buttonText langInput">中文</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
                <ul class="dropdown-menu" style="overflow: auto; max-height: 300px;"></ul>\
              </div>\
            </div><div class="input-group"  style="margin-left: 10px;">\
              <span class="input-group-addon" id="basic-addon1">类型</span>\
              <div class="input-group-btn" aria-describedby="basic-addon1">\
                <button type="button" style="width: 100px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="buttonText typeInput">关键字</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
                <ul class="dropdown-menu"></ul>\
              </div>\
            </div>\
            <div class="input-group"  style="margin-left: 10px;">\
              <input type="text" class="form-control keywordInput" placeholder="输入关键字">\
              <span class="input-group-btn">\
                <button class="btn btn-primary searchBtn" type="button">检索</button>\
              </span>\
            </div>\
            <div class="input-group input-group-xs"  style="position: absolute; right: 10px; display: inline-block; vertical-align: middle;">\
            <span class="input-group-addon" id="basic-addon1">时间排序</span>\
            <div class="input-group-btn" aria-describedby="basic-addon1">\
              <button type="button" style="width: 100px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data="desc" class="buttonText myInput">默认</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
              <ul class="dropdown-menu dropdown-menu-right">\
                <li data="desc"><a>默认</a></li>\
                <li data="desc"><a>降序</a></li>\
                <li data="asc"><a>升序</a></li>\
              </ul>\
            </div>\</div>\
          </div>',
    data: {

    }
  }],
  setDateRange: function (start, end, flag) {
      var _self = this;
      var selector = ".dateRange>input";
      // if (flag) {
      //   selector = "." + flag + " .dateRange>input";
      // }
      $(this.container).find(selector).daterangepicker({
          locale: {
            format: 'YYYY-MM-DD'
          },
          startDate: start,
          endDate: end
        },
        function (start, end, label) {
          _self.start = start.format('YYYY-MM-DD') + " 00:00:00";
          _self.end = end.format('YYYY-MM-DD') + " 23:59:59";
          _self.updateChartItems(_self.start, _self.end, flag);
        });
    },
    updateDuration: function (start, end, flag) {
      // if (flag === "leftArea") {
        webCpu.cards.centerItem.task.query.beginTime = start;
        webCpu.cards.centerItem.task.query.endTime = end;
      // } else {
        webCpu.cards.siteTypeRank.task.query.beginTime = start;
        webCpu.cards.siteTypeRank.task.query.endTime = end;
        webCpu.cards.pageLangPercent.task.query.beginTime = start;
        webCpu.cards.pageLangPercent.task.query.endTime = end;
        webCpu.cards.pageTypeRank.task.query.beginTime = start;
        webCpu.cards.pageTypeRank.task.query.endTime = end;
        webCpu.cards.sitePageTrend.task.query.beginTime = start;
        webCpu.cards.sitePageTrend.task.query.endTime = end;
      // }

    },
    updateChartItems: function (start, end, flag) {
      this.updateDuration(start, end, flag);
      this.freshChartItems(flag);
    },
  titleStyle: {
    "text-align": "left",
    "background-color": "rgba(220,220,220,0.5)"
  },
  titleHeight: 45,
  style: {

  },
  task: {
    cards: {
      "results": {
        "key": 'golaxy_newsItems',
        "url": "product/golaxy_newsItems.js",
        // "interface": "comprehensiveSearch",
        "filter": {

        },
        "callback": function (c, d, t) {
          d.cardName = "searchResultCard";
          d.footStyle = {
            "padding-left": "10px"
          }
          d.foot = "-";
          d.task.option = d.task.option || {};
          d.task.option.page = d.task.option.page || {
            "total": 0,
            "size": 50,
            "current": 1
          };
          d.task.pageCallback = function (n, size) {
            this.query = this.query || {};
            var dsl = this.query.dsl || "{}";
            dsl = JSON.parse(this.query.dsl);
            dsl.from = n;
            dsl.size = size || 10;
            this.query.dsl = JSON.stringify(dsl);
            webCpu.render("ListGroup", this);
          }
          d.task.option.template = '<div style="cursor: text; position: relative; float: left; width: 100%;"><h4 style="word-break:break-all; margin-top: 5px;  padding:0px;" class="list-group-item-heading"><label style="margin-top: 5px;  width: calc( 100% - 180px );  position: relative; float: left;">{{name}}</label> \
                                      <button style="float: right; margin-top: 5px;  margin-left: 10px; font-size: 10px; margin-right: 3px; background-color: transparent; color: #ddd;" type="button" class="btn btn-default btn-xs previewBtn">预览</button>\
                                      <button style="float: right; margin-top: 5px;  margin-left: 10px; font-size: 10px; margin-right: 3px; background-color: transparent; color: #ddd;" type="button" class="btn btn-default btn-xs moreRelativeBtn">同域名其他页面</button>\
                                      <label style="font-size: 10px; float: right; margin:0px; margin-top: 5px;">类型:<select style="margin-left: 3px; background-color: transparent; margin-right: 3px; padding: 2px 5px; "></select></label></h4>\
                                  <div class="list-group-item-text" style="position: relative; float: left; width: 100%; word-break:break-all; margin-bottom:10px; margin-top: 5px;">\
                                    <div style="width: calc( 100% - 180px ); display: inline-block;">{{description}}</div> \
                                    <label style="float: right; padding-top: 5px;"> (<span> 语言: {{lang}}</span>)(<span> 入库时间:{{pubTime}}</span>)</label></div> </div>';
console.log('dddddddddddd',d)
          d.task.option.style.background = "rgba(0, 0, 0, 0.6)";
          d.task.promise.beforeRender = function (cc, dd, tt) {
console.log('cccccdddddddttttt',cc,dd,tt)
          	
            tt.tData = dd.data || [];
            if (dd.data) {
              tt.option.page = {
                "total": dd.data.total,
                "size": dd.data.size,
                "current": dd.data.from
              }
            }

            tt.tData.topicList = tt.tData.topicList || [];

            tt.data = tt.tData.topicList.map(function (item) {
              var lang = webCpu.params.langMap[item.lang] || "未知";
              if (!item.lang) {
                lang = "未知";
              }
              var d = {
                lang: lang,
                name: (item.titleTranslation || item.title || item.url),
                id: item.id,
                domain: item.root,
                pubTime: item.pubTime,
                url: item.url,
                type: webCpu.params.pageTypes[item.type] || '未知',
                description: item.url
              };

              return d;
            });
          }
          d.task.promise.afterRender = function (cc, dd, tt) {
            var selector = $(cc).find("select");
            webCpu.commonTool.initOptions(selector, webCpu.params.siteTypes);

            $(cc).find(".list-group-item").find("button.moreRelativeBtn").off("click");
            $(cc).find(".list-group-item").find("button.moreRelativeBtn").on("click", function (e) {
              // webCpu.cards.mainAreaItem.task.displayRelatedPageList("测试Domain");
              var selector = $(this).parent().parent().parent();
              var tData = tt.data[selector.attr("index")];
              var domain = tData.domain || tData.url;
              var app = webCpu.cards.mainAreaItem.task.cards.results;
              var option = webCpu.interface.comprehensiveSearch;
              option.query.dsl = JSON.stringify({
                keyword: "",
                lang: "",
                type: "",
                publisher: "",
                beginTime: "",
                endTime: "",
                order: "desc",
                root: domain,
                from: 0,
                size: 50
              })

              webCpu.CardItem.cardDialog(webCpu.cards.mainAreaItem, app.url, "<span style='color: #ddd'>" + domain + "</span>", {
                width: "100%",
                background: "#000",
                overflow: "auto"
              }, {
                interface: "comprehensiveSearch",
                key: app.key,
                callback: app.callback
              });
              e.preventDefault();
              return false;
            })
            $(cc).find(".list-group-item").find("select").on("click", function (e) {
              e.preventDefault();
              return false;
            })

            $(cc).find(".list-group-item").find("select").on("change", function (e) {
              //Todo 修改网页类型
              var selector = $(this).parent().parent().parent().parent();
              var type = selector.find("select").val();
              var tData = tt.data[selector.attr("index")];
              var query = webCpu.interface.changePageSiteType.query;
              query.dsl = JSON.stringify([{
                id: tData.id,
                type: type
              }])
              webCpu.adapter.changePageSiteType(query, function (ret) {
                // alert(1);
                toolTip( ret.data, ret.msg);
              })
              e.preventDefault();
              return false;
            })

            $(cc).find(".list-group-item").find("select").val(function (index) {
              var type = tt.tData.topicList[index].type;
              return type;
            })

            $(cc).find(".list-group-item").find(".previewBtn").on("click", function () {
              var index = $(this).parent().parent().parent().attr("index");
              webCpu.interface.pageDetail.query.dsl.query.term.url = dd[index].url;
              console.log(dd[index]);
              var tData = tt.tData.topicList[index];
              var card = {
                style: {
                  overflow: "auto"
                },
                task: {
                  url: webCpu.interface.pageDetail.url,
                  query: webCpu.interface.pageDetail.query,
                  template: "",
                  checkTimeout: function (n) {
                    // var c = card.task.container;
                    setTimeout(function () {
                      var tLen = $(card.task.container).find(".TemplateItem>div").length;
                      tLen = tLen || $(card.task.container).find(".TemplateItem>main").length;
                      if (tLen === 0) {
                        webCpu.CardItem.switchMask(card, "html", "<span style='font-weight: 800; color: red;'>加载网页失败</span>");
                      }
                    }, n || 1000);
                  },
                  promise: {
                    beforeRender: function (c, d, t) {
                      if (d && d.data && d.data.data && d.data.data[0] && d.data.data[0]._source) {
                        // var image = d.data.data[0]._source.image;
                        var html = d.data.data[0]._source.html;
                        // for (var i = 0; i < image.length; i++) {
                        //   var img = image[i].image_name.replace(/\-{5}/g, ".").replace(/\-{2}/g, "/");
                        //   img = img.replace(/.jpg$/, "");
                        //   // img = img.replace(/^\//, "");
                        //   html = html.replace(img, "http://" + image[i].url);
                        // }
                        // var encode = encodeURIComponent(html);
                        // var base64 = btoa(encode);
                        // var base64 = btoa(html);
                        // var url = "data:text/html;charset=UTF-8;base64," + base64;
                        t.template = html;
                      }
                    },
                    afterRender: function (c, d, t) {
                      $(c).find("img").on("error", function () {
                        $(this).remove();
                      })
                    }
                  },
                  requestType: "get",
                  dataType: "json"
                }
              }

              var str = "";
              var title = dd[index].name;

              if (tData.lang === "en") {
                str = "<button class='viewbtn' style='position: absolute; top: 10px; left: 5px; z-index: 3;'>译文</button>";
                title = "<span style='padding: 10px 30px;'></span>" + dd[index].name;
              }

              webCpu["CardItem"].cardDialog(webCpu.cards.main, card, title, {
                width: "100%",
                height: "100%",
                background: "#fff"
              }, {
                callback: function (c1, d1, t1) {
                  $(t1.maskTitle).find(".viewbtn").on("click", function () {
                    console.log(d1.task.data.data.data[0]);
                    d1.task.data.data.data[0]._source.contentTranslation;
                    webCpu["CardItem"].showTips(card, d1.task.data.data.data[0]._source.contentTranslation, function () {

                    }, {
                      tipsTitle: "[中文翻译]"
                    }, {
                      width: "80%",
                      height: "80%",
                      background: "#fff",
                      overflow: "auto"
                    });

                  });
                }
              }, str);

              card.task.checkTimeout(30000);

            });
          }
        }
      }
    },
    updateSelectList: function (elem, data) {
      var btnSelector = $(elem).find("button .buttonText");
      var menuSelector = $(elem).find(".dropdown-menu");
      menuSelector.html("");
      var temp = Object.keys(data)[0];
      btnSelector.html(data[temp]);
      btnSelector.attr("data", temp);
      for (var k in data) {
        $('<li data="' + k + '"><a>' + data[k] + '</a></li>').appendTo(menuSelector);
      }
    },
    setDateRange: function (start, end, flag) {
      var _self = this;
      var selector = ".dateRange>input";
      this.start = start + " 00:00:00";
      this.end = end + " 23:59:59";
      $(this.titleArea).find(selector).daterangepicker({
          locale: {
            format: 'YYYY-MM-DD',
            applyLabel : '确定', 
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
          },
          startDate: start,
          endDate: end
        },
        function (start, end, label) {
          _self.start = start.format('YYYY-MM-DD') + " 00:00:00";
          _self.end = end.format('YYYY-MM-DD') + " 23:59:59";
        });
    },
    promise: {
      beforeRender: function (container, data, task) {
        var start = moment(new Date());
        var end = moment(new Date());
        task.start = start.subtract(3, "months").format('YYYY-MM-DD') + " 00:00:00";
        task.end = end.format('YYYY-MM-DD') + " 23:59:59";

        task.start = decodeURIComponent(WebTool.urlQuery(location.href, "start") || task.start);
        task.end = decodeURIComponent(WebTool.urlQuery(location.href, "end") || task.end);

      },
      afterRender: function (container, data, task) {
        var end = task.end.split(" ")[0];
        var start = task.start.split(" ")[0];

        task.setDateRange(start, end);

        webCpu.bindEnter(task.titleArea, $(task.titleArea).find(".searchBtn")[0]);

        var btnGroup = $(task.titleArea).find(".input-group-btn");
        task.updateSelectList(btnGroup[0], webCpu.params.langMap);
        task.updateSelectList(btnGroup[1], webCpu.params.siteTypes);
        $(task.titleArea).find(".allHistoryBtn").off("click");
        $(task.titleArea).find(".allHistoryBtn").on("click", function () {
          start = "1976-01-01";
          task.setDateRange(start, end);
        });

        var lang = WebTool.urlQuery(location.href, "lang") || "";
        var type = WebTool.urlQuery(location.href, "type") || "";
        var flag = WebTool.urlQuery(location.href, "flag") || "0";
        var domain = WebTool.urlQuery(location.href, "domain") || "";
        var option = webCpu.interface.comprehensiveSearch;

        $(task.titleArea).find(".domainInput").val(domain);

        $(task.titleArea).find(".langInput").data(lang);
        $(task.titleArea).find(".langInput").data(lang);
        $(task.titleArea).find(".langInput").html(webCpu.params.langMap[lang]);

        $(task.titleArea).find(".typeInput").attr("data", type);
        $(task.titleArea).find(".typeInput").html(webCpu.params.siteTypes[type]);
        option.query.dsl = JSON.stringify({
          keyword: "",
          lang: lang,
          type: type,
          publisher: "",
          flag: flag,
          root: domain,
          order: "desc",
          beginTime: task.start,
          endTime: task.end,
          from: 0,
          size: 50
        })


        task.cards.results.interface = "comprehensiveSearch";
        webCpu.updateView(container, task.cards.results);

        $(task.titleArea).find(".dropdown-menu>li>a").on("click", function () {
          var text = $(this).html();
          var value = $(this).parent().attr("data");
          var btnSelector = $(this).parent().parent().parent().children("button");
          btnSelector.children(".buttonText").html(text);
          btnSelector.children(".buttonText").attr("data", value);
        });

        $(task.titleArea).find(".dropdown-menu li").off("click");
        $(task.titleArea).find(".dropdown-menu li").on("click", function () {
          var tt = webCpu.cards.searchResultCard.task;
          var myInput = $(task.titleArea).find(".myInput").attr("data");
          var dsl = JSON.parse(tt.query.dsl);
          dsl.order = myInput;
          tt.query.dsl = JSON.stringify(dsl);
          webCpu.ListGroup.render(tt);
        });

        $(task.titleArea).find(".searchBtn").off("click");
        $(task.titleArea).find(".searchBtn").on("click", function () {
          var publisher = $(task.titleArea).find("input.publisherInput").val();
          var keyword = $(task.titleArea).find("input.keywordInput").val();
          var lang = $(task.titleArea).find(".langInput").attr("data");
          var type = $(task.titleArea).find(".typeInput").attr("data");
          var domain = $(task.titleArea).find(".domainInput").val();
          // if (publisher || keyword || lang || type) {
          var option = webCpu.interface.comprehensiveSearch;
          option.query.dsl = JSON.stringify({
            publisher: publisher || "",
            keyword: keyword,
            lang: lang,
            type: type,
            root: domain,
            beginTime: task.start,
            endTime: task.end,
            order: "desc",
            flag: 0,
            from: 0,
            size: 50
          });
          option.query.rootLikeQuery = 1;
          task.cards.results.interface = "comprehensiveSearch";
          webCpu.updateView(container, task.cards.results);
          // }
        });

      }
    }

  }
});