configParams({
  style: {
    "padding": "15px 30px",
    "width": "100%",
    "height": "100%",
    "text-align": "center"
  },
  task: {
    style: {
      "padding": "15px 30px",
      "width": "500px",
      "height": "400px",
      "display": "inline-block"
    },
    template: '<div class="input-group" style="margin-right: 10px; margin-bottom: 20px;">\
                  <span class="input-group-addon" id="basic-addon1">节点存活阈值(天)</span>\
                  <input type="number" min=1 value="{{node_live_days}}" class="form-control nodeConfigInput"  aria-describedby="basic-addon1">\
                </div><div class="input-group" style="margin-right: 10px;">\
                <span class="input-group-addon" id="basic-addon1">网站存活阈值(天)</span>\
                <input type="number" min=1 value="{{web_live_days}}" class="form-control siteConfigInput"  aria-describedby="basic-addon1">\
              </div><div style="text-align: center; margin-top: 20px;"><button type="button" class="btn btn-default btn-sm resetParams">重置</button>\
                    <button style="margin-left: 20px;" type="button" class="btn btn-primary btn-sm confirmParams">确认</button></div>',
    data: '# 测试',
    promise: {
      beforeRender: function (container, data, task) {
        if(task.dataFilter) {
          task.data = data = task.dataFilter(data);
        }
      },
      afterRender: function (container, data, task) {
        $(container).find(".nodeConfigInput").on("change", function(){
          data["node_live_days"] = $(this).val();
        });
        $(container).find(".siteConfigInput").on("change", function(){
          data["web_live_days"] = $(this).val();
        });
        $(container).find(".confirmParams").on("click", function(){
          var query = webCpu.interface.updateConfig.query;
          query.query = {
            _id: data._id
          };
          query.set = {
            node_live_days: data.node_live_days,
            web_live_days: data.web_live_days
          }
          webCpu.CardItem.confirmRequest(webCpu.adapter.updateConfig, query, webCpu.cards.centerAreaItem, "确定要保存吗？", function (ret) {
            console.log(ret);
            webCpu.CardItem.fresh(webCpu.cards.centerAreaItem);
          });
        })
        $(container).find(".resetParams").on("click", function(){
          var query = webCpu.interface.updateConfig.query;
          query.query = {
            _id: data._id
          };
          query.set = {
            node_live_days: 10,
            web_live_days: 10
          }
          if(task.tData && task.tData.data && task.tData.data[0]) {
            query.set = {
              node_live_days: task.tData.data[1].node_live_days,
              web_live_days: task.tData.data[1].web_live_days
            }
          }
         
          webCpu.CardItem.confirmRequest(webCpu.adapter.updateConfig, query, webCpu.cards.centerAreaItem, "确定要保存吗？", function (ret) {
            console.log(ret);
            webCpu.CardItem.fresh(webCpu.cards.centerAreaItem);
          });
        })
      }
    },
    // url: "articles/introduce.txt",
    requestType: "get",
    dataType: "text"
  }
})