modifyPassCard({
  "cardName": 'transwebMobile',
  "style": {
    "max-width": 400,
    "max-height": 350,
    "margin": "auto"
  },
  "padding": '5px',
  "titleData": {
    "title": "暗网数据分析",
    "style": {
      "font-size": "28px"
    },
    "titleHeight": 80
  },
  "task": {
    "loginUrl": '/login',
    "style": {
      "max-width": 400,
      "max-height": 350,
      "margin": "auto"
    },
    "inputData": [{
      "name": 'password1',
      "items": [{
        "type": 'password',
        "width": '100%',
        "value": '输入新密码'
      }],
      "checkItems": [{
        "rule": function (v) {
          if (!v) {
            return false;
          } else {
            return true;
          }
        },
        "message": '密码不可为空。'
      }]
    }, {
      "name": 'password2',
      "items": [{
        "type": 'password',
        "width": '100%',
        "value": '确认新密码'
      }],
      "checkItems": [{
        "rule": function (v) {
          if (!v) {
            return false;
          } else {
            return true;
          }
        },
        "message": '密码不可为空。'
      }, {
        "rule": function (v) {
          var t = webCpu.FormItem.getValue(webCpu.cards.transwebMobile.task.iTask);
          if (v !== t[0].value) {
            return false;
          } else {
            return true;
          }
        },
        "message": '两次输入的密码不一致。'
      }]
    }],
    "template": '<div class="userInfoInputArea" style="width: 100%; height: auto; position: relative; margin-top: 30px; float: left;"></div>\
                        <div class="checkInfoArea" style="width: 100%; postion: relative; float: left;">\
                          <p style="margin-top: 15px;"><button class="btn btn-primary confirmBtn" style="width: 100%; height: 35px">确认修改</button></p>                  </div></form>',
    "promise": {
      "beforeRender": function (container, data, task) {
        var w = Math.min($(container).width(), task.style["max-width"]);
        for (var i = 0; i < task.inputData.length; i++) {
          task.inputData[i].items[0].width = w + "px";
        }
      },
      "afterRender": function (container, data, task) {
        task.iTask = {
          style: {
            width: "100%"
          },
          container: $(container).find(".userInfoInputArea")[0],
          data: WebTool.copyObject(task.inputData),
          taskType: "multi",
          promise: {
            afterRender: function (c, d, t) {
              $(c).css("padding-right", "0px");
              $(c).find(".FormItem_inputItem").css("padding-right", "0px");
              $(c).find(".FormItem_inputItem input").eq(0).focus();
            }
          }
        };
        webCpu.render("FormItem", task.iTask);
        $(container).find(".confirmBtn").on("click", function () {
          task.submitMobify();
        });

        $(container).attr("onkeydown", "if(event.keyCode === 13) { console.log(event.keyCode); webCpu.cards.transwebMobile.task.submitMobify(); }");

      }
    },
    "submitMobify": function () {
      var _self = this;
      var v = webCpu.FormItem.getValue(this.iTask);
      var r = webCpu.FormItem.checkValue(this.iTask);
      if (r.result) {
        var password = v[1].value;
        this.modify(MurmurHash.rule(password), function (d) {
          if (typeof (_self.callback) === "function") {
            _self.callback(d, name);
          }
        });
      } else {
        //showMessage(r.message);
      }
    },
    "modify": function (password, callback) {
      var query = webCpu.interface.modifyPass.query;
      query.set = {
        password: password
      };
      query.query = {
        _id: logined._id
      };
      webCpu.adapter.modifyPass(query, function (d) {
        if (typeof (callback) === "function") {
          callback(d);
        }
      });
    }
  },
  "className": 'TemplateItem'
});