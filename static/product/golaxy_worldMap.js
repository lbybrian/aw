golaxy_worldMap({
  "className": 'AmCharts',
  "task": {
    "option": {

    },
    "data": [],
    "promise": {
      "beforeRender": function (container, data, task) {
        task.max = 0;
        var tData = task.data;
        if(typeof(task.dataFilter) === "function") {
          tData = task.dataFilter(task.data);
        }
        task.data = [];
        for (var k in tData) {
          var item = {
            id: k,
            value: tData[k]
          }
          task.data.push(item);
          if (tData[k] > task.max) {
            task.max = tData[k];
          }
        }
        task.gap = Math.floor(task.max / 10);
      },
      "afterRender": function (container, data, task) {
        // $(container).find("g[aria-labelledby=id-72-title]").remove();
        // task.chart.addListener("clickGraphItem", task.handleClick);
      }
    },
    "url": '',
    "requestType": 'get',
    "dataType": 'json'
  }
});