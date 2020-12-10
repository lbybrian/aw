awSituation({
  task: {
    cards: {
      "centerItem": {
        "key": 'golaxy_worldMap',
        "url": "product/golaxy_worldMap.js",
        interface: "golaxy_worldMap",
        "callback": function (c, d, t) {
          d.title = "<div style='padding-left: 20px; width: 100%; text-align: left;'>节点地域分布</div>"
          d.task.dataFilter = function (data) {
            return data.data;
          }
          d.task.query.beginTime = webCpu.cards.mainAreaItem.task.start;
          d.task.query.endTime = webCpu.cards.mainAreaItem.task.end;
          d.task.dataFilter = function (dd) {
            var count = 0;
            var tData = dd.data;
            for (var k in tData) {
              count += tData[k];
            }
            $(webCpu.cards.mainAreaItem.task.container).find(".nodeNumber").html(count);
            return tData;zo
          }
          d.task.clickCallback = function (tData) {
            var id = tData.id;
            window.open("/awNode?country=" + id + "&start=" + webCpu.cards.mainAreaItem.task.start + "&end=" + webCpu.cards.mainAreaItem.task.end, "_blank");
          }
        }
      },
      "siteTypeRank": {
        url: "demo/awAnalysis/card/countryColumn.js",
        key: "test",
        interface: "countryColumn",
        callback: function (c, d, t) {
          d.title = "网站类型排行";
          d.titleHeight = 30;
          d.titleStyle = {
            "padding-left": "20px"
          }
          d.task.query.beginTime = webCpu.cards.mainAreaItem.task.start;
          d.task.query.endTime = webCpu.cards.mainAreaItem.task.end;
          d.task.dataFilter = function (tData) {
            var data = [];
            var count = 0;
            if (tData) {
              for (var k in tData.data) {
                count += Number(tData.data[k]);
                data.push({
                  name: k,
                  value: tData.data[k]
                });
              }
            }
            data.sort((a, b) => {
              return b.value - a.value;
            });
            $(webCpu.cards.mainAreaItem.task.container).find(".siteNumber").html(count);
            return data;
          }
          console.log(d.task.option);
          d.task.option.xAxis.axisLabel = {
            color: "#ddd",
            show: true,
            formatter: function (param) {
              console.log(param);
              param = param || "未知";
              var name = webCpu.params.siteTypes[param] || "未知";
              // var str = `${name}: ${param.value}`
              return name;
            },
            interval: 0,
            rotate: 40,
            //				   grid: {  
            //						left: '10%',
            //						bottom:'20%',
            //					 },
          };
          d.task.option.tooltip = {
            formatter: function (param) {
              console.log(param);
              param.name = param.name || "未知";
              var name = webCpu.params.siteTypes[param.name] || param.name || "未知";
              // var str = param.seriesName + "<br/>"
              var str = "";
              str += `${name}: ${param.value}`;
              return str;
            }
          }
          d.task.promise.afterRender = function (c, d, t) {
            t.chart.on("click", function (e) {
              console.log(e);
              if (e.name !== undefined) {
                url = "/navigation?type=" + e.name;
                url += "&flag=2" + "&start=" + webCpu.cards.mainAreaItem.task.start + "&end=" + webCpu.cards.mainAreaItem.task.end
                window.open(url);
              }
            });
          }
        }
      },
      "pageTypeRank": {
        url: "demo/awAnalysis/card/countryColumn.js",
        key: "test",
        interface: "golaxy_column",
        callback: function (c, d, t) {
          d.title = "网页类别排行榜";
          d.titleHeight = 30;
          d.titleStyle = {
            "padding-left": "20px"
          }
          d.task.query.beginTime = webCpu.cards.mainAreaItem.task.start;
          d.task.query.endTime = webCpu.cards.mainAreaItem.task.end;
          d.task.dataFilter = function (tData) {
            var data = [];
            var count = 0;
            if (tData) {
              for (var k in tData.data) {
                count += Number(tData.data[k]);
                data.push({
                  name: k,
                  value: tData.data[k]
                });
              }
            }
            data.sort((a, b) => {
              return b.value - a.value;
            });
            $(webCpu.cards.mainAreaItem.task.container).find(".pageNumber").html(count);
            return data;
          }
          console.log(d.task.option);
          d.task.option.xAxis.axisLabel = {
            show: true,
            color: "#ddd",
            interval: 0,
            rotate: 40,
            formatter: function (param) {
              console.log(param);
              param = param || "未知";
              var name = webCpu.params.pageTypes[param] || "未知";
              // var str = `${name}: ${param.value}`
              return name;
            }
          };
          d.task.option.tooltip = {
            formatter: function (param) {
              console.log(param);
              param.name = param.name || "未知";
              var name = webCpu.params.pageTypes[param.name] || param.name || "未知";
              // var str = param.seriesName + "<br/>"
              var str = "";
              str += `${name}: ${param.value}`;
              return str;
            }
          }
          d.task.promise.afterRender = function (c, d, t) {
            t.chart.on("click", function (e) {
              console.log(e);
              if (e.name !== undefined) {
                url = "/search?type=" + e.name;
                url += "&flag=2" + "&start=" + webCpu.cards.mainAreaItem.task.start + "&end=" + webCpu.cards.mainAreaItem.task.end
                window.open(url);
              }
            });
          }
        }
      },
      "sitePageTrend": {
        url: "product/golaxy_line.js",
        key: "golaxy_line",
        interface: "sitePageTrend",
        callback: function (c, d, t) {
          d.title = "新增节点和网站数量趋势";
          d.titleHeight = 30;
          d.titleStyle = {
            "padding-left": "20px"
          }
          d.task.query.beginTime = webCpu.cards.mainAreaItem.task.start;
          d.task.query.endTime = webCpu.cards.mainAreaItem.task.end;
          d.task.dataFilter = function (tData) {
            var dd = {
              name: ["节点", "网站", "网页"],
              data: tData.data
            }

            // data.sort((a, b) => {
            //   return b.value - a.value;
            // });

            return dd;
          }
          // console.log(d.task.option);
          // d.task.option.xAxis.axisLabel = {
          //   show: true,
          //   formatter: function (param) {
          //     console.log(param);
          //     param = param || "未知";
          //     var name = webCpu.params.siteTypes[param] || "未知";
          //     // var str = `${name}: ${param.value}`
          //     return name;
          //   }
          // };
          d.task.option.legend.textStyle = {
            color: "#ddd"
          }
          // d.task.option.tooltip.formatter = function (param) {
          //   console.log(param);

          //   return str;
          // }


        }
      },
      "pageLangPercent": {
        url: "product/golaxy_pie.js",
        key: "test1",
        interface: "golaxy_pie",
        callback: function (c, d, t) {
          d.title = "网页语种占比";
          d.titleHeight = 30;
          d.titleStyle = {
            "padding-left": "20px"
          }
          d.task.option.series[0].name = "语种占比";
          d.task.query.beginTime = webCpu.cards.mainAreaItem.task.start;
          d.task.query.endTime = webCpu.cards.mainAreaItem.task.end;
          d.task.dataFilter = function (tData) {
            var data = [];
            if (tData) {
              for (var k in tData.data) {
                data.push({
                  // name: webCpu.params.langMap[tData.data[k].key] || tData.data[k].key || "未知",
                  name: tData.data[k].key,
                  value: tData.data[k].doc_count
                });
              }
            }
            return data;
          }
          d.task.option.series[0].label = {
            show: true,
            formatter: function (param) {
              console.log(param);
              param.name = param.name || "未知"
              var name = webCpu.params.langMap[param.name] || param.name || "未知";
              var str = `${name}: ${param.percent}%`
              return str;
            }
          };
          d.task.option.tooltip = {
            formatter: function (param) {
              console.log(param);
              param.name = param.name || "未知"
              var name = webCpu.params.langMap[param.name] || param.name || "未知";
              var str = param.seriesName + "<br/>"
              str += `${name}: ${param.percent}%`;
              return str;
            }
          }
          d.task.promise.afterRender = function (c, d, t) {
            t.chart.on("click", function (e) {
              console.log(e);
              if (e.name !== undefined) {
                url = "/search?lang=" + e.name;
                url += "&flag=1" + "&start=" + webCpu.cards.mainAreaItem.task.start + "&end=" + webCpu.cards.mainAreaItem.task.end
                window.open(url);
              }
            });
          }
        }
      }
    },
    setSelectorText: function (selector, str) {
      $(this.container).find(selector).html(str);
    },
    template: '<div style="width: 100%; height: 100%; box-shadow: 0px -1px 0px inset #ddd; position: relative;">\
                        <div style="position: relative; z-index: 9993; display: inline-block; left: 15px; padding-top: 10px;"   where="leftArea" >\
                        	<div style="display: inline-block;" class="btn-group" role="group">\
                          <button value="1" type="button" class="btn btn-default">今天</button>\
                          <button value="7" type="button" class="btn btn-default">近一周</button>\
                          <button value="30" type="button" class="btn btn-default">近一月</button>\
                          <button value="all" type="button" class="btn btn-default">所有</button>\
                          </div>\
                        	<div class="dateRange" style="display: inline-block;"><input class="form-control" style="width: 190px;" type="text" /></div>\
                        <div style="padding-left: 20px; display: inline-block; color: #ddd; text-align: center;">\
                          <label style="margin: 0px; width: 160px;">新增节点数：<span style="cursor: pointer;" link="/awNode" class="badge nodeNumber linkBtn">0</span></label>\
                          <label style="margin: 0px; width: 160px;">更新网站数：<span style="cursor: pointer;" link="/navigation" class="badge siteNumber linkBtn">0</span></label>\
                          <label style="margin: 0px; width: 160px;">新增页面数：<span style="cursor: pointer;" link="/search" class="badge pageNumber linkBtn">0</span></label></div>\
                        </div>\
                        <div style="width: 100%; height: calc( 100% - 50px ); position: relative;">\
                            <div component="CardItem" cardName="centerItem" class="conterArea" style="display: inline-block; float: left; height: 100%; width: calc( 100% - 500px ); position: relative; text-align: center;"></div>\
                            <div style="display: inline-block; float: left; height: 100%; width: 500px; position: relative; float: left;" >\
                             <div style="height: 100%; overflow: auto; width: 100%;">\
                              <div component="CardItem" cardName="siteTypeRank" style="height: 33%; width: 100%; float: left;"></div>\
                              <div component="CardItem" cardName="pageLangPercent"  style="height: 33%; width: 100%; float: left;"></div>\
                              <div component="CardItem" cardName="pageTypeRank" style="height: 33%; width: 100%; float: left;"></div>\
                              <div component="CardItem" cardName="sitePageTrend" style="height: 33%; width: 100%; float: left;"></div>\
                          	 </div>\
                           	</div>\
                        </div>\
                    </div>',
    promise: {
      beforeRender: function (container, data, task) {
        var start = moment(new Date());
        var end = moment(new Date());
        task.start = start.subtract(3, "months").format('YYYY-MM-DD') + " 00:00:00";
        task.end = end.format('YYYY-MM-DD') + " 23:59:59";

      },
      afterRender: function (container, data, task) {
        var end = task.end.split(" ")[0];
        var start = task.start.split(" ")[0];
        task.setDateRange(start, end);

        $(container).find(".btn-group .btn").on("click", function () {
          var end = moment(new Date());
          var start = moment(new Date());
          var v = $(this).attr("value");
          if (v === "7") {
            start = start.subtract(7, "days").format('YYYY-MM-DD');
          } else if (v === "1") {
            start = start.format('YYYY-MM-DD');

          } else if (v === "30") {
            start = start.subtract(1, "months").format('YYYY-MM-DD');
          } else if (v === "all") {
            start = "1976-01-01";
          } else {
            start = start.subtract(3, "months").format('YYYY-MM-DD');
          }
          task.current = v;
          end = end.format('YYYY-MM-DD');
          var where = $(this).parent().parent().attr("where")
          task.setDateRange(start, end, where);
          task.updateChartItems(start + " 00:00:00", end + " 23:59:59", where);
          console.log(v);
        });

        $(container).find(".linkBtn").on("click", function () {
          var link = $(this).attr("link");
          link += "?start=" + task.start + "&end=" + task.end;
          window.open(link, "_blank");
        });


      }
    },
    setDateRange: function (start, end, flag) {
      var _self = this;
      var selector = ".dateRange>input";
      // if (flag) {
      //   selector = "." + flag + " .dateRange>input";
      // }

      $(this.container).find(selector).daterangepicker({
          locale: {
            format: 'YYYY-MM-DD',
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '起始时间',
            toLabel: '结束时间',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
              '七月', '八月', '九月', '十月', '十一月', '十二月'
            ],
            firstDay: 1
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
    freshChartItems(flag) {
      // if (flag === "leftArea") {
      webCpu.CardItem.fresh(webCpu.cards.centerItem);
      // } else {
      webCpu.CardItem.fresh(webCpu.cards.siteTypeRank);
      webCpu.CardItem.fresh(webCpu.cards.pageLangPercent);
      webCpu.CardItem.fresh(webCpu.cards.pageTypeRank);
      if (Number(this.current) !== 1) {
        $(this.container).find("[cardName='sitePageTrend']").show();
        webCpu.CardItem.fresh(webCpu.cards.sitePageTrend);
      } else {
        $(this.container).find("[cardName='sitePageTrend']").hide()
      }
    }
    // }

  }
});