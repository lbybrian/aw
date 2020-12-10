manageItems({
    "className": 'ListMenu',
    task: {
        data: [],
        option: {
            style: {
                "border": "none",
                "border-radius": 0,
                "background-color": "transparent"
            }
        },
        open: [0, 1, 2],
        clickCallback: function (e, d) {

        },
        prefix: "product/",
        updateAction: function (d) {
            var _self = this;
            var action = function (e, tData) {
                if (typeof (_self.clickCallback) === "function") {
                    _self.clickCallback(d, e);
                   
                }
            };
            if (d && d.constructor.name === "Array") {
                for (var i = 0; i < d.length; i++) {
                    this.updateAction(d[i]);
                }
            } else {
                d.action = function (e) {
                    action(e, d);
                }
            }
            if (d.content) {
                this.updateAction(d.content);
            }
        },
        dataFilter: function(d) {
          return d;
        },
        promise: {
            beforeRender: function (container, data, task) {
                if(typeof(task.dataFilter) === "function") {
                    task.data = task.dataFilter(data);
                    delete task.dataFilter;
                }
                task.updateAction(task.data);
            }
        },
        requestType: "get",
        dataType: "json"
    }
});