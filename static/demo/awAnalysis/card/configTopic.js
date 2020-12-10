configTopic({
  "className": 'ListGroup',
  task: {
    "style": {
      "overflow": "auto"
    },
    "data": [{
      "title": '枪支交易行为',
      "rule": ""
    }, {
      "title": '隐私事件',
      "rule": ""
    }, {
      "title": '毒品交易行为',
      "rule": ""
    }, {
      "title": '色情内容',
      "rule": ""
    }, {
      "title": '黑客工具交易',
      "rule": ""
    }],
    option: {
      "template": "<div style='width: 100%; height: 320px; background: rgba(0, 0, 0, 0.5);'>\
                      <div class='configArea' style='width: calc( 100% - 25px ); height: 100%'></div>\
                      <label class='removeConfigBtn' style='cursor: pointer; position: absolute; right: 0px; top: 0px;  margin: 0px; padding: 0px; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center;'><span class='glyphicon glyphicon-remove'></span></label></div>",
      style: {
        "border": "solid 0px #333",
        "margin-top": "5px",
        "border-radius": "0px",
        "color": "#fff",
        "padding": "0px",
        "background-color": "transparent"
      }
    },
    initOptionsData: function(params) {
      var t = [];
      for(var k in params) {
        if(k) {
          var item = {
            name: params[k],
            value: k
          }
          t.push(item);
        }
      }
      return t;
    },
    promise: { 
      beforeRender: function (container, data, task) {
        if (typeof (task.dataFilter) === "function") {
          task.data = task.dataFilter(data);
          delete task.dataFilter;
        }
      },
      afterRender: function(container, data, task) {
        var listSelector = $(container).find(".list-group-item");
        var typeOption = task.initOptionsData(webCpu.params.siteTypes);
        var langOption = task.initOptionsData(webCpu.params.langMap);
        listSelector.find(".removeConfigBtn").on("click", function(){
          var index = $(this).parent().parent().index();
          console.log(data[index]);
          task.data.splice(index, 1);
 
          webCpu.render(task.className, task);
        });
        for(var i = 0; i < data.length; i++) {
          var elem = listSelector.eq(i).find(".configArea")[0];
          var rule = data[i].rule;
          var tArr = rule.split(";");
          var tMap = {};
          for(var k in tArr) {
            var v = tArr[k].split("=");
            tMap[v[0]] = v[1];
          }
          var tTask = {
            style: {
              "padding": "10px 5px"
            },
            index: i,
            container: elem,
            data: [
              { title: "专题名称",
                name: "name",
                value: data[i].title,
                items: [{
                  type: "text"
                }]
              },
              { title: "类型",
                name: "type",
                value: tMap.type,
                items: [{
                  type: "select",
                  options: typeOption
                }]
              },
              { title: "语种",
                name: "lang",
                value: tMap.lang,
                items: [{
                  type: "select",
                  options: langOption
                }]
              },
              { title: "关键词",
                name: "keyword",
                value: tMap.keyword,
                items: [{
                  type: "text"
                }]
              }
            ],
            taskType: "multi",
            promise: {
              afterRender: function(c, d, t) {
                $(c).find("input").on("change", function(){
                  var index = t.index;
                  if(this.name === "name") {
                    task.data[index].title = $(this).val();
                  }
                  else {
                    task.data[index].rule = $(this).val();
                  }
                  
                });
              }
            }
          }

          

          webCpu.render("FormItem", tTask);
        }
      }
    },
    requestType: "get",
    dataType: "json"
  }
});