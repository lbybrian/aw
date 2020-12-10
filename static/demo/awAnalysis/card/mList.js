transweb_mList({
  "className": 'ListGroup',
  "cardName": "transwebMlist",
  "style": {
    
  },
  "task": {
    style: {
      "padding": "10px",
      "border": "solid 1px #fff", 
      "border-radius": "5px",
      "background-color": "#f2f2f2",
      "overflow": "auto"
    },
    "option": {
      "style": {
        "display": "inline-block",
        "vertical-align": "top",
        "width": "400px",
        "line-height": "40px",
        "position": "relative",
        "border": "solid 1px #f2f2f2",
        "border-radius": "5px",
        "background": "#fff",
        "cursor": "pointer",
        "text-align": "center",
        "box-shadow": "0px 1px 0px #ddd",
        "margin-right": "5px",
        "margin-bottom": "5px",
        "overflow": "hidden"
      },
      "template": "<div title='{{name}}' style='text-align: left; position: relative; width: 100%; height: 100%; font-weight: 900; line-height: 30px; text-overflow:ellipsis; white-space: nowrap; overflow: hidden;'>{{label}}({{key}})</div>\
                  <div style='text-align: left; position: relative; width: 100%; line-height: 20px;' title='{{keyword}}'>关键词: {{keyword}}</div>",
    },
    data: [],
    removeCallback: function(d) {

    },
    promise: {
      beforeRender: function (container, data, task) {
        if (typeof (task.dataFilter) === "function") {
          task.data = data = task.dataFilter(data);
        }
        var w = $(container).width() - 15;
        var count = Math.floor(w / 400);
        var wholeGap = w % 100;
        var gap = wholeGap / (count - 1);
        if (gap < 2) {
          gap = (wholeGap + 400) / (count - 1);
          count -= 1;
        }
        task.count = count;
        task.option.style["margin-right"] = gap + "px";
      },
      afterRender: function (container, data, task) {
        $(container).find(".list-group>.list-group-item:nth-child(" + task.count + "n)").css({
          "margin-right": "0px"
        });

        $(container).find(".list-group-item").on("click", function () {
          let index = $(this).attr("index");
          let key = $(this).children().attr("url");
          //webCpu.startReadBook(key, data[index]);
          if (typeof (task.promise.clickCallback) === "function") {
            var tData = data[index];
            task.promise.clickCallback(tData);
            // $(container).find(".list-group-item").attr("state", "");
            // $(this).attr("state", "selected");
            // $(container).find(".list-group-item").css({
            //   "outline": "solid 0px #333"
            // })
            // $(this).css({
            //   "outline": "solid 1px #333"
            // })
            
          }
        });
        var btnSelector = $("<button style='position: absolute; right: 0px; top: 5px;' type='button' class='btn btn-link btn-sm removeBtn'><i class='glyphicon glyphicon-remove-circle'></i></button>")
        $(container).find(".list-group-item").append(btnSelector);

        $(container).find(".list-group-item .removeBtn").on("click", function(e) {
          var index = $(this).parent().attr("index");
          var d = data[index];
          if(typeof(task.removeCallback) === "function") {
            task.removeCallback(d);
          }
          e.preventDefault();
          return false;
        });

      }
    },
    url: "",
    requestType: "get",
    dataType: "json"
  }
});