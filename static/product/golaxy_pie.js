test1({
  "className": 'BaiduChartItem',
  "task": {
    "style": {
      "padding": '5px'
    },
    "option": {
      animation: false,
      tooltip: {
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color: ["#A5CEE2", "#54B0F1", "#D9797D", "#8D99B3", "#E5D100", "#95B64B", "#9675CE", "#1FBFE3", "#0883D1",
        "#D27110", "#557198", "#1DC6C9"
      ],
      selectedMode: "single",
      grid: {
        top: "25px",
        containLabel: true
      },
      legend: {
        show: false,
        orient: 'vertical',
        selectedMode: false,
        top: "middle",
        left: '5px',
        textStyle: {
          color: '#aaa'
        },
        icon: "pin",
        data: []
      },
      series: [{
        name: '账号密码',
        type: 'pie',
        center: ['50%', '65%'],
        radius: '50%',
        // stillShowZeroSum: false,
        data: [],
        label: {
          formatter: '{b}'
        },
        z: 100
      }, {
        type: 'pie',
        center: ['50%', '65%'],
        radius: ['55%', '55.5%'],
        label: {
          show: false
        },
        itemStyle: {
          color: '#999'
        },
        data: [{
          name: 1,
          value: 1
        }]
      }]
    },
    "data": [{
      "value": 122222535,
      "name": '密码有效'
    }, {
      "value": 51000000,
      "name": '密码无效'
    }, {
      "value": 63000004,
      "name": '无密码'
    }],
    dataFilter: function(data) {
      return data;
    },
    "promise": {
      "beforeRender": function (container, data, task) {
        if(typeof(task.dataFilter) === "function") {
          task.data = data = task.dataFilter(data);
        } 
        task.option.legend.data = [];
        for (var i = 0; i < data.length; i++) {
          task.option.legend.data.push(data[i].name);
        }
        task.option.series[0].data = data;
      },
      "afterRender": function (container, data, task) {

      }
    },
    "url": '',
    "requestType": 'get',
    "dataType": 'json'
  },
  "appUrl": 'product/golaxy_pie.js'
});