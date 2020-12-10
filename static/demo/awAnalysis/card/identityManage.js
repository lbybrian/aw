identityManage({
  "className": 'DataTable',
  "cardName": "searchResultsTable",
  "foot": "-",
  "footHeight": 60,
  "condition": [{
    name: "Select City",
    key: "city",
    children: [{
      name: "all"
    }, {
      name: "Montgomery"
    }, {
      name: "Mobile"
    }, {
      name: "Birmingham"
    }, {
      name: "Maylene"
    }, {
      name: "Salem"
    }, {
      name: "Prichard"
    }]
  }],
  "task": {
    "option": {
      headerOption: [{
        name: "city",
        children: [{
          name: "统计占比",
          value: "column"
        }],
        key: "city",
        type: "select",
      }, {
        name: "party",
        key: "party",
        type: "select",
        children: [{
          name: "统计占比",
          value: "pie"
        }],
      }, {
        name: "county",
        key: "county",
        type: "select",
        children: [{
          name: "统计占比",
          value: "column"
        }],
      }],
      "attributeMap": {

      },
      page: {
        total: 1,
        size: 10,
        current: 1
      },
    },
    "header": [],
    "data": [],
    "promise": {
      "beforeRender": function (container, data, task) {
        var tData = data;
        if (typeof (task.dataFilter) === "function") {
          task.data = data = task.dataFilter(data);
        }
        if (tData.pager) {
          task.option.page = {
            total: tData.pager.total,
            current: tData.pager.start,
            size: tData.pager.limit
          };
        }

        task.header = [];
        let tMap = task.option.attributeMap;
        for (let k in tMap) {
          var tItem = {
            key: k
          };
          if (typeof (tMap[k]) === "string") {
            tItem.name = tMap[k];
          } else {
            tItem.name = tMap[k].name;
            tItem.render = tMap[k].render;
          }
          task.header.push(tItem);
        }
      },
      "afterRender": function (container, data, task) {
        if (typeof (task.updateDetail) === "function") {
          task.updateDetail(data[0] || {});
        }
        if (typeof (task.countData) === "function") {
          task.countData(data || {});
        }
        if (typeof (task.updateTitleArea) === "function") {
          task.updateTitleArea(task.titleArea);
        }
        if (typeof (task.updateTableHeader) === "function") {
          var headerOption = task.option.headerOption;
          for (var i = 0; i < headerOption.length; i++) {
            var key = headerOption[i].key;
            if (key) {
              headerOption[i].element = $(container).find("th>div[key=" + key + "]");
            }
          }
          task.updateTableHeader(headerOption);
        }
        $(container).find(".detailsBtn").on("click", function () {
          var index = $(this.parentNode.parentNode).attr("index");
          task.updateDetail(data[index] || {});
        })
      }
    },
    "pageCallback": function (n, size) {
      this.query = this.query || {};
      this.query.start = n;
      this.query.limit = size || 10;
      webCpu.render("DataTable", this);
    },
    "url": '',
    query: {
      start: 1,
      limit: 10,
      sort: '{"dob": -1}'
    },
    "requestType": 'get',
    "dataType": 'json'
  }
});