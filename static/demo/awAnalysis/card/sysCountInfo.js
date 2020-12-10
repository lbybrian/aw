sysCountInfo({
  style: {
    "padding": "5px 20px",
    "width": "100%",
    "height": "100%",
    "text-align": "center"
  },
  task: {
    style: {
      "padding": "5px 30px",
      "width": "500px",
      "height": "400px",
      "display": "inline-block"
    },
    template: '<div class="input-group" style="margin-right: 10px; margin-bottom: 20px;">\
                  <span class="input-group-addon" id="basic-addon1">节点总数(个)</span>\
                  <label class="form-control"  aria-describedby="basic-addon1">{{节点总数}}</label>\
                </div><div class="input-group" style="margin-right: 10px; margin-bottom: 20px;">\
                <span class="input-group-addon" id="basic-addon1">网站总数(个)</span>\
                <label class="form-control"  aria-describedby="basic-addon1">{{网站总数}}</label>\
              </div><div class="input-group" style="margin-right: 10px;  margin-bottom: 20px;">\
                <span class="input-group-addon" id="basic-addon1">网页总数(个)</span>\
                <label class="form-control"  aria-describedby="basic-addon1">{{网页总数}}</label>\
              </div><div class="input-group" style="margin-right: 10px;  margin-bottom: 20px;">\
              <span class="input-group-addon" id="basic-addon1">专题总数(个)</span>\
              <label class="form-control"  aria-describedby="basic-addon1">{{专题总数}}</label>\
            </div><div class="input-group" style="margin-right: 10px;  margin-bottom: 20px;">\
            <span class="input-group-addon" id="basic-addon1">邮箱总数(个)</span>\
            <label class="form-control"  aria-describedby="basic-addon1">{{邮箱总数}}</label>\
          </div><div class="input-group" style="margin-right: 10px;  margin-bottom: 20px;">\
          <span class="input-group-addon" id="basic-addon1">密码总数(个)</span>\
          <label class="form-control"  aria-describedby="basic-addon1">{{密码总数}}</label>\
        </div>',
    data: {
      "节点总数": 20000,
      "网站总数": 20000,
      "网页总数": 20000,
      "专题总数": 20000,
      "邮箱总数": 20000,
      "密码总数": 20000,
    },
    promise: {
      beforeRender: function (container, data, task) {
        if(task.dataFilter) {
          task.data = data = task.dataFilter(data);
        }
      },
      afterRender: function (container, data, task) {
        
      }
    },
    // url: "articles/introduce.txt",
    requestType: "get",
    dataType: "text"
  }
})