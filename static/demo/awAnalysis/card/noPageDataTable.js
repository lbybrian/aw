noPageDataTable({
  "className": 'DataTable',
  "foot": "-",
  "footHeight": 60,
  "task": {
    "option": {
      "headerOption": [],
      "attributeMap": {}
    },
    "header": [],
    "data": [],
    "promise": {
      "beforeRender": function (container, data, task) {
        var tData = data;
        if (typeof (task.dataFilter) === "function") {
          task.data = data = task.dataFilter(data);
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