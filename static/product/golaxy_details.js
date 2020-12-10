golaxy_details({
  "className": 'InfoTable',
  "title": "voter details",
  "titleHeight": 37,
  "titleStyle": {
    "padding-left": "10px",
    "background-color": "#f2f2f2",
    "color": "rgb(2,82,149)",
    "box-shadow": "0px -1px 0px inset rgba(51, 122, 183)"
  },
  "task": {
    "style": {
      "overflow": "auto"
    },
    "option": {
      "template": {
        "image": "<img width='100%' src='{{value}}'>"
      },
      "attributeMap": {

      }
    },
    "header": [],
    "data": {

    },
    "promise": {
      "beforeRender": function (container, data, task) {
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
    "url": '',
    "requestType": 'get',
    "dataType": 'json'
  }
});