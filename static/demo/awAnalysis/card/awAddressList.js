awAddressList({
  "className": 'ListMenu',
  task: {
    "data": [],
    style: {
      "overflow": "auto",
      "padding-top": "20px"
    },
    option: {
      style: {
        "border": "none",
        "border-radius": 0,
        "background-color": "transparent",
        "overflow": "auto"
      }
    },
    open: [0],
    clickCallback: function (d, e) {

    },
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
    updateResult: function (card, dsl) {
      card.task.data = tData;
      card.task.url = webCpu.interface.domainItemList.url;
      card.task.query = webCpu.interface.domainItemList.query;
      card.task.query.dsl = JSON.stringify(dsl);
      card.task.requestType = webCpu.interface.domainItemList.requestType;
      card.task.dataType = "json";
      webCpu.CardItem.fresh(card);
    },
    promise: {
      beforeRender: function (container, data, task) {
        if (typeof (task.dataFilter) === "function") {
          task.data = task.dataFilter(data);
          // delete task.dataFilter;
        }
        task.updateAction(task.data);
      },
      afterRender: function (container, data, task) {
        var tTask = webCpu.cards.leftAreaItem.task;
        var end = tTask.end.split(" ")[0];
        var start = tTask.start.split(" ")[0];

        task.setDateRange(start, end);
        $(task.titleArea).find(".allHistoryBtn").off("click");
        $(task.titleArea).find(".allHistoryBtn").on("click", function(){
          start = "1976-01-01";
          task.setDateRange(start, end);
        });

        webCpu.bindEnter(task.titleArea, $(task.titleArea).find(".searchBtn")[0]);
        
        $(task.titleArea).find(".searchBtn").off("click");
        $(task.titleArea).find(".searchBtn").on("click", function(){
          task.query.dsl = JSON.stringify({
            from: 0,
            size: 100,
            beginTime: task.start,
            endTime: task.end
          });
          webCpu[task.className].render(task);
        });

        $(container).find(".panel-heading").eq(2).on("click", function () {
          var card = webCpu.cards.centerAreaItem;
          var sIndex = $(this).parent().attr("index");
          var d = task.data[sIndex];
          if (d.type !== "noLivemap") {
            return false;
          }
          task.currentData = {
            name: d.name || d.title,
            value: d.badge
          }
          card.task.current = {
            type: "noLivemap"
          }
          var tDsl = {
            "index": "website",
            "query": {
              "bool": {
                "must": [{
                  "match": {
                    "isLive": false
                  }
                }]
              }
            },
            "from": 0,
            "size": 50,
            "beginTime": task.start,
            "endTime": task.end,
            "order": "desc"
          };
          task.updateResult(card, tDsl);
        });
        $(container).find(".list-group-item").off("click");
        $(container).find(".list-group-item").on("click", function () {
          var sIndex = $(this).attr("index");
          var index = $(this).parent().parent().parent().attr("index");
          var tData = task.data[index].content[sIndex];
          task.currentData = {
            name: (task.data[index].name || task.data[index].title) + "-" + tData.title,
            value: tData.badge
          }

          var card = webCpu.cards.centerAreaItem;

          card.task.current = {
            type: task.data[index].type,
            serviceType: tData.type || ""
          }
          var tDsl = {
            "index": "website",
            "query": {
              "bool": {
                "must": [{
                  "match": {
                    "type": card.task.current.type
                  }
                }, {
                  "match": {
                    "serviceType": card.task.current.serviceType
                  }
                }, {
                  "match": {
                    "isLive": true
                  }
                }]
              }
            },
            "from": 0,
            "size": 50,
            "beginTime": task.start,
            "endTime": task.end,
            "order": "desc"
          };
          task.updateResult(card, tDsl);
        });
        
        var selector = $(container).find(".list-group-item").eq(0)
        var type = task.currentType;
        if(type) {
          selector = $(container).find(".list-group-item[type='"+type+"']").eq(0);
        }
        selector.click();
      }
    },
    requestType: "get",
    dataType: "json"
  }
});