transweb_cn({
  titleData: {
    title: "邮箱数据分析",
    menu: [{
      name: "账号查询",
      path: "index"
    }, {
      name: "密码映射",
      path: "passwordTool"
    }],
    style: {
      background: "rgba(34, 34, 189, 0.3)",
      "font-size": "28px"
    },
    titleHeight: 80
  },
  routerOption: {
    "index": {
      "url": "layout/main.js",
      "breadcrumb": ["主页",  "账号查询"],
      "children": {
        "mainAreaItem": {
          "url": "demo/awAnalysis/card/emailTool.js",
          "key": "emailTool",
          "interface": "emailTool"
        }
      },
      "callback": function (c, d, t) {
        console.log(d);
      }
    },
    "passwordTool": {
      "url": "layout/main.js",
      "breadcrumb": ["主页",  "密码映射"],
      "children": {
        "mainAreaItem": {
          "url": "demo/awAnalysis/card/passwordTool.js",
          "key": "passwordTool",
          "interface": "passwordTool"
        }
      },
      "callback": function (c, d, t) {
        console.log(d);
      }
    },
    "identity": {
      "url": "layout/main.js",
      "breadcrumb": ["主页", "虚拟身份"],
      "children": {
        "mainAreaItem": {
          "url": "demo/awAnalysis/card/manageDataTable.js",
          "key": "manageDataTable",
          "interface": "identityList",
          "callback": function (c, d, t) {
            d.style = {
              padding: "0px 20px"
            }
            d.title = "<div style='width: 100%;'><button style='float: left;' class='btn btn-primary btn-sm addRecordBtn'>新增</button></div>"
            d.task.option.attributeMap = {
              "domin": {
                "name": "域名",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "uid": {
                "name": "账号",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "password": {
                "name": "密码明文",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "operator": {
                name: "操作",
                render: function (v, d) {
                  var str = "<button query='" + d._id + "' title='删除' class='btn btn-default btn-sm removeBtn'>删除</button>";
                  return str;
                }
              }
            };

            d.task.initAddUserEvent = function () {
              var _self = this;
              $(this.titleArea).find(".addRecordBtn").off("click");
              $(this.titleArea).find(".addRecordBtn").on("click", function () {
                _self.editDialog("添加记录", null, function (d, i) {
                  _self.data.unshift(d);
                  var query = webCpu.interface.addIdentity.query;
                  query.row = d;
                  webCpu.adapter.addIdentity(query, function (ret) {
                    webCpu.DataTable.render(_self);
                  })
                });
              });
            };
            d.task.removeUserEvent = function () {
              var _self = this;
              $(_self.container).find(".removeBtn").off("click");
              $(_self.container).find(".removeBtn").on("click", function () {
                webCpu.CardItem.showTips(_self, "确认删除吗？", function () {
                  var index = $(this).attr("index");
                  var tData = _self.data.splice(index, 1)[0];
                  var query = webCpu.interface.removeIdentity.query;
                  if (tData) {
                    query.query = {
                      _id: tData["_id"]
                    };
                  }
                  webCpu.adapter.removeIdentity(query, function (ret) {
                    webCpu.DataTable.render(_self);
                  })
                }, {
                  confirm: "确认",
                  default: "取消",
                  tipsTitle: "提示"
                });
              });
            }

            d.task.promise.afterRender = function (c1, d1, t1) {
              t1.initAddUserEvent();
              t1.removeUserEvent();
            }

          }
        }
      },
      "callback": function (c, d, t) {

      },

    },
    "userManage": {
      "url": "layout/leftAndMain.js",
      "breadcrumb": ["主页", "系统管理", "用户管理"],
      "children": {
        "leftAreaItem": {
          "url": "demo/awAnalysis/card/manageMenu.js",
          "key": "manageMenu",
          "callback": function (c, d, t) {
            d.task.clickCallback = function (data) {
              if (data.title === "角色管理") {
                location.href = "roleManage";
              } else if (data.title === "日志管理") {
                location.href = "logsManage";
              } else {
                location.href = "userManage";
              }
            }
          }
        },
        "centerAreaItem": {
          "url": "demo/awAnalysis/card/manageDataTable.js",
          "key": "manageDataTable",
          "interface": "users",
          "callback": function (c, d, t) {
            d.style = {
              padding: "0px 20px"
            }
            d.task.roles = this.roles;
            d.task.option._page = d.task.option.page;
            d.task.option.page = null;
            d.title = "<div style='width: 100%; text-align: left;'>用户管理<button style='float: right;'  class='btn btn-primary btn-sm addRecordBtn'>新增</button></div>"

            var roleNames = [];
            for (var i = 0; i < this.roles.length; i++) {
              var item = {
                value: this.roles[i].name,
                name: this.roles[i].name
              }
              roleNames.push(item);
            }

            d.task.option.attributeMap = {
              "name": {
                "name": "用户名称",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "role": {
                "name": "用户角色",
                "editor": {
                  "type": 'select',
                  "width": '120px',
                  "options": roleNames,
                  "value": ''
                }
              },
              "uid": {
                "name": "操作",
                "render": function (v, data) {
                  var str = "<button objectId='" + v + "' style='margin-right: 10px;'  title='删除' class='btn btn-default btn-sm removeBtn'>删除</button><button title='重置密码' style='margin-right: 10px;' class='btn btn-default btn-sm resetBtn'>重置密码</button><button title='查看' class='btn btn-default btn-sm viewBtn'>查看</button>"
                  return str;
                }
              }
            };

            d.task.initAddUserEvent = function () {
              var _self = this;
              $(this.titleArea).find(".addRecordBtn").off("click");
              $(this.titleArea).find(".addRecordBtn").on("click", function () {
                _self.editDialog("添加记录", null, function (d, i) {
                  var query = webCpu.interface.addUser.query;
                  query.row = d;
                  query.row.password = MurmurHash.rule("123456");
                  webCpu.adapter.addUser(query, function (ret) {
                    webCpu.DataTable.render(_self);
                  });
                });
              });
            };
            d.task.removeUserEvent = function () {
              var _self = this;
              $(_self.container).find(".removeBtn").off("click");
              $(_self.container).find(".removeBtn").on("click", function () {
                webCpu.CardItem.showTips(_self, "确认删除吗？", function () {
                  var index = $(this).parent().parent().parent().attr("index");
                  var tData = _self.data.splice(index, 1)[0];
                  var query = webCpu.interface.removeUser.query;
                  if (tData) {
                    query.query = {
                      _id: tData["_id"]
                    };
                  }

                  webCpu.adapter.removeUser(query, function (ret) {
                    webCpu.DataTable.render(_self);
                  })

                }, {
                  confirm: "确认",
                  default: "取消",
                  tipsTitle: "提示"
                });
              });
            }

            d.task.resetPassEvent = function () {
              var _self = this;
              $(_self.container).find(".resetBtn").off("click");
              $(_self.container).find(".resetBtn").on("click", function () {
                var _this = this;
                webCpu.CardItem.showTips(_self, "确认重置吗？", function () {
                  var index = $(_this).parent().parent().parent().attr("index");
                  var tData = _self.data[index];
                  var query = webCpu.interface.addUser.query;
                  query.row = tData;
                  query.row.password = MurmurHash.rule("123456");
                  webCpu.adapter.addUser(query, function (ret) {
                    webCpu.DataTable.render(_self);
                  });
                }, {
                  confirm: "确认",
                  default: "取消",
                  tipsTitle: "提示"
                });
              });
            }
            d.task.promise.afterRender = function (c1, d1, t1) {
              t1.initAddUserEvent();
              t1.removeUserEvent();
              t1.resetPassEvent();
            }

          }
        }
      },
      interface: "roles",
      callback: function (c, d, t) {
        var _self = this;
        d.task.promise.afterRender = function (cc, dd, tt) {
          _self.children.centerAreaItem.roles = dd.data;
        }
      }
    },
    "roleManage": {
      "url": "layout/leftAndMain.js",
      "breadcrumb": ["主页", "系统管理", "角色管理"],
      "children": {
        "leftAreaItem": {
          "url": "demo/awAnalysis/card/manageMenu.js",
          "key": "manageMenu",
          "callback": function (c, d, t) {
            d.task.clickCallback = function (data) {
              if (data.title === "角色管理") {
                location.href = "roleManage";
              } else if (data.title === "日志管理") {
                location.href = "logsManage";
              } else {
                location.href = "userManage";
              }
            }
          }
        },
        "centerAreaItem": {
          "url": "demo/awAnalysis/card/manageDataTable.js",
          "key": "manageDataTable",
          "interface": "roles",
          "callback": function (c, d, t) {
            d.style = {
              padding: "0px 20px"
            }
            d.task.option._page = d.task.option.page;
            d.task.option.page = null;
            d.title = "<div style='width: 100%; text-align: left;'>角色管理<button style='float: right;'  class='btn btn-primary btn-sm addRecordBtn'>新增</button></div>"
            d.task.option.attributeMap = {
              "name": {
                name: "角色名称"
              },
              "dRight": {
                name: "数据权限",
                "editor": [{
                  "value": "服务交易",
                  "type": 'checkbox',
                  "tips": '服务交易'
                }, {
                  "value": "数据交易",
                  "type": 'checkbox',
                  "tips": '数据交易'
                }]
              },
              "fRight": {
                name: "功能权限",
                "editor": [{
                  "value": "综合检索",
                  "type": 'checkbox',
                  "tips": '综合检索'
                }, {
                  "value": "数据监控",
                  "type": 'checkbox',
                  "tips": '数据监控'
                }, {
                  "value": "密码工具",
                  "type": 'checkbox',
                  "tips": '密码工具'
                }]
              },
              "id": {
                name: "操作",
                render: function (v, data) {
                  var str = "<button style='margin-right: 10px;' class='btn btn-default btn-sm removeBtn'>删除</button><button style='margin-right: 10px;' class='btn btn-default btn-sm configBtn'>配置权限</button>";
                  return str;
                }
              }
            };

            d.task.initAddRoleEvent = function () {
              var _self = this;
              $(this.titleArea).find(".addRecordBtn").off("click");
              $(this.titleArea).find(".addRecordBtn").on("click", function () {
                _self.editDialog("添加角色", null, function (d, i) {
                  var query = webCpu.interface.addRole.query;
                  query.row = d;
                  webCpu.adapter.addRole(query, function (ret) {
                    webCpu.DataTable.render(_self);
                  })
                });
              });
            };
            d.task.removeRoleEvent = function () {
              var _self = this;
              $(_self.container).find(".removeBtn").off("click");
              $(_self.container).find(".removeBtn").on("click", function () {
                webCpu.CardItem.showTips(_self, "确认删除吗？", function () {
                  var index = $(this).parent().parent().parent().attr("index");
                  var tData = _self.data.splice(index, 1)[0];
                  var query = webCpu.interface.removeRole.query;
                  if (tData) {
                    query.query = {
                      _id: tData["_id"]
                    };
                  }

                  webCpu.adapter.removeRole(query, function (ret) {
                    webCpu.DataTable.render(_self);
                  })
                }, {
                  confirm: "确认",
                  default: "取消",
                  tipsTitle: "提示"
                });
              });
            }
            d.task.updateRightsEvent = function () {
              //updateRights
              var _self = this;
              $(this.container).find(".configBtn").off("click");
              $(this.container).find(".configBtn").on("click", function () {
                var index = $(this).parent().parent().parent().attr("index");
                var tData = _self.data[index];
                _self.editDialog("修改角色权限", tData, function (d, i) {
                  d._id = tData._id;
                  var query = webCpu.interface.addRole.query;
                  query.row = d;
                  webCpu.adapter.addRole(query, function (ret) {
                    webCpu.DataTable.render(_self);
                  })
                });
              });
            }

            d.task.promise.afterRender = function (c1, d1, t1) {
              t1.initAddRoleEvent();
              t1.removeRoleEvent();
              t1.updateRightsEvent();
            }

          }
        }
      }
    },
    "logsManage": {
      "url": "layout/leftAndMain.js",
      "breadcrumb": ["主页", "系统管理", "日志管理"],
      "children": {
        "leftAreaItem": {
          "url": "demo/awAnalysis/card/manageMenu.js",
          "key": "manageMenu",
          "callback": function (c, d, t) {
            d.task.clickCallback = function (data) {
              if (data.title === "角色管理") {
                location.href = "roleManage";
              } else if (data.title === "日志管理") {
                location.href = "logsManage";
              } else {
                location.href = "userManage";
              }
            }
          }
        },
        "centerAreaItem": {
          "url": "demo/awAnalysis/card/manageDataTable.js",
          "key": "manageDataTable",
          "interface": "logs",
          "callback": function (c, d, t) {
            d.style = {
              padding: "0px 20px"
            }
            d.foot = "-";
            d.task.option.page = {
                "total": 1,
                "size": 10,
                "current": 1
              },
              d.title = "<div style='width: 100%; text-align: left;'>日志管理<button style='float: right;'  class='btn btn-primary btn-sm exportBtn'>导出</button></div>"
            d.task.option.attributeMap = {
              "user": "操作人",
              "name": "操作名称",
              "content": "操作内容",
              "time": "操作时间"
            };

            d.task.initExportEvent = function () {
              var _self = this;
              $(this.titleArea).find(".exportBtn").off("click");
              $(this.titleArea).find(".exportBtn").on("click", function () {
                //导出
              });
            };

            d.task.promise.afterRender = function (c1, d1, t1) {
              t1.initExportEvent();
            }

          }
        }
      }
    }
  }

});