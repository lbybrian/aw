searchResult({
  titleHeight: 45,
  style: {

  },
  task: {
    cards: {
      results: {
        "key": 'golaxy_newsItems',
        "url": "product/golaxy_newsItems.js",
        // "interface": "comprehensiveSearch",
        "filter": {

        },
        "callback": function (c, d, t) {
          d.cardName = "topicDataCard"
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
          d.task.option.style.background = "rgba(0, 0, 0, 0.6)";
          d.task.promise.beforeRender = function (cc, dd, tt) {
            tt.tData = dd.data || [];
            if (dd.data) {
              tt.option.page = {
                "total": dd.data.total,
                "size": dd.data.size,
                "current": dd.data.from
              }
            }

            var titleArea = webCpu.cards.centerAreaItem.task.titleArea;
            $(titleArea).find(".pageNumber").html(tt.tData.total);
            var tTask = webCpu.cards.leftAreaItem.task;
            if (tTask && tTask.current) {
              // var flag = tTask.current.flag;
              // if (flag === "1") {
              //   flag = "今天";
              // } else {
              //   flag = "近7天"
              // }
              $(titleArea).find(".listType").html(tTask.current.title);
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
                description: item.url
              };

              return d;
            });
          }
          d.task.promise.afterRender = function (cc, dd, tt) {
            var selector = $(cc).find("select");
            webCpu.commonTool.initOptions(selector, webCpu.params.siteTypes);

            $(cc).find(".list-group-item").find("button.moreRelativeBtn").on("click", function (e) {
              // webCpu.cards.centerAreaItem.task.displayRelatedPageList("测试Domain");
              var item = $(this).parent().parent().parent();
              var tData = tt.data[item.attr("index")];
              var domain = tData.domain || tData.url;
              var app = webCpu.cards.centerAreaItem.task.cards.results;
              var option = webCpu.interface.comprehensiveSearch;
              option.query.dsl = JSON.stringify({
                keyword: "",
                lang: "",
                type: "",
                publisher: "",
                beginTime: "",
                endTime: "",
                root: domain,
                from: 0,
                size: 50
              })

              webCpu.CardItem.cardDialog(webCpu.cards.centerAreaItem, app.url, "<span style='color: #ddd'>" + domain + "</span>", {
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

            $(cc).find(".list-group-item").find("select").val(function(index){
              var type = tt.tData.topicList[index].type;
              return type;
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
              webCpu.adapter.changePageSiteType(query, function(ret) {
                toolTip(3, ret.data, ret.msg);
              })
              e.preventDefault();
              return false;
            })


            $(cc).find(".list-group-item").find("button.previewBtn").on("click", function () {
              var index = $(this).parent().parent().parent().attr("index");
              webCpu.interface.pageDetail.query.dsl.query.term.url = dd[index].url;
              var tData = tt.tData.topicList[index];
              console.log(dd[index]);
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
                        var image = d.data.data[0]._source.image;
                        var html = d.data.data[0]._source.html;
                        for (var i = 0; i < image.length; i++) {
                          var img = image[i].image_name.replace(/\-{5}/g, ".").replace(/\-{2}/g, "/");
                          img = img.replace(/.jpg$/, "");
                          // img = img.replace(/^\//, "");
                          html = html.replace(img, "http://" + image[i].url);
                        }
                        // var encode = encodeURIComponent(html);
                        // var base64 = btoa(encode);
                        // var base64 = btoa(html);
                        // var url = "data:text/html;charset=UTF-8;base64," + base64;
                        t.template = html;
                      }
                    },
                    afterRender: function (c, d, t) {
                      $(c).find("img").on("error", function() {
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
    promise: {
      beforeRender: function (container, data, task) {
        data = data || {};
        var t = data.data || {}
        task.tData = t.result || [];
        task.data = task.tData.map(function (item) {
          var d = {
            title: item.titleTranslation || item.title || item.url,
            lang: item.lang,
            content: item.content,
            translation: item.contentTranslation,
            url: item.url
          };
          d.description = d.translation || d.content;
          if (d.description.length > 120) {
            d.description = d.description.slice(0, 120) + "...";
          }
          return d;
        });
      },
      afterRender: function (container, data, task) {
        webCpu.updateView(container, task.cards.results);

        $(task.titleArea).find(".dropdown-menu>li>a").on("click", function () {
          var text = $(this).html();
          var value = $(this).parent().attr("data");
          var btnSelector = $(this).parent().parent().parent().children("button");
          btnSelector.children(".buttonText").html(text);
          btnSelector.children(".buttonText").attr("data", value);
        });

        $(task.titleArea).find(".trendBtn").on("click", function () {
          var app = webCpu.app.lineChart;
          webCpu.interface.topicDataTrend.query.topicId = webCpu.cards.leftAreaItem.task.current.id;
          webCpu.interface.topicDataTrend.query.beginTime = webCpu.cards.leftAreaItem.task.start;
          webCpu.interface.topicDataTrend.query.endTime = webCpu.cards.leftAreaItem.task.end;
          webCpu.CardItem.cardDialog(webCpu.cards.topicDataCard, app.url, "专题网页近7天新增量趋势", {
            width: "100%"
          }, {
            key: app.key,
            interface: "topicDataTrend",
            callback: function (cc, dd, tt) {
              dd.task.dataFilter = function (d) {
                var rData = {
                  data: d.data.data,
                  name: "专题网页量趋势"
                }
                return rData;
              }
            }
          });
        });

        $(task.titleArea).find(".dropdown-menu li").off("click");
        $(task.titleArea).find(".dropdown-menu li").on("click", function () {
          var tt = webCpu.cards.topicDataCard.task;
          var myInput = $(task.titleArea).find(".myInput").attr("data");
          var dsl = JSON.parse(tt.query.dsl);
          dsl.order = myInput;
          tt.query.dsl = JSON.stringify(dsl);
          webCpu.ListGroup.render(tt);
        });
        
      }
    }

  }
});