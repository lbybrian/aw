transweb_cn({
  task: {
    app: {
      
    },
    template: '<div style="width: 100%; height: calc( 100% - 200px ); box-shadow: 0px -1px 0px inset #ddd; position: relative;">\
                        <div style="padding-left:220px; padding-right: 320px; width: 100%; height: 100%; position: relative;">\
                            <div  class="conterArea" style="width: 100%; height: 100%; position: relative; text-align: center;"></div>\
                        </div>\
                        <div class="leftArea" style="width: 200px; height:100%; position: absolute; overflow: auto; top: 0px;"></div>\
                        <div class="rightArea" style="width: 300px; height:100%; position: absolute; overflow: auto; right: 0px; top: 0px;"></div>\
                    </div><div style="width: 100%; height: 200px; position: relative; float: left;"><div class="chartItem" style="width: 33.33%; height: 100%; float: left;"></div><div class="chartItem" style="width: 33.33%; height: 100%; float: left;"></div><div class="chartItem" style="width: 33.33%; height: 100%; float: left;"></div></div>',
    promise: {
      beforeRender: function (container, data, task) {

      },
      afterRender: function (container, data, task) {
        task.listContainer = $(container).find(".listTableArea")[0];
        task.infoContainer = $(container).find(".infoTableArea")[0];
        task.chartItems = $(container).find(".chartItem");
        webCpu.updateView(task.listContainer, task.app.listTable);
        // webCpu.updateView(task.infoContainer, task.app.infoTable);

      }
    }

  }
});