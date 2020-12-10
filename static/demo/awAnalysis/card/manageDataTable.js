manageDataTable({
  "className": 'DataTable',
  "footHeight": 60,
  "task": {
    "option": {
      "headerOption": [],
      "attributeMap": {

      },
      "page": {
        "total": 1,
        "size": 10,
        "current": 1
      },
      defaultItem: [{
        "type": 'text',
        "width": '120px',
        "value": ''
      }]
    },
    "header": [],
    "data": [],
    "itemMap": {
      
    },
    "dateOption": {
      "format": 'yyyy-mm-dd',
      "minView": 'month',
      "language": 'zh-CN',
      "autoclose": true
    },
    "addRecord": function() {
      var _self = this;
      this.editDialog("添加记录", null, function(d, i) {
        _self.data.unshift(d);
        webCpu.DataTable.update(_self);
        webCpu.saveAppData(_self.cardName);
      });
    },
    "editRecord": function(index) {
      var _self = this;
      this.editDialog("编辑记录", index, function(d, i) {
        for (var k in d) {
          _self.data[i][k] = d[k];
        }
        webCpu.DataTable.update(_self);
        webCpu.saveAppData(_self.cardName);
      });
    },
    "configData": function(d) {
      var header = this.header;
      var configData = [];
      for (var i = 0; i < header.length; i++) {
        if (header[i].key && header[i].editor) {
          var k = header[i].key;
          var tItem = header[i].editor;
          if(tItem.constructor.name !== "Array") {
            tItem = [tItem];
          }
          var item = {
            title: header[i].name,
            name: k,
            value: "",
            items: WebTool.copyObject(tItem)
          };
          if (d) {
            item.value = d[k];
          }
          configData.push(item);
        }
      }
      return configData;
    },
    "editDialog": function(title, index, callback) {
      var d = index || {};
      if (typeof(index) === "number" || typeof(index) === "string") {
        d = this.data[index];
      }
      var header = this.header;
      var configData = this.configData(d);
      var _self = this;
      webCpu.CardItem.configDialog(_self, title, configData, function() {
        var inputItem = webCpu.FormItem.getValue(_self.inputTask);
        var _d = {};
        for (var j = 0; j < inputItem.length; j++) {
          _d[inputItem[j].name] = inputItem[j].value;
        }
        if (typeof(callback) === "function") {
          callback(_d, index);
        }
      }, "300px");
    },
    "promise": {
      "beforeRender": function (container, data, task) {
        var tData = data;
       
        if (tData.pager) {
          task.option.page = {
            total: tData.pager.total,
            current: tData.pager.start,
            size: tData.pager.limit
          };
        }
        if (typeof (task.dataFilter) === "function") {
          task.data = data = task.dataFilter(data);
        }

        task.header = [];
        let tMap = task.option.attributeMap;
        for (let k in tMap) {
          var tItem = {
            key: k,
            editor: tMap[k].editor
          };
          if (typeof (tMap[k]) === "string") {
            tItem.name = tMap[k];
          } else {
            tItem.name = tMap[k].name;
            tItem.render = tMap[k].render;
            tItem.titleTips = tMap[k].titleTips;
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