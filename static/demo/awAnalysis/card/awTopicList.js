awTopicList({
  "className": 'ListGroup',
  "title": '<input type="text" style="width: 215px;" class="form-control dateRange"  aria-describedby="basic-addon1">\
            <button value="all" type="button" class="btn btn-default allHistoryBtn">所有</button>\
            <label class="configBtn" style="cursor: pointer; position: absolute; right: 0px;  margin: 0px; padding: 0px; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center;"><span class="glyphicon glyphicon-cog"></span></label>',
  task: {
    "data": [],
    setDateRange: function (start, end, flag) {
      var _self = this;
      var selector = ".dateRange";
      this.start = start + " 00:00:00";
      this.end = end + " 23:59:59";
      $(this.titleArea).find(selector).daterangepicker({
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
          var dsl = JSON.parse(_self.query.dsl);
          dsl.beginTime = _self.start;
          dsl.endTime = _self.end;
          _self.query.dsl = JSON.stringify(dsl);
          webCpu[_self.className].render(_self);
        });
    },
    option: {
      style: {
        "border": "solid 1px #666",
        "margin-bottom": "5px",
        "border-radius": 5,
        "color": "#fff",
        "background-color": "transparent"
      }
    },
    open: [0, 1, 2],
    prefix: "product/",
    updateAction: function (d) {
      var _self = this;
      var action = function (e, tData) {
        if (typeof (_self.clickCallback) === "function") {
          _self.clickCallback(d, e);

        }
      };
      if (d && d.constructor.name === "Array") {
        for (var i = 0; i < d.length; i++) {
          this.updateAction(d[i]);
        }
      } else {
        d.action = function (e) {
          action(e, d);
        }
      }
      if (d.content) {
        this.updateAction(d.content);
      }
    },
    dataFilter: function (d) {
      return d;
    },
    updateOptions(arr, data) {
      arr.length = 0;
      for (var k in data) {
        if (k) {
          arr.push({
            name: data[k],
            value: k
          })
        } else {
          arr.push({
            name: "所有",
            value: k
          })
        }

      }
    },
    updateList(n) {
      var _self = this;
      if (webCpu.timer) {
        clearTimeout(webCpu.timer);
      }
      webCpu.timer = setTimeout(function () {
        webCpu.ListGroup.render(_self)
      }, n)
    },
    updateDateRange: function () {
      var start = moment(new Date());
      var end = moment(new Date());
      end = end.format('YYYY-MM-DD');
      start = start.subtract(7, "days").format('YYYY-MM-DD');

      if (this.start) {
        start = this.start.split(" ")[0];
        end = this.end.split(" ")[0];
      }

      this.setDateRange(start, end);
    },
    promise: {
      beforeRender: function (container, data, task) {
        if (typeof (task.dataFilter) === "function") {
          task.data = task.dataFilter(data);
        }
        task.updateAction(task.data);
        task.updateDateRange();
      },
      afterRender: function (container, data, task) {

        $(task.titleArea).find(".allHistoryBtn").off("click");
        $(task.titleArea).find(".allHistoryBtn").on("click", function () {
          var end = moment(new Date());
          end = end.format('YYYY-MM-DD');
          var start = "1976-01-01";
          task.setDateRange(start, end);
          var dsl = JSON.parse(task.query.dsl);
          dsl.beginTime = task.start;
          dsl.endTime = task.end;
          task.query.dsl = JSON.stringify(dsl);
          webCpu[task.className].render(task);
        });

        $(task.titleArea).find(".configBtn").off("click");
        $(task.titleArea).find(".configBtn").on("click", function () {
          var configApp = {
            "url": "demo/awAnalysis/card/manageDataTable.js",
            "key": "manageDataTable",
            "interface": "topicList",
            "callback": function (c, d, t) {
              d.style = {
                padding: "0px 20px"
              }
              d.title = "<div style='width: 100%;'><button style='float: left;' class='btn btn-primary btn-sm addRecordBtn'>新增</button></div>"
              d.task.option.valueMap = {
                type: webCpu.params.siteTypes,
                lang: webCpu.params.langMap
              }
              d.task.option.attributeMap = {
                "name": {
                  "name": "专题名称",
                  "editor": {
                    "type": 'text',
                    "width": '120px',
                    "value": ''
                  }
                },
                "type": {
                  "name": "网页类型",
                  "editor": {
                    "type": 'select',
                    "width": '120px',
                    "options": [{
                      "name": "test",
                      "value": "test"
                    }],
                    "value": ''
                  }
                },
                "lang": {
                  "name": "网页语种",
                  "editor": {
                    "type": 'select',
                    "width": '120px',
                    "options": [{
                      "name": "test",
                      "value": "test"
                    }],
                    "value": ''
                  }
                },
                "keyword": {
                  "name": "关键词",
                  "editor": {
                    "type": 'text',
                    "width": '120px',
                    "value": ''
                  }
                },
                "operator": {
                  name: "操作",
                  render: function (v, d) {
                    var str = "<button query='" + d._id + "' title='删除' class='btn btn-default btn-sm removeBtn'>删除</button>";
                    return str;
                  }
                }
              };
              task.updateOptions(d.task.option.attributeMap.type.editor.options, webCpu.params.siteTypes);
              task.updateOptions(d.task.option.attributeMap.lang.editor.options, webCpu.params.langMap);


              d.task.initAddRecordEvent = function () {
                var _self = this;
                $(this.titleArea).find(".addRecordBtn").off("click");
                $(this.titleArea).find(".addRecordBtn").on("click", function () {
                  _self.editDialog("添加记录", null, function (d, i) {
                    d.keyword = $.trim(d.keyword);
                    d.name = $.trim(d.name);
                    if (d.keyword && d.name) {
                      _self.data.unshift(d);
                      var query = webCpu.interface.saveTopic.query;
                      query.dsl = JSON.stringify([d]);
                      webCpu.adapter.saveTopic(query, function (ret) {
                        if (ret.msg) {
                          toolTip(3, ret.data, ret.msg);
                        }

                        setTimeout(function () {
                          webCpu.DataTable.render(_self);
                        }, 1000)
                      })
                    } else {
                      toolTip(3, 2, "专题名称或关键词不可为空。");
                      $(d.task.titleArea).find(".addRecordBtn").click();
                    }

                  });
                });
              };
              d.task.removeRecordEvent = function () {
                var _self = this;
                $(_self.container).find(".removeBtn").off("click");
                $(_self.container).find(".removeBtn").on("click", function () {
                  var index = $(this).parent().parent().parent().attr("index");
                  webCpu.CardItem.showTips(_self, "确认删除吗？", function () {
                    var tData = _self.data.splice(index, 1)[0];
                    var query = webCpu.interface.deleteTopic.query;
                    if (tData) {
                      query.topicIds = tData.id;
                    }
                    webCpu.adapter.deleteTopic(query, function (ret) {
                      if (ret.msg) {
                        toolTip(3, ret.data, ret.msg);
                      }
                      setTimeout(function () {
                        webCpu.DataTable.render(_self);
                      }, 1000)

                    })
                  }, {
                    confirm: "确认",
                    default: "取消",
                    tipsTitle: "提示"
                  });
                });
              }

              d.task.dataFilter = function (tData) {
                if (tData && tData.data && tData.data.topicList) {
                  this.option.page = {
                    total: tData.data.total,
                    current: tData.data.from,
                    size: tData.data.size
                  }
                  return tData.data.topicList
                }


              }

              d.task.promise.afterRender = function (c1, d1, t1) {
                t1.initAddRecordEvent();
                t1.removeRecordEvent();
              }

            },
            closeCallback: function () {
              webCpu.CardItem.fresh(webCpu.cards.leftAreaItem);
            }
          }

          webCpu["CardItem"].cardDialog(webCpu.cards.dataTopic, configApp.url, "", {
              width: "60%",
              height: "80%"
            },
            configApp, "配置数据监控专题列表");
        });
        $(task.titleArea).find(".list-group-item").off("click");
        $(container).find(".list-group-item").on("click", function () {
          var index = $(this).attr("index");
          var d = task.data[index];
          var flag = $(task.titleArea).find("input[name='options']:checked").val();
          task.current = {
            title: d.title,
            flag: flag,
            id: d.id
          };

          var option = webCpu.interface.comprehensiveSearch;
          d.keyword = $.trim(d.keyword);
          if (d.keyword) {
            option.query.dsl = JSON.stringify({
              keyword: d.keyword || "",
              lang: d.lang || "",
              type: d.type || "",
              publisher: "",
              flag: "0",
              from: 0,
              order: "desc",
              beginTime: task.start,
              endTime: task.end,
              size: 50
            });
            var card = webCpu.cards.centerAreaItem;
            card.task.cards.results.interface = "comprehensiveSearch";
            // card.task.query.topicId = topicId;
            webCpu.CardItem.fresh(card)
          }

        });
        $(container).find(".list-group-item").eq(0).click();
        $(task.titleArea).find("input[name='options']").off("change");
        $(task.titleArea).find("input[name='options']").on("change", function () {
          task.updateDateRange();

          var dsl = task.query.dsl;
          if (typeof (dsl) === "string") {
            dsl = JSON.parse(task.query.dsl)
          }
          dsl.beginTime = task.start;
          dsl.endTime = task.end;
          task.query.dsl = JSON.stringify(dsl);
          webCpu.ListGroup.render(task);
        });

      }
    },
    query: {
      from: 0,
      size: 50
    },
    requestType: "get",
    dataType: "json"
  }
});