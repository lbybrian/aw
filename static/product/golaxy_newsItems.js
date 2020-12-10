golaxy_newsItems({
  "className": 'ListGroup',
  "cardName": 'microIndex',
  "task": {
    style: {
      overflow: "auto",
      padding: "10px"
    },
    "option": {
      "style": {
        "border": "solid 1px #222",
        "border-radius": '5px',
        "display": 'inline-block',
        "padding": '5px',
        "color": "#666",
        "font-weight": "normal",
        "width": 'calc( 50% - 20px )',
        "margin-top": "10px",
        "margin-right": "10px",
        "background": "transparent",
        "vertical-align": "top"
      }
    },
    "data": [],
    current: 0,
    scrollSwitch: function (n) {
      this.current = n || this.current;
      this.base = $(this.container).find("li").eq(1).outerHeight();
      this.max = this.data.length - Math.ceil($(this.container).height() / this.base);
      if (this.max < 1) return false;
      if (this.max < this.current) {
        this.current = 0;
      }
      $(this.container).children(".ListGroup").scrollTop(this.base * this.current);
    },
    "promise": {
      "beforeRender": function (container, data, task) {
        if (typeof (task.dataFilter) === "function") {
          task.data = task.dataFilter(data);
          // delete task.dataFilter;
        }
      },
      "afterRender": function (container, data, task) {

      }
    }
  },
  "appUrl": 'product/golaxy_listGroup.js'
});