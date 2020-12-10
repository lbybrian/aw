test({
  "className": 'BaiduChartItem',
  "task": {
    "style": {
      "padding": '15px',
    },
    "option": {
      maxItems: 10,
      animation: false,
      selectedMode: "single",
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: function (param, t) {
          param = param[0] || param;
          var str1 = "<label>选项:<span style='margin-left: 5px'>" + param.name + "</span></label>";
          var str2 = "<label>数值:<span  style='margin-left: 5px'>" + param.value + "</span></label><br/>";
          return str2 + str1;
        }
      },
      grid: {
        top: "25px",
        left: '4%',
        right: '2%',
        bottom: '10px',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#999"
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ["#333"]
          }
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#999"
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#333"]
          }
        },
        minInterval: 1
      },
      series: [{
        name: '特征',
        type: 'bar',
        barWidth: '25px',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            barBorderRadius: [550, 550, 0, 0],
            color: '#83bff6'
          }
        },
        data: [],
      }]
    },
    "data": [{
      name: "Mon",
      value: "10"
    }, {
      name: "Tue",
      value: "20"
    }, {
      name: "Wed",
      value: "5"
    }, {
      name: "Thu",
      value: "60"
    }, {
      name: "Fri",
      value: "30"
    }, {
      name: "Sat",
      value: "80"
    }, {
      name: "Sun",
      value: "10"
    }],
    dataFilter: function (data) {
      return data;
    },
    "promise": {
      "beforeRender": function (container, data, task) {
        if (typeof (task.dataFilter) === "function") {
          task.data = data = task.dataFilter(data);
        }
        task.option.series[0].data = [];
        task.option.xAxis.data = [];
        task.option.filter = task.option.filter || {};
        var key = task.option.filter.key;
        var value = task.option.filter.value;
        data.map(function (item) {
          if ((key && value && item[key] === value) || !key) {
            task.option.series[0].data.push(item.value);
            task.option.xAxis.data.push(item.name);
          }
        });
      },
      "afterRender": function (container, data, task) {

      }
    },
    "url": '',
    "requestType": 'get',
    "dataType": 'json'
  },
  "appUrl": 'product/golaxy_column.js'
});