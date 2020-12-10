signInCard({
  "cardName": 'transwebSignIn',
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
      "name": 'name',
      "items": [{
        "type": 'text',
        "width": '100%',
        "value": '输入用户名'
      }],
      "checkItems": [{
        "rule": function (v) {
          if (!v) {
            return false;
          } else {
            return true;
          }
        },
        "message": '用户名不可为空。'
      }]
    }, {
      "name": 'password',
      "items": [{
        "type": 'password',
        "width": '100%',
        "value": '输入密码'
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
    }],
    "template": '<div class="userInfoInputArea" style="width: 100%; height: auto; position: relative; margin-top: 30px; float: left;"></div>\
                        <div class="checkInfoArea" style="width: 100%; postion: relative; float: left;">\
                          <p style="margin-top: 15px;"><button class="btn btn-primary confirmBtn" style="width: 100%; height: 35px">登录</button></p>                  </div></form>',
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
          task.submitLogin();
        });

        $(container).attr("onkeydown", "if(event.keyCode === 13) { console.log(event.keyCode); webCpu.cards.transwebSignIn.task.submitLogin(); }");

      }
    },
    "submitLogin": function () {
      var _self = this;
      var v = webCpu.FormItem.getValue(this.iTask);
      var r = webCpu.FormItem.checkValue(this.iTask);
      if (r.result) {
        var name = v[0].value;
        var password = v[1].value;
        this.login(name, MurmurHash.rule(password), function (d) {
          console.log(d);
          if(typeof(_self.loginCallback) === "function") {
            _self.loginCallback(d, name);
          }
        });
      } else {
        //showMessage(r.message);
      }
    },
    "login": function (name, password, callback) {
      var query = webCpu.interface.login.query;
      query.query = {
        name: name,
        password: password
      }
      webCpu.adapter.login(query, function(d){
        if(typeof(callback) === "function") {
          callback(d);
        }
      });
    }
  },
  "className": 'TemplateItem'
});