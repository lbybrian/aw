transweb_cn({
  titleData: {
    title: "暗网数据分析",
    menu: [{
        name: "暗网态势",
        path: "index"
      }, {
        name: "综合检索",
        path: "search"
      }, {
        name: "暗网节点",
        path: "awNode"
      }, {
        name: "站点导航",
        path: "navigation"
      }, {
        name: "数据监控",
        path: "dataTopic"
      },
      {
        name: "邮箱查询",
        path: "emailTool"
      },
      {
        name: "密码映射",
        path: "passwordTool"
      },
      {
        name: "系统配置",
        children: [{
          name: "站点类型配置",
          path: "siteTypeManage"
        }, {
          name: "网页类型配置",
          path: "pageTypeManage"
        }, {
          name: "其他参数配置",
          path: "paramsManage"
        }]
      },
      {
        name: "系统管理",
        children: [{
          name: "用户管理",
          path: "userManage"
        }, {
          name: "角色管理",
          path: "roleManage"
        }, {
          name: "日志管理",
          path: "logsManage"
        }, {
          name: "统计信息",
          path: "sysCountInfo"
        }]
      }
    ],
    rightMenu: [{
      name: "<span class='glyphicon glyphicon-user loginedName'></span><span style='margin-left: 5px;'>admin</span>",
      children: [{
        name: "修改密码",
        callback: function (d) {
          webCpu.modifyPass();
        }
      }, {
        name: "切换账号",
        callback: function (d) {
          webCpu.loginDialog();
        }
      }, {
        name: "退出登录",
        callback: function (d) {
          WebTool.cookie("logined", "", -1);
          webCpu.loginDialog(null, true);
        }
      }]
    }],
    style: {
      "background": "rgba(34, 34, 189, 0.3)",
      "font-size": "20px"
    },
    titleHeight: 80
  },
  routerOption: {
    "index": {
      "url": "layout/main.js",
      "breadcrumb": ["主页", "暗网态势"],
      "children": {
        "mainAreaItem": {
          "url": "demo/awAnalysis/card/awSituation.js",
          "key": "awSituation"
        }
      }
    },
    "search": {
      "url": "layout/main.js",
      "breadcrumb": ["主页", "综合检索"],
      "children": {
        "mainAreaItem": {
          "url": "demo/awAnalysis/card/comprehensiveSearch.js",
          "key": "comprehensiveSearch"
        }
      }
    },
    "dataTopic": {
      "url": "layout/leftAndMain.js",
      "breadcrumb": ["主页", "数据监控"],
      "children": {
        "leftAreaItem": {
          "url": "demo/awAnalysis/card/awTopicList.js",
          "key": "awTopicList",
          "interface": "topicList",
          "callback": function (c, d, t) {
            var start = moment(new Date());
            var end = moment(new Date());
            d.task.start = start.subtract(7, "days").format('YYYY-MM-DD') + " 00:00:00";
            d.task.end = end.format('YYYY-MM-DD') + " 23:59:59";

            // d.task.start = decodeURIComponent(WebTool.urlQuery(location.href, "start") || task.start);
            // d.task.end = decodeURIComponent(WebTool.urlQuery(location.href, "end") || task.end);
            d.task.query.dsl = JSON.stringify({
              beginTime: d.task.start,
              endTime: d.task.end,
              from: 0,
              size: 1000
            });
            d.task.dataFilter = function (tData) {
              tData = tData || {};
              tData.data = tData.data || {};
              tData.data.topicList = tData.data.topicList || [];
              var tArr = tData.data.topicList.map(function (item) {
                item.title = item.name || "未命名主题";
                item.badge = item.count;
                item.publisher = item.publisher || "";
                return item;
              });
              tArr = tArr.sort((a, b) => {
                return b.badge - a.badge;
              });
              return tArr
            };

          }
        },
        "centerAreaItem": {
          "url": "demo/awAnalysis/card/searchResult.js",
          "key": "searchResult",
          "callback": function (c, d, t) {

            d.titleMenu = [{
              text: '<label style="width: 100%; margin: 0px; padding-left: 10px; text-align: left;"><span class="listType">最近7天专题 </span><span style="margin-left: 10px;" class="badge pageNumber">0</span>'
            }, {
              text: '<div class="input-group input-group-xs"  style="margin-left: 10px; display: inline-block; vertical-align: middle;">\
              <span class="input-group-addon" id="basic-addon1">时间排序</span>\
              <div class="input-group-btn" aria-describedby="basic-addon1">\
                <button type="button" style="width: 100px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data="desc" class="buttonText myInput">默认</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
                <ul class="dropdown-menu">\
                  <li data=""><a >默认</a></li>\
                  <li data="desc"><a >降序</a></li>\
                  <li data="asc"><a >升序</a></li>\
                </ul>\
              </div>\
            </div> \
              <button style="margin-left: 10px;" class="btn btn-default trendBtn" type="button">数据趋势</button></label>'
            }]
          }
        }
      },
      "callback": function (c, d, t) {
        console.log(d);
      }
    },
    "navigation": {
      "url": "layout/leftAndMain.js",
      "breadcrumb": ["主页", "站点导航"],
      "children": {
        "leftAreaItem": {
          "url": "demo/awAnalysis/card/awAddressList.js",
          "key": "awAddressList",
          "interface": "awAddressList",
          "callback": function (c, d, t) {
            d.title = '<input type="text" style="width: 215px;" class="form-control dateRange"  aria-describedby="basic-addon1">\
                        <button value="all" type="button" class="btn btn-default allHistoryBtn">所有</button>\
                        <button style="float: right; margin-left: 10px;" class="btn btn-primary searchBtn" type="button">检索</button>';

//						d.title='<div style="left: 5px; z-index: 9993; display: inline-block; left: 15px; padding: 10px;">\
//						<div style="display: inline-block;"  class="btn-group" role="group">\<button value="1" type="button" class="btn btn-default">今天</button>\
//						<button value="30" type="button" class="btn btn-default">近一月</button>\<button value="all" type="button" class="btn btn-default">所有</button>\
//						</div>\</div>\'
;
            d.task.setDateRange = function (start, end, flag) {
              var _self = this;
              var selector = ".dateRange";
              this.start = start + " 00:00:00";
              this.end = end + " 23:59:59";

              $(this.titleArea).find(selector).daterangepicker({
                  locale: {
                    format: 'YYYY-MM-DD',
                    applyLabel: '确定',
                    cancelLabel: '取消',
                    fromLabel: '起始时间',
                    toLabel: '结束时间',
                    customRangeLabel: '自定义',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                      '七月', '八月', '九月', '十月', '十一月', '十二月'
                    ],
                    firstDay: 1
                  },
                  startDate: start,
                  endDate: end
                },
                function (start, end, label) {
                  _self.start = start.format('YYYY-MM-DD') + " 00:00:00";
                  _self.end = end.format('YYYY-MM-DD') + " 23:59:59";
                });
            };

            var start = moment(new Date());
            var end = moment(new Date());
            d.task.start = start.subtract(3, "months").format('YYYY-MM-DD') + " 00:00:00";
            d.task.end = end.format('YYYY-MM-DD') + " 23:59:59";

            d.task.query.dsl = JSON.stringify({
              from: 0,
              size: 100,
              beginTime: d.task.start,
              endTime: d.task.end
            });

            d.task.start = decodeURIComponent(WebTool.urlQuery(location.href, "start") || d.task.start);
            d.task.end = decodeURIComponent(WebTool.urlQuery(location.href, "end") || d.task.end);

            d.task.currentType = decodeURIComponent(WebTool.urlQuery(location.href, "type") || "-");

            d.task.dataFilter = function (tData) {
              var data = [];
              var tData = tData.data;
              var retData = [{
                "title": "Tor站点" + "(" + tData.liveMap.torCount + ")",
                "name": "Tor站点",
                "type": "tor",
                "content": []
              }, {
                "title": "Zeronet站点" + "(" + tData.liveMap.zeronetCount + ")",
                "name": "Zeronet站点",
                "type": "zeronet",
                "content": []
              }, {
                "title": "不活跃站点",
                "name": "不活跃站点",
                "type": "noLivemap",
                "badge": tData.noLivemap.falseCount
              }];
              for (var k in tData.torMap) {
                var item = {
                  "title": k || "未分类",
                  "type": k
                }
                if (k) {
                  item.title = webCpu.params.siteTypes[k];
                }

                item.badge = tData.torMap[k];
                retData[0].content.push(item);

              }

              for (var k in tData.zeronetMap) {
                var item = {
                  "title": k || "未分类",
                  "type": k
                }
                if (k) {
                  item.title = webCpu.params.siteTypes[k];
                }


                item.badge = tData.zeronetMap[k];
                retData[1].content.push(item);

              }

              for (var i = 0; i < retData.length; i++) {
                if (retData[i].content && retData[i].content.sort) {
                  retData[i].content = retData[i].content.sort((a, b) => {
                    return b.badge - a.badge;
                  })
                }

              }

              return retData;
            }
          }
        },
        "centerAreaItem": {
          "key": 'golaxy_newsItems',
          "url": "product/golaxy_newsItems.js",
          "filter": {

          },
          "callback": function (c, d, t) {
            var str = '<div class="input-group"  style="margin-left: 10px;">\
                      <span class="input-group-addon" id="basic-addon1">有无账号</span>\
                      <div class="input-group-btn" aria-describedby="basic-addon1">\
                        <button type="button" style="width: 100px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data="" class="buttonText myInput">所有</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
                        <ul class="dropdown-menu">\
                          <li data=""><a >所有</a></li>\
                          <li data="true"><a >有</a></li>\
                          <li data="false"><a >无</a></li>\
                        </ul>\
                      </div>\
                    </div> <div class="input-group input-group-xs"  style="margin-left: 20px; display: inline-block; vertical-align: middle;">\
                    <span class="input-group-addon" id="basic-addon1">时间排序</span>\
                    <div class="input-group-btn" aria-describedby="basic-addon1">\
                      <button type="button" style="width: 100px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data="desc" class="buttonText sortInput">默认</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
                      <ul class="dropdown-menu dropdown-menu-right">\
                        <li data=""><a >默认</a></li>\
                        <li data="desc"><a >降序</a></li>\
                        <li data="asc"><a >升序</a></li>\
                      </ul>\
                    </div>';

            d.titleMenu = [{
              text: '<label style="width: 100%; margin: 0px; padding-left: 10px; text-align: left;"><span class="listType">所有站点</span><span style="margin-left: 10px;" class="badge siteNumber">0</span></label>'
            }, {
              text: str
            }]

            d.task.option.style.background = "rgba(0, 0, 0, 0.6)";
            d.task.option.template = '<div style="cursor: text;"><h4 style="word-break:break-all; margin: 0px; padding:0px;" class="list-group-item-heading">{{name}}</h4>\
            <div class="list-group-item-text" style="position: relative; float: left; width: 100%; word-break:break-all; margin-bottom:10px; margin-top: 5px;"><div style="width: calc( 100% - 220px ); display: inline-block;">{{domain}} <span style="margin-left: 5px;">({{isLive}})</span> <span style="margin-left: 5px;">(最近更新时间:{{lastFindTime}})</span></div> \
                  <div style="width: 220px; display: inline-block; float: right;"><button style="float: right; font-size: 10px;  background-color: transparent; color: #ddd;"" type="button" class="btn btn-default btn-xs moreRelativeBtn">页面列表</button>\
                  <label style="font-size: 10px; float: right;  margin:0px; margin-top: 0px;">类型:<select style="margin-left: 3px; background-color: transparent; margin-right: 3px; padding: 2px 5px; "></select></label></div></div>\
            <div class="otherInfo" style="margin-bottom: 5px; position: relative; float: left; width: 100%; ">虚拟身份: {{account}} [密码: {{password}}] <button type="button"  class="btn btn-default btn-xs moreIndentity" style="float: right;  background-color: transparent; color: #ddd;"">更多虚拟身份</button></div></div>';


            var start = moment(new Date());
            var end = moment(new Date());
            d.task.start = d.task.start || start.subtract(3, "months").format('YYYY-MM-DD') + " 00:00:00";
            d.task.end = d.task.start || end.format('YYYY-MM-DD') + " 23:59:59";

            d.task.start = decodeURIComponent(WebTool.urlQuery(location.href, "start") || d.task.start);
            d.task.end = decodeURIComponent(WebTool.urlQuery(location.href, "end") || d.task.end);


            d.task.dataFilter = function (tData) {

              tData = tData || {};
              tData.data = tData.data || {};
              if (tData.data.count !== undefined) {
                this.option.page = {
                  "total": tData.data.count,
                  "size": tData.data.size,
                  "current": tData.data.from
                }
              }

              var tData = tData.data.data || [];
              tData = tData.map(item => {
                item = item._source;
                item.isLive = item.isLive ? "存活" : "未存活";
                if (item.user && item.user[0]) {
                  item.account = item.user[0].user;
                  item.password = item.user[0].pass;
                }
                item.account = item.account || "无";
                item.password = item.password || "无";
                // item.type = webCpu.params.siteTypes[item.type] || "未知";
                return item;
              })
              return tData;
            }
            d.foot = "-";
            d.footStyle = {
              "text-align": "left",
              "padding-left": "10px"
            };
            d.task.option = d.task.option || {};
            d.task.option.page = d.task.option.page || {
              "total": 0,
              "size": 50,
              "current": 1
            };

            d.task.setDateRange = function (start, end, flag) {
              var _self = this;
              var selector = ".dateRange";
              this.start = start + " 00:00:00";
              this.end = end + " 23:59:59";

              $(this.titleArea).find(selector).daterangepicker({
                  locale: {
                    format: 'YYYY-MM-DD',
                    applyLabel: '确定',
                    cancelLabel: '取消',
                    fromLabel: '起始时间',
                    toLabel: '结束时间',
                    customRangeLabel: '自定义',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                      '七月', '八月', '九月', '十月', '十一月', '十二月'
                    ],
                    firstDay: 1
                  },
                  startDate: start,
                  endDate: end
                },
                function (start, end, label) {
                  _self.start = start.format('YYYY-MM-DD') + " 00:00:00";
                  _self.end = end.format('YYYY-MM-DD') + " 23:59:59";
                });
            };

            d.task.promise.afterRender = function (cc, dd, tt) {
              var name = "所有站点";
              var value = 0;
              if (webCpu.cards.leftAreaItem) {
                var tTask = webCpu.cards.leftAreaItem.task;
                if (tTask.currentData) {
                  name = tTask.currentData.name;
                  value = tTask.currentData.value;
                }
                // tTask.currentData = null;
              }

              // if(tt.pagination) {
              //   value = tt.pagination.total;
              // }
              $(tt.titleArea).find(".listType").html(name);
              $(tt.titleArea).find(".siteNumber").html(value);


              var end = tt.end.split(" ")[0];
              var start = tt.start.split(" ")[0];

              tt.setDateRange(start, end);

              var selector = $(cc).find("select");
              webCpu.commonTool.initOptions(selector, webCpu.params.siteTypes);

              $(tt.titleArea).find(".dropdown-menu li").off("click");
              $(tt.titleArea).find(".dropdown-menu li").on("click", function () {
                var match = {};
                var tTask = webCpu.cards.leftAreaItem.task;
                var myInput = $(tt.titleArea).find(".myInput").attr("data");
                var sortInput = $(tt.titleArea).find(".sortInput").attr("data");
                var dsl = dsl = {
                  "index": "website",
                  "query": {
                    "bool": {
                      "must": [{
                        "match": {
                          "type": tt.current.type
                        }
                      }, {
                        "match": {
                          "serviceType": tt.current.serviceType
                        }
                      }, {
                        "match": {
                          "isLive": true
                        }
                      }]
                    }
                  },
                  "from": 0,
                  "size": 50,
                  "beginTime": tTask.start,
                  "endTime": tTask.end,
                  "order": sortInput || "desc"
                };

                if (myInput == "true") {
                  dsl.query.bool.must.push({
                    "exists": {
                      "field": "user"
                    }
                  })
                } else if (myInput == "false") {
                  dsl.query.bool.must_not = [{
                    "exists": {
                      "field": "user"
                    }
                  }]
                }
                tt.query = tt.query || {};
                tt.query.dsl = JSON.stringify(dsl);
                // card.task.query.url = webCpu.interface.searchNode.query.url;
                webCpu.ListGroup.render(tt);
              });

              $(cc).find(".list-group-item").find("button.moreRelativeBtn").on("click", function (e) {
                // webCpu.cards.mainAreaItem.task.displayRelatedPageList("测试Domain");
                var item = $(this).parent().parent().parent().parent();
                var domain = tt.data[item.attr("index")].domain;
                var url = "/search?domain=" + domain + "&start=" + tt.start + "&end=" + tt.end;
                window.open(url, "_blank");
                return false;
              });

              $(cc).find(".list-group-item").find("select").on("click", function (e) {
                e.preventDefault();
                return false;
              })
              $(cc).find(".list-group-item").find("select").off("change");
              $(cc).find(".list-group-item").find("select").on("change", function (e) {
                //Todo 修改网页类型
                var selector = $(this).parent().parent().parent().parent().parent();
                var type = selector.find("select").val();
                var tData = tt.data[selector.attr("index")];
                var query = webCpu.interface.changePageSiteType.query;
                query.dsl = JSON.stringify([{
                  id: tData.id,
                  type: type
                }])
                webCpu.adapter.changePageSiteType(query, function (ret) {
                  // alert(1);
                  toolTip( ret.data, ret.msg);
                })
                e.preventDefault();
                return false;
              });

              $(cc).find(".list-group-item").find("select").val(function (index) {
                var type = dd[index].serviceType || "-";
                // console.log(dd[index]);
                return type;
              });

              $(tt.titleArea).find(".dropdown-menu>li>a").on("click", function () {
                var text = $(this).html();
                var value = $(this).parent().attr("data");
                var btnSelector = $(this).parent().parent().parent().children("button");
                btnSelector.children(".buttonText").html(text);
                btnSelector.children(".buttonText").attr("data", value);
              });

              $(cc).find(".list-group-item .moreIndentity").on("click", function () {
                var index = $(this).parent().parent().parent().attr("index");
                var tSite = tt.data[index];
                var dsl = JSON.parse(webCpu.interface.identityList.query.dsl);
                dsl.query.bool.must[0].match.url = tSite.url;
                webCpu.interface.identityList.query.dsl = JSON.stringify(dsl);
                var configApp = {
                  "url": "demo/awAnalysis/card/manageDataTable.js",
                  "key": "manageDataTable",
                  "interface": "identityList",
                  "callback": function (c, d, t) {
                    d.style = {
                      padding: "0px 20px"
                    }
                    d.title = "<div style='width: 100%;'><button style='float: left;' class='btn btn-primary btn-sm addRecordBtn'>新增</button></div>"

                    d.task.option.attributeMap = {
                      "user": {
                        "name": "虚拟身份账号",
                        "editor": {
                          "type": 'text',
                          "width": '120px',
                          "value": ''
                        }
                      },
                      "pass": {
                        "name": "密码",
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

                    d.task.current = tSite;

                    d.task.dataFilter = function (tData) {

                      tData = this.current.user || [];
                      tData = tData.map(item => {
                        if (typeof (item) === "string") {
                          item = JSON.parse(item);
                        }
                        return item;
                      });

                      return tData;
                    }

                    d.task.initAddRecordEvent = function () {
                      var _self = this;
                      $(this.titleArea).find(".addRecordBtn").off("click");
                      $(this.titleArea).find(".addRecordBtn").on("click", function () {
                        _self.editDialog("添加记录", null, function (dd, i) {
//<<<<<<< HEAD
//                        if (!dd.user || !dd.pass) {
//                          toolTip(3, 1, "用户名或密码不可为空。");
//=======
                        	console.log(22222222222,dd)
                          if(dd.user===undefined || dd.pass===undefined) {
//                        if(!dd.user || !dd.pass) {
                            toolTip( 2, "用户名或密码不可为空！");
//>>>>>>> lby
                            // $(d.task.titleArea).find(".addRecordBwtn").click();
                            return false;
                          }else{
                          	_self.data.unshift(dd);
                          	var query = webCpu.interface.updateIndentity.query;
                          	query.id = _self.current.id;
                          	query.user = JSON.stringify(_self.data);
                          	webCpu.adapter.updateIndentity(query, function (ret) {
                          	  toolTip( 1, ret.msg);
                          	  webCpu.DataTable.updateView(_self);
                          	});
                          }
                          webCpu.CardItem.dismissMask(d);
                        });
                      });
                    };
                    d.task.removeRecordEvent = function () {
                      var _self = this;
                      $(_self.container).find(".removeBtn").off("click");
                      $(_self.container).find(".removeBtn").on("click", function () {
                        var index = $(this).parent().parent().parent().attr("index");
                        webCpu.CardItem.showTips(_self, "确认删除吗？", function () {
                          var tData = _self.data.splice(index, 1)[0];
                          var query = webCpu.interface.updateIndentity.query;
                          query.id = _self.current.id;
                          query.user = JSON.stringify(_self.data);
                          webCpu.adapter.updateIndentity(query, function (ret) {
                            webCpu.DataTable.updateView(_self);
                          })
                        }, {
                          confirm: "确认",
                          default: "取消",
                          tipsTitle: "提示"
                        });
                      });
                    }

                    d.task.promise.afterRender = function (c1, d1, t1) {
                      t1.initAddRecordEvent();
                      t1.removeRecordEvent();
                    }

                  },
                  closeCallback: function () {
                    webCpu.ListGroup.render(d.task);
                  }

                }

                webCpu["CardItem"].cardDialog(webCpu.cards.centerAreaItem, configApp.url, "", {
                    width: "60%",
                    height: "80%"
                  },
                  configApp, tSite.domain);
              });
            }
            d.task.pageCallback = function (n, size) {
              this.query = this.query || {};
              var dsl = this.query.dsl || "{}";
              dsl = JSON.parse(this.query.dsl);
              dsl.from = n;
              dsl.size = size || 10;
              this.query.dsl = JSON.stringify(dsl);
              webCpu.render("ListGroup", this);
            }
          }
        }
      },
      "callback": function (c, d, t) {
        console.log(d);
      }
    },
    "emailTool": {
      "url": "layout/main.js",
      "breadcrumb": ["主页", "邮箱查询"],
      "children": {
        "mainAreaItem": {
          "url": "demo/awAnalysis/card/emailTool.js",
          "key": "emailTool"
        }
      },
      "callback": function (c, d, t) {
        console.log(d);
      }
    },
    "passwordTool": {
      "url": "layout/main.js",
      "breadcrumb": ["主页", "密码映射"],
      "children": {
        "mainAreaItem": {
          "url": "demo/awAnalysis/card/passwordTool.js",
          "key": "passwordTool"
        }
      },
      "callback": function (c, d, t) {
        console.log(d);
      }
    },
    "awNode": {
      "url": "layout/main.js",
      "breadcrumb": ["主页", "暗网节点"],
      "children": {
        "mainAreaItem": {
          "url": "demo/awAnalysis/card/manageDataTable.js",
          "key": "manageDataTable",
          "interface": "nodesList",
          "callback": function (c, d, t) {
            d.style = {
              padding: "0px 20px"
            }
            d.task.style = {
              padding: "0px 0px"
            }
            d.footStyle = {
              "text-align": "left"
            }
            d.task.option.attributeMap = {
              "ipv4": {
                "name": "IPv4",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "ipv6": {
                "name": "IPv6",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "updateTime": {
                "name": "最新探测时间",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "detectTime": {
                "name": "首次探测时间",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "netType": {
                "name": "网络类型",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "live": {
                "name": "是否存活",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                },
                render: function (v, d) {
                  var str = "是";
                  if (d.live === "false") {
                    str = "否"
                  }
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
                var index = $(this).parent().parent().parent().attr("index");
                webCpu.CardItem.showTips(_self, "确认删除吗？", function () {

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
            d.foot = "-";
            d.title = '<div  style="margin-right: 10px;" >\
                          <div style="display: inline-block;"  class="btn-group" role="group">\
									          <button value="1" type="button" class="btn btn-default">今天</button>\
									          <button value="7" type="button" class="btn btn-default">近一周</button>\
									          <button value="30" type="button" class="btn btn-default">近一月</button>\
									          <button value="all" type="button" class="btn btn-default">所有</button>\
								          </div>\
                          <div class="dateRange" style="display: inline-block;"><input class="form-control" style="width: 230px;" type="text" /></div>\</div>\
                        <div class="input-group">\
                        <div class="input-group-btn " aria-describedby="basic-addon1">\
                          <button type="button" style="width: 90px; padding: 9px 0px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle input-group-addon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data="ipv4" class="buttonText ipTypeInput">IPv4</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
                          <ul class="dropdown-menu" style="overflow: auto; max-height: 300px;">\
                            <li data="ipv4"><a >IPv4</a></li>\
                            <li data="ipv6"><a >IPv6</a></li>\
                          </ul>\
                        </div>\
                        <input type="text" class="form-control ipStringInput" placeholder="输入IP地址">\
                      </div><div class="input-group"  style="margin-left: 10px;">\
                        <span class="input-group-addon" id="basic-addon1">网络类型</span>\
                        <div class="input-group-btn" aria-describedby="basic-addon1">\
                          <button type="button" style="width: 100px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data="" class="buttonText netTypeInput">所有</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
                          <ul class="dropdown-menu">\
                            <li data=""><a >所有</a></li>\
                            <li data="tor"><a >tor</a></li>\
                            <li data="i2p"><a >I2P</a></li>\
                          </ul>\
                        </div>\
                      </div><div class="input-group"  style="margin-left: 10px;">\
                      <span class="input-group-addon" id="basic-addon1">是否存活</span>\
                      <div class="input-group-btn" aria-describedby="basic-addon1">\
                        <button type="button" style="width: 100px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data="" class="buttonText isLiveInput">所有</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
                        <ul class="dropdown-menu">\
                          <li data=""><a >所有</a></li>\
                          <li data="true"><a >是</a></li>\
                          <li data="false"><a >否</a></li>\
                        </ul>\
                      </div>\
                    </div>  \
                    <div class="input-group countrySelect"  style="margin-left: 10px;">\
                      <span class="input-group-addon" id="basic-addon1">国家</span>\
                      <div class="input-group-btn" aria-describedby="basic-addon1">\
                        <button type="button" style="width: 150px; overflow: hidden; text-overflow:ellipsis;" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data="" class="buttonText countryInput">所有</span> <span style="position: absolute; right: 8px; top: 13px;" class="caret"></span></button>\
                        <ul class="dropdown-menu" style="max-height: 400px; overflow: auto;">\
                          <li data=""><a >所有</a></li>\
                          <li data="true"><a >是</a></li>\
                          <li data="false"><a >否</a></li>\
                        </ul>\
                      </div>\
                    </div>  <button style="margin-left: 10px;" class="btn btn-primary searchBtn" type="button">检索</button>'
            d.task.option.page = d.task.option.page || {
              "total": 0,
              "size": 50,
              "current": 1
            };
            d.task.setDateRange = function (start, end, flag) {
              var _self = this;
              var selector = ".dateRange>input";
              this.start = start + " 00:00:00";
              this.end = end + " 23:59:59";

              $(this.titleArea).find(selector).daterangepicker({
                  locale: {
                    format: 'YYYY-MM-DD',
                    applyLabel: '确定',
                    cancelLabel: '取消',
                    fromLabel: '起始时间',
                    toLabel: '结束时间',
                    customRangeLabel: '自定义',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                      '七月', '八月', '九月', '十月', '十一月', '十二月'
                    ],
                    firstDay: 1
                  },
                  startDate: start,
                  endDate: end
                },
                function (start, end, label) {
                  _self.start = start.format('YYYY-MM-DD') + " 00:00:00";
                  _self.end = end.format('YYYY-MM-DD') + " 23:59:59";
                });
            };

            var start = moment(new Date());
            var end = moment(new Date());
            d.task.start = start.subtract(3, "months").format('YYYY-MM-DD') + " 00:00:00";
            d.task.end = end.format('YYYY-MM-DD') + " 23:59:59";

            d.task.start = decodeURIComponent(WebTool.urlQuery(location.href, "start") || d.task.start);
            d.task.end = decodeURIComponent(WebTool.urlQuery(location.href, "end") || d.task.end);


            d.task.dataFilter = function (data) {

              if (data && data.data && data.data.data) {
                this.option.page = {
                  total: data.data.count,
                  current: data.data.from,
                  size: data.data.size
                }
                var ret = data.data.data.map(item => {
                  return item._source;
                });
                return ret;
              }
            }

            d.task.pageCallback = function (n, size) {
              this.query = this.query || {};
              var dsl = this.query.dsl || "{}";
              if (typeof (dsl) === "string") {
                dsl = JSON.parse(this.query.dsl);
              }

              dsl.from = n;
              dsl.size = size || 10;
              this.query.dsl = JSON.stringify(dsl);
              webCpu.render("DataTable", this);
            }


            d.task.updateCountrySelect = function (selector, callback) {
              var selector = $(this.titleArea).find(selector || ".countrySelect .dropdown-menu");
              selector.html("");
              webCpu.adapter.countryList({}, function (d) {
                var list = WebTool.stringToObject(d);
                for (var k in list) {
                  var item = $('<li data="' + k + '"><a >' + list[k] + '</a></li>');
                  item.appendTo(selector);
                }
                if (typeof (callback) === "function") {
                  callback(list);
                }
              });
            }

            d.task.updateByCondition = function (match, other) {
              var dsl = {
                "query": {
                  "bool": {
                    "must": []
                  }
                }
              };
              for (var k in match) {
                var item = {};
                if (match[k] !== undefined && match[k] !== "") {
                  item[k] = match[k];
                  dsl.query.bool.must.push({
                    match: item
                  });
                }
              }
              if (other) {
                dsl.query.bool.must.push(other);
              }
              var card = webCpu.cards.mainAreaItem;
              card.task.query.dsl = dsl;
              // card.task.query.url = webCpu.interface.searchNode.query.url;
              webCpu.DataTable.render(card.task);
            }

            d.task.promise.afterRender = function (c1, d1, t1) {
              var end = t1.end.split(" ")[0];
              var start = t1.start.split(" ")[0];

              t1.setDateRange(start, end);
              $(t1.titleArea).find(".allHistoryBtn").off("click");
              $(t1.titleArea).find(".allHistoryBtn").on("click", function () {
                start = "1976-01-01";
                t1.setDateRange(start, end);
              });

              webCpu.bindEnter(t1.titleArea, $(t1.titleArea).find(".searchBtn")[0]);

              t1.updateCountrySelect(null, function (d) {
                var country = WebTool.urlQuery(location.href, "country");

                if (country && !t1.inited) {
                  $(t1.titleArea).find(".countrySelect .buttonText").attr("data", country);
                  $(t1.titleArea).find(".countrySelect .buttonText").html(d[country]);
                  t1.inited = true;
                  t1.updateByCondition({
                    country: country
                  });
                }
                $(t1.titleArea).find(".dropdown-menu>li>a").on("click", function () {
                  var text = $(this).html();
                  var value = $(this).parent().attr("data");
                  var btnSelector = $(this).parent().parent().parent().children("button");
                  btnSelector.children(".buttonText").html(text);
                  btnSelector.children(".buttonText").attr("data", value);
                });
              });

              $(t1.titleArea).find(".dropdown-menu>li>a").on("click", function () {
                var text = $(this).html();
                var value = $(this).parent().attr("data");
                var btnSelector = $(this).parent().parent().parent().children("button");
                btnSelector.children(".buttonText").html(text);
                btnSelector.children(".buttonText").attr("data", value);
              });

              $(t1.titleArea).find(".searchBtn").off("click");
              $(t1.titleArea).find(".searchBtn").on("click", function () {
                var match = {};
                var ipType = $(t1.titleArea).find(".ipTypeInput").attr("data");
                match[ipType] = $(t1.titleArea).find(".ipStringInput").val();
                match.netType = $(t1.titleArea).find(".netTypeInput").attr("data");
                match.live = $(t1.titleArea).find(".isLiveInput").attr("data");
                match.country = $(t1.titleArea).find(".countryInput").attr("data");
                var other = {
                  "range": {
                    "detectTime": [{
                      "gte": t1.start,
                      "lte": t1.end
                    }]
                  }
                }
                t1.updateByCondition(match, other);
              });


            }

          }
        }
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
                var index = $(this).attr("index");
                webCpu.CardItem.showTips(_self, "确认删除吗？", function () {
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
              } else if (data.title === "统计信息") {
                location.href = "sysCountInfo";
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
            d.footStyle = {
              "text-align": "left"
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
                  var str = "<button objectId='" + v + "' style='margin-right: 10px;'  title='删除' class='btn btn-default btn-sm removeBtn'>删除</button><button title='重置密码' style='margin-right: 10px;' class='btn btn-default btn-sm resetBtn'>重置密码</button>"
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
//<<<<<<< HEAD
//                query.row = d;
//                if (d.name && d.role) {
//                  query.row.password = MurmurHash.rule("123456");
//                  webCpu.adapter.addUser(query, function (ret) {
//                    if (ret.status === 0) {
//                      toolTip(3, 1, "用户添加成功。");
//                    }
//                    webCpu.DataTable.render(_self);
//                  });
//                } else {
//                  toolTip(3, 2, "用户名和角色不可为空。");
//                }
//
//=======
                  if(d.name!==undefined&&d.role!==''){
                  	query.row = d;
                  	query.row.password = MurmurHash.rule("123456");
                  	webCpu.adapter.addUser(query, function (ret) {
                  	  webCpu.DataTable.render(_self);
                    	toolTip(1,"新增成功")
                  	});
                  }else{
                  	toolTip(2,"新增失败用户名和角色不可为空")
                  }
//>>>>>>> lby
                });
              });
            };
            d.task.removeUserEvent = function () {
              var _self = this;
              $(_self.container).find(".removeBtn").off("click");
              $(_self.container).find(".removeBtn").on("click", function () {

                var index = $(this).parent().parent().parent().attr("index");
                webCpu.CardItem.showTips(_self, "确认删除吗？", function () {

                  var tData = _self.data.splice(index, 1)[0];
                  var query = webCpu.interface.removeUser.query;
                  if (tData) {
                    query.query = {
                      _id: tData["_id"]
                    };
                    webCpu.adapter.removeUser(query, function (ret) {
                      webCpu.DataTable.render(_self);
                    	toolTip(1,"删除成功")
                    })
                  }else{
                  	toolTip(2,"删除失败")
                  }
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
                var index = $(this).parent().parent().parent().attr("index");
                webCpu.CardItem.showTips(_self, "确认重置密码为123456吗？", function () {
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
              } else if (data.title === "统计信息") {
                location.href = "sysCountInfo";
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
            d.footStyle = {
              "text-align": "left"
            }
            d.task.option._page = d.task.option.page;
            d.task.option.page = null;
            d.title = "<div style='width: 100%; text-align: left;'>角色管理<button style='float: right;'  class='btn btn-primary btn-sm addRecordBtn'>新增</button></div>"
            var menuItems = webCpu.cards.main.titleData.menu;
            var rArr = [];
            for (var i = 0; i < menuItems.length; i++) {
              if (!menuItems[i].fixed) {
                var item = {
                  "value": menuItems[i].name,
                  "type": 'checkbox',
                  "tips": menuItems[i].name
                }
                rArr.push(item)
              }
            }
            d.task.option.attributeMap = {
              "name": {
                name: "角色名称",
                "editor": {
                  "type": 'text',
                  "width": '120px',
                  "value": ''
                }
              },
              "fRight": {
                name: "功能权限",
                "editor": rArr
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
//<<<<<<< HEAD
//                query.row = d;
//                if (d.name && d.fRight && d.fRight.length > 0) {
//                  webCpu.adapter.addRole(query, function (ret) {
//                    if (ret.status === 0) {
//                      toolTip(3, 1, "角色添加成功。");
//                    }
//                    webCpu.DataTable.render(_self);
//                  })
//                } else {
//                  toolTip(3, 2, "角色名称和权限列表不可为空。");
//                }
//
//=======
                  if(d.name!==''&&d.fRight.length>0){
                  	query.row = d;
                  	webCpu.adapter.addRole(query, function (ret) {
                  	  webCpu.DataTable.render(_self);
                  	})
                  }
//>>>>>>> lby
                });
              });
            };
            d.task.removeRoleEvent = function () {
              var _self = this;
              $(_self.container).find(".removeBtn").off("click");
              $(_self.container).find(".removeBtn").on("click", function () {
                var index = $(this).parent().parent().parent().attr("index");
                webCpu.CardItem.showTips(_self, "确认删除吗？", function () {
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
                  if (d.name && d.fRight && d.fRight.length > 0) {
                    webCpu.adapter.addRole(query, function (ret) {
                      if (ret.status === 0) {
                        toolTip(3, 1, "角色添加成功。");
                      }
                      webCpu.DataTable.render(_self);
                    })
                  }
                  else {
                    toolTip(3, 2, "角色名称和权限列表不可为空。");
                  }
                 
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
              } else if (data.title === "统计信息") {
                location.href = "sysCountInfo";
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
            d.footStyle = {
              "text-align": "left"
            }
            d.foot = "-";
            d.task.option.page = {
              "total": 0,
              "size": 50,
              "current": 1
            };
            d.title = "<div style='width: 100%; text-align: left;'>日志管理<button style='float: right; display: none;'  class='btn btn-primary btn-sm exportBtn'>导出</button></div>"
            d.task.option.attributeMap = {
              "userId": {
                name: "操作账号",
                render: function (v, d) {
                  var str = d["userId"] || "游客";
                  return str;
                }
              },
              "operationName": "操作名称",
              "operationValue": "操作内容",
              "operationTime": "操作时间"
            };

            d.task.initExportEvent = function () {
              var _self = this;
              $(this.titleArea).find(".exportBtn").off("click");
              $(this.titleArea).find(".exportBtn").on("click", function () {
                //导出
              });
            };

            d.task.dataFilter = function (tData) {
              console.log(tData);
              tData.data = tData.data || [];
              tData.data = tData.data.sort((a, b) => {
                var t1 = moment(a.operationTime);
                var t2 = moment(b.operationTime);
                return t2 - t1;
              })
              return tData;
            }

            d.task.promise.afterRender = function (c1, d1, t1) {
              t1.initExportEvent();
            }

          }
        }
      }
    },
    "siteTypeManage": {
      "url": "layout/leftAndMain.js",
      "breadcrumb": ["主页", "系统配置", "站点类型配置"],
      "children": {
        "leftAreaItem": {
          "url": "demo/awAnalysis/card/manageMenu.js",
          "key": "manageMenu",
          "callback": function (c, d, t) {
            d.task.data = [{
              "title": '站点类型配置'
            }, {
              "title": '网页类型配置'
            }, {
              "title": '其他信息配置'
            }];
            d.task.clickCallback = function (data) {
              if (data.title === "站点类型配置") {
                location.href = "siteTypeManage";
              } else if (data.title === "网页类型配置") {
                location.href = "pageTypeManage";
              } else {
                location.href = "paramsManage";
              }
            }
          }
        },
        "centerAreaItem": {
          "url": "demo/awAnalysis/card/mList.js",
          "key": "transweb_mList",
          "interface": "websiteType",
          "callback": function (c, d, t) {
            d.style = {
              padding: "0px 20px"
            }
            // d.foot = "-";
            d.task.option.page = {
              "total": 0,
              "size": 10,
              "current": 1
            };
            d.title = "<div style='width: 100%; text-align: left;'><button style='float: left;'  class='btn btn-primary btn-sm addTypeBtn'>新增类型</button></div>"

            d.task.dataFilter = function (tData) {
              var retArr = [];
              for (var i = 0; i < tData.data.length; i++) {
                var tItem = tData.data[i];
                var item = {
                  label: tItem.label || tItem.key,
                  key: tItem.key,
                  keyword: tItem.value
                }
                if (item.key && item.key !== "-" && item.key !== "") {
                  retArr.push(item);
                }
              }
              this.option.page = {
                "total": tData.pager.total,
                "size": tData.pager.limit,
                "current": tData.pager.start
              };
              return retArr;
            }

            d.task.pageCallback = function (n, size) {
              this.query = this.query || {};
              if (n === "0" || n === 0) {
                n = 1;
              }
              this.query.from = n;
              this.query.limit = size || 10;
              webCpu.render(this.className, this);
            }

            d.footStyle = {
              "text-align": "left"
            }

            var _self = this;
            d.task.promise.clickCallback = function (tData) {

            }

            d.task.promise.afterRenderCard = function (cc, dd, tt) {
              $(tt.titleArea).find(".addTypeBtn").on("click", function () {
                var configData = [{
                  "title": "类型名称",
                  "name": "name",
                  "items": [{
                    "type": "text",
                    "width": "120px",
                    "value": ""
                  }]
                }, {
                  "title": "关键词",
                  "name": "name",
                  "items": [{
                    "type": "text",
                    "width": "120px",
                    "value": ""
                  }]
                }];
                webCpu.CardItem.configDialog(tt, "新增类型", configData, function () {
                  var inputItem = webCpu.FormItem.getValue(tt.inputTask);
                  var value = inputItem[1].value.split(",");
                  // if(value.length < 2) {
                  //   value = value[0].split("，");
                  // }
                  value = value.map(item => {
                    return $.trim(item);
                  });
                  var key = "siteType" + (new Date()).getTime();
                  var _d = {
                    label: inputItem[0].value,
                    key: key,
                    value: value
                  }
                  var query = webCpu.interface.addWebsiteType.query;
                  query.row = _d;
                  webCpu.adapter.addWebsiteType(query, function (ret) {
                    webCpu[tt.className].render(tt);
                  })
                }, "400px");
              });
            }

            d.task.removeCallback = function (tData) {
              if (!tData) {
                return false;
              }
              var query = webCpu.interface.removeSiteType.query;
              query.query = {
                key: tData.key
              }
              webCpu.CardItem.confirmRequest(webCpu.adapter.removeSiteType, query, webCpu.cards.centerAreaItem, "确定要删除吗？", function (ret) {
                console.log(ret);
                webCpu.CardItem.fresh(webCpu.cards.centerAreaItem);
              });
            }


          }
        }
      }
    },
    "pageTypeManage": {
      "url": "layout/leftAndMain.js",
      "breadcrumb": ["主页", "系统配置", "网页类型配置"],
      "children": {
        "leftAreaItem": {
          "url": "demo/awAnalysis/card/manageMenu.js",
          "key": "manageMenu",
          "callback": function (c, d, t) {
            d.task.data = [{
              "title": '站点类型配置'
            }, {
              "title": '网页类型配置'
            }, {
              "title": '其他信息配置'
            }];
            d.task.clickCallback = function (data) {
              if (data.title === "站点类型配置") {
                location.href = "siteTypeManage";
              } else if (data.title === "网页类型配置") {
                location.href = "pageTypeManage";
              } else {
                location.href = "paramsManage";
              }
            }
          }
        },
        "centerAreaItem": {
          "url": "demo/awAnalysis/card/mList.js",
          "key": "transweb_mList",
          "interface": "webPageType",
          "callback": function (c, d, t) {
            d.style = {
              padding: "0px 20px"
            }
            // d.foot = "-";
            d.task.option.page = {
              "total": 0,
              "size": 10,
              "current": 1
            };
            d.title = "<div style='width: 100%; text-align: left;'><button style='float: left;'  class='btn btn-primary btn-sm addTypeBtn'>新增类型</button></div>"

            d.task.dataFilter = function (tData) {
              var retArr = [];
              for (var i = 0; i < tData.data.length; i++) {
                var tItem = tData.data[i];
                var item = {
                  label: tItem.label || tItem.key,
                  key: tItem.key,
                  keyword: tItem.value
                }
                if (item.key && item.key !== "-" && item.key !== "") {
                  retArr.push(item);
                }
              }
              this.option.page = null;
              // this.option.page = {
              //   "total": tData.pager.total,
              //   "size": tData.pager.limit,
              //   "current": tData.pager.start
              // };
              return retArr;
            }
            d.footStyle = {
              "text-align": "left"
            }
            d.task.promise.afterRenderCard = function (cc, dd, tt) {
              $(tt.titleArea).find(".addTypeBtn").on("click", function () {
                var configData = [{
                  "title": "类型名称",
                  "name": "name",
                  "items": [{
                    "type": "text",
                    "width": "120px",
                    "value": ""
                  }]
                }, {
                  "title": "关键词",
                  "name": "name",
                  "items": [{
                    "type": "text",
                    "width": "120px",
                    "value": ""
                  }]
                }];
                webCpu.CardItem.configDialog(tt, "新增类型", configData, function () {
                  var inputItem = webCpu.FormItem.getValue(tt.inputTask);
                  var value = inputItem[1].value.split(",");
                  value = value.map(item => {
                    return $.trim(item);
                  });
                  var key = "pageType" + (new Date()).getTime();
                  var _d = {
                    label: inputItem[0].value,
                    key: key,
                    value: value
                  }
                  var query = webCpu.interface.addWebPageType.query;
                  query.row = _d;
                  webCpu.adapter.addWebPageType(query, function (ret) {
                    webCpu[tt.className].render(tt);
                  })
                }, "400px");
              });
            }

            d.task.promise.clickCallback = function (tData) {

            }


            d.task.removeCallback = function (tData) {
              if (!tData) {
                return false;
              }
              var query = webCpu.interface.removePageType.query;
              query.query = {
                key: tData.key
              }
              webCpu.CardItem.confirmRequest(webCpu.adapter.removePageType, query, webCpu.cards.centerAreaItem, "确定要删除吗？", function (ret) {
                console.log(ret);
                webCpu.CardItem.fresh(webCpu.cards.centerAreaItem);
              });
            }
            d.task.pageCallback = function (n, size) {
              this.query = this.query || {};
              if (n === "0" || n === 0) {
                n = 1;
              }
              this.query.from = n;
              this.query.limit = size || 10;
              webCpu.render(this.className, this);
            }

          }
        }
      }
    },
    "paramsManage": {
      "url": "layout/leftAndMain.js",
      "breadcrumb": ["主页", "系统配置", "其他参数配置"],
      "children": {
        "leftAreaItem": {
          "url": "demo/awAnalysis/card/manageMenu.js",
          "key": "manageMenu",
          "callback": function (c, d, t) {
            d.task.data = [{
              "title": '站点类型配置'
            }, {
              "title": '网页类型配置'
            }, {
              "title": '其他信息配置'
            }];
            d.task.clickCallback = function (data) {
              if (data.title === "站点类型配置") {
                location.href = "siteTypeManage";
              } else if (data.title === "网页类型配置") {
                location.href = "pageTypeManage";
              } else {
                location.href = "paramsManage";
              }
            }
          }
        },
        "centerAreaItem": {
          "url": "demo/awAnalysis/card/configParams.js",
          "key": "configParams",
          "interface": "paramsConfig",
          "callback": function (c, d, t) {

            d.task.dataFilter = function (tData) {
              this.tData = tData;
              return tData.data[0];
            }



          }
        }
      }
    },
    "sysCountInfo": {
      "url": "layout/leftAndMain.js",
      "breadcrumb": ["主页", "系统管理", "统计信息"],
      "children": {
        "leftAreaItem": {
          "url": "demo/awAnalysis/card/manageMenu.js",
          "key": "manageMenu",
          "callback": function (c, d, t) {
            // d.task.data = [{
            //   "title": '角色管理'
            // }, {
            //   "title": '网页类型配置'
            // }, {
            //   "title": '其他信息配置'
            // }];
            d.task.clickCallback = function (data) {
              if (data.title === "角色管理") {
                location.href = "roleManage";
              } else if (data.title === "统计信息") {
                location.href = "sysCountInfo";
              } else if (data.title === "日志管理") {
                location.href = "logsManage";
              } else {
                location.href = "userManage";
              }
            }
          }
        },
        "centerAreaItem": {
          "url": "demo/awAnalysis/card/sysCountInfo.js",
          "key": "sysCountInfo",
          "interface": "sysCountInfo",
          "callback": function (c, d, t) {

            d.task.dataFilter = function (tData) {

              return tData.data;
            }



          }
        }
      }
    }
  }
});