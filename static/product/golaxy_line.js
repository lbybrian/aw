golaxy_line({
  "className": 'BaiduChartItem',
  "task": {
    "style": {
      "padding": '5px'
    },
    "option": {
      animation: false,
      legend: {
        show: true,
        data: []
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        min: 'dataMin',
        max: 'dataMax',
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#ddd"
        }
      },
      yAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#ddd"
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#333"]
          }
        }
      },
      grid: {
        top: '40px',
        left: '80px',
        right: '20px',
        bottom: '40px'
      },
      series: [{
        type: 'line',
        smooth: true,
        smoothMonotone: "x",
        symbol: 'circle',
        symbolSize: 5,
        name: "趋势",
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {

            borderWidth: 12
          }
        },
        data: []
      }]
    },
    data: {
      name: ["示例1", "示例2"],
      data: [{
        name: "Mon",
        value: [720, 250]
      }, {
        name: "Tue",
        value: [320, 2250]
      }, {
        name: "Wed",
        value: [620, 1000]
      }, {
        name: "Thu",
        value: [520, 650]
      }, {
        name: "Fri",
        value: [120, 550]
      }, {
        name: "Sat",
        value: [380, 650]
      }, {
        name: "Sun",
        value: [220, 450]
      }]
    },
    "promise": {
      "beforeRender": function (container, data, task) {
        if(typeof(task.dataFilter) === "function") {
          task.data = data = task.dataFilter(data);
        }
        
        task.option.series.length = 1;
        task.option.series[0].data = [];
        task.option.xAxis.data = [];
        var name = data.name;
        if (typeof (name) === "string") {
          data.data = data.data.map(function (item) {
            task.option.series[0].data.push(item.value);
            task.option.xAxis.data.push(item.name);
            return item;
          });
        } else {
          
          task.option.series[0].name = name[0];
          for (var i = 1; i < name.length; i++) {
            var tItem = WebTool.copyObject(task.option.series[0])
            tItem.name = name[i];
            task.option.series.push(tItem);
          }
          if(data.legendStyle) {
            task.option.legend = WebTool.copyObject(data.legendStyle);
            task.option.legend.data = [];
          }
          task.option.legend.data = name.map(item => {
            var tItem = {
              name: item
            };
            return tItem;
          });
          task.option.legend.show = true;
          data.data = data.data.map(function (item) {
            if (typeof (item.value) === "number") {
              item.value = [item.value];
            }
            for (var j = 0; j < name.length; j++) {
              task.option.series[j].data.push(item.value[j] || 0);
            }
            task.option.xAxis.data.push(item.name);
            return item;
          });
          console.log(task.option)
        }

      },
      "afterRender": function (container, data, task) {

      }
    },
    "query": {

    },
    "requestType": 'get',
    "dataType": 'json'
  }
});