webCpu.interface = {
  golaxy_worldMap: {
      // url: "demo/awAnalysis/mockData/mapData.json",
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/statistics/countryRank",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    countryList: {
      url: "demo/awAnalysis/mockData/country.js",
      requestType: "get",
      dataType: "json",
      flag: 1
    },
    sysCountInfo: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/monitor/statistics",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    countryColumn: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/statistics/tradeTypeRank",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    golaxy_column: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/statistics/webPageTypeNumRank",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    sitePageTrend: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/node/searchCount",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    golaxy_pie: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/statistics/langRank",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    comprehensiveSearch: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/topic/comprehensiveSearch",
        dsl: {

        },
        method: "post",
        "headers": {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    awAddressList: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/topic/websiteList",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "post",
        dsl: JSON.stringify({
          from: 0,
          size: 50
        })
      },
      requestType: "get",
      dataType: "json"
    },
    awUrlList: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/topic/getTitleByRoot",
        root: "http://acteam2nmbucjnht.onion",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    topicDataTrend: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/topic/getTopicRangeTimePageCount",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "get",
        topicId: "AXXq-m6x2g8D6D_jXMoZ",
        beginTime: "2020-08-22 00:00:00",
        endTime: "2020-11-22 23:59:59"
      },
      requestType: "get",
      dataType: "json"
    },
    topicList: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/topic/getTopicList",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "post",
        dsl: JSON.stringify({
          from: 0,
          size: 50
        })
      },
      requestType: "get",
      dataType: "json"
    },
    changePageSiteType: {
      url: "gateway",
      query: {
        method: "post",
        url: "http://" + host + "/data-analysis/topic/websiteDeal",
        dsl: "[]",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      type: "get",
      dataType: "json"
    },
    saveTopic: {
      url: "gateway",
      query: {
        method: "post",
        url: "http://" + host + "/data-analysis/topic/saveTopics",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      type: "get",
      dataType: "json"
    },
    deleteTopic: {
      url: "gateway",
      query: {
        method: "delete",
        url: "http://" + host + "/data-analysis/topic/deleteTopics",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      type: "get",
      dataType: "json"
    },
    topicResults: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/topic/searchTopic",
        topicId: "seiffHABJR4mX4FVmLwS",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "post"
      },
      requestType: "get",
      dataType: "json"
    },
    emailTool: {
      url: "gateway",
      query: {
        url: "http://" + eHost + "/idata/v1.0/id/_search",
        q: ".com",
        searchType: "id",
        limit: 120
      },
      callback: function (query) {
        var logined = webCpu.cards._main.task.logined;
        if (logined && logined.name) {
          query.headers = {
            userId: logined.name,
            token: 123456
          }
        }
      },
      requestType: "get",
      dataType: "json"
    },
    passwordTool: {
      url: "gateway",
      query: {
        url: "http://" + eHost + "/idata/v1.0/hash/_search",
        q: "638d458ae84d538e15b2c4b2d1feba47",
        hashType: "md5",
        limitUser: 15,
        limit: 120
      },
      callback: function (query) {
        var logined = webCpu.cards._main.task.logined;
        if (logined && logined.name) {
          query.headers = {
            userId: logined.name,
            token: 123456
          }
        }
      },
      requestType: "get",
      dataType: "json"
    },
    passwordTrans: {
      url: "gateway",
      query: {
        url: "http://" + eHost + "/idata/v1.0/hash/get",
        q: "aaaaa"
      },
      callback: function (query) {
        var logined = webCpu.cards._main.task.logined;
        if (logined && logined.name) {
          query.headers = {
            userId: logined.name,
            token: 123456
          }
        }
      },
      requestType: "get",
      dataType: "json",
      flag: 1
    },
    pageDetail: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/topic/search",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "post",
        dsl: {
          "index": "web_page",
          "query": {
            "term": {
              "url": "http://porno-classic-video.wo5wxkyf2vhyfrtr5mgkomghcjui36cqejuyqizf6r7qwhgqpktganyd.onion/porn-video-monique-fuentes/mom-boy-porn-video.html"
            }
          }
        }
      },
      callback: function (query) {
        var logined = webCpu.cards._main.task.logined;
        if (logined && logined.name) {
          query.headers = {
            userId: logined.name,
            token: 123456
          }
        }
      },
      requestType: "get",
      dataType: "json"
    },
    domainItemList: {
      url: "gateway",
      query: {
        // url: "http://" + host + "/data-analysis/topic/getRootByType",
        url: "http://" + host + "/data-analysis/topic/search",
        dsl: JSON.stringify({
          type: "tor",
          serviceType: "",
          from: 0,
          size: 50
        }),
        method: "post"
      },
      requestType: "get",
      dataType: "json"
    },
    identityList: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/user/getUserList",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "post",
        dsl: JSON.stringify({
          "query": {
            "bool": {
              "must": [{
                match: {
                  url: "http://tzylxqdlixcy6drq.onion/"
                }
              }]
            }
          }
        })
      },
      requestType: "get",
      dataType: "json"
    },
    nodesList: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/node/searchNode",
        method: "post",
        dsl: JSON.stringify({
          "query": {
            "bool": {
              "must": []
            }
          }
        })
      },
      requestType: "get",
      dataType: "json"
    },
    updateIndentity: {
      url: "gateway",
      query: {
        url: "http://" + host + "/data-analysis/user/updateUser",
        user: [],
        id: "",
        method: "post"
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    removeIdentity: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/identity/_delete",
        method: "post",
        query: {
          _id: ""
        }
      },
      callback: function (query) {
        var logined = webCpu.cards._main.task.logined;
        if (logined && logined.name) {
          query.headers = {
            userId: logined.name,
            token: 123456
          }
        }
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    users: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/user",
        query: {}
      },
      requestType: "get",
      dataType: "json",
      flag: 1
    },
    login: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/user",
        query: {}
      },
      requestType: "get",
      dataType: "json",
      flag: 1
    },
    roles: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/role",
        query: {},
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    logs: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/userLogs",
        query: {},
        sort: {
          operationTime: -1
        },
        start: 1,
        limit: 50,
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      requestType: "get",
      dataType: "json"
    },
    addUser: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/user",
        method: "put",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    modifyPass: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/user/_update",
        set: {
          password: ""
        },
        query: {
          _id: ""
        },
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "post"
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    removeUser: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/user/_delete",
        method: "post",
        query: {
          _id: ""
        },
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    resetPass: {
      url: "resetPass",
      type: "post",
      headers: {
        userId: webCpu.logined,
        token: "123456"
      },
      flag: 1
    },
    viewRights: {
      url: "viewRights",
      type: "get",
      flag: 1
    },
    addConfig: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/livingConfig",
        method: "put",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      // t: {"index":"website","query":{"bool":{"must":[{"match":{"type":"tor"}},{"match":{"serviceType":"sexy"}}]}},"from":0,"size":50,"order":"desc"},
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    addRole: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/role",
        method: "put",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },

      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    removeRole: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/role/_delete",
        method: "post",
        query: {
          _id: ""
        },
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    updateRights: {
      url: "updateRights",
      type: "post",
      flag: 1
    },
    removePageType: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/web_page/_delete",
        method: "post",
        query: {
          _id: ""
        },
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    removeSiteType: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/website/_delete",
        method: "post",
        query: {
          _id: ""
        },
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    addWebPageType: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/web_page",
        method: "put",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    addWebsiteType: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/website",
        method: "put",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        }
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    websiteType: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/website",
        query: {

        },
        start: 0,
        limit: 100
      },
      requestType: "get",
      dataType: "json",
      flag: 1
    },
    webPageType: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/web_page",
        query: {

        },
        start: 0,
        limit: 100
      },
      requestType: "get",
      dataType: "json",
      flag: 1
    },
    updateConfig: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/livingConfig/_update",
        set: {
          password: ""
        },
        query: {
          _id: ""
        },
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "post"
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    paramsConfig: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/livingConfig",
        query: {

        },
        start: 0,
        limit: 100
      },
      requestType: "get",
      dataType: "json",
      flag: 1
    },
    modifyPass: {
      url: "gateway",
      query: {
        url: "http://" + host + "/common-rest/store/v2.1/aw/livingConfig/_update",
        set: {
          node_live_days: ""
        },
        query: {
          _id: ""
        },
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "post"
      },
      flag: 1,
      requestType: "get",
      dataType: "json"
    },
    exportLog: {
      url: "updateRights",
      type: "post",
      flag: 1
    },
    mongoTest: {
      url: "mongodb",
      type: "get",
      flag: 1,
      query: {
        source: "user",
        query: {

        }
      }
    },
    mongoTest1: {
      url: "http://" + eHost + "/idata/v1.0/id/_search",
      type: "get",
      flag: 1,
      query: {
        source: "test",
        query: {

        }
      }
    },
    passwordCode: {
      url: "gateway",
      query: {
        url: "http://" + eHost + "/idata/v1.0/hash/get",
        q: "",
        headers: {
          userId: webCpu.logined,
          token: "123456"
        },
        method: "get",
      },
      type: "get",
      flag: 1,
    },
    exportExcel: {
      url: "mongodb",
      type: "get",
      flag: 1,
    }
};
// webCpu.iframeProxy = {
//   test: "http://10.60.1.99:8001/static/tMicro.html"
// }

webCpu.app = {
  pageList: {
    "key": 'golaxy_newsItems',
    "url": "product/golaxy_newsItems.js",
    "interface": "comprehensiveSearch",
    "filter": {

    },
    "callback": function (c, d, t) {
      d.foot = "-";
      d.task.option = d.task.option || {};
      d.task.option.page = d.task.option.page || {
        "total": 0,
        "size": 50,
        "current": 1
      };
      d.task.pageCallback = function (n, size) {
        this.query = this.query || {};
        var dsl = this.query.dsl || "{}";
        dsl = JSON.parse(this.query.dsl);
        dsl.from = n;
        dsl.size = size || 10;
        this.query.dsl = JSON.stringify(dsl);
        webCpu.render("ListGroup", this);
      }
      d.task.option.style.background = "rgba(0, 0, 0, 0.6)";
      d.task.promise.beforeRender = function (cc, dd, tt) {
        tt.tData = dd.data || [];
        if (dd.data) {
          tt.option.page = {
            "total": dd.data.total,
            "size": dd.data.size,
            "current": dd.data.from
          }
        }

        tt.tData.topicList = tt.tData.topicList || [];

        tt.data = tt.tData.topicList.map(function (item) {

          var d = {
            title: (item.titleTranslation || item.title || item.url),
            lang: item.lang,
            name: (item.titleTranslation || item.title || item.url),
            id: item.id,
            url: item.url,
            description: item.url + " (<span> 入库时间: 2020年11月12日</span>)"
          };

          return d;
        });
      }
      d.task.promise.afterRender = function (cc, dd, tt) {
        $(cc).find(".list-group-item").find("button").on("click", function (e) {
          webCpu.cards.mainAreaItem.task.displayRelatedPageList("测试Domain");
          e.preventDefault();
          return false;
        })
        $(cc).find(".list-group-item").find("select").on("click", function (e) {
          e.preventDefault();
          return false;
        })
        $(cc).find(".list-group-item").on("click", function () {
          var index = $(this).attr("index");
          webCpu.interface.pageDetail.query.dsl.query.term.url = dd[index].url;
          console.log(dd[index]);
          var card = {
            task: {
              url: webCpu.interface.pageDetail.url,
              query: webCpu.interface.pageDetail.query,
              template: "",
              checkTimeout: function (n) {
                // var c = card.task.container;
                setTimeout(function () {
                  var tLen = $(card.task.container).find(".TemplateItem>div").length;
                  tLen = tLen || $(card.task.container).find(".TemplateItem>main").length;
                  if (tLen === 0) {
                    webCpu.CardItem.switchMask(card, "html", "<span style='font-weight: 800; color: red;'>加载网页失败</span>");
                  }
                }, n || 1000);
              },
              promise: {
                beforeRender: function (c, d, t) {
                  if (d && d.data && d.data.data && d.data.data[0] && d.data.data[0]._source) {
                    var image = d.data.data[0]._source.image;
                    var html = d.data.data[0]._source.html;
                    for (var i = 0; i < image.length; i++) {
                      var img = image[i].image_name.replace(/\-{5}/g, ".").replace(/\-{2}/g, "/");
                      img = img.replace(/.jpg$/, "");
                      // img = img.replace(/^\//, "");
                      html = html.replace(img, "http://" + image[i].url);
                    }
                    // var encode = encodeURIComponent(html);
                    // var base64 = btoa(encode);
                    // var base64 = btoa(html);
                    // var url = "data:text/html;charset=UTF-8;base64," + base64;
                    t.template = html;
                  }
                },
                afterRender: function (c, d, t) {

                }
              },
              requestType: "get",
              dataType: "json"
            }
          }
          webCpu.CardItem.dialog(card, {
            title: dd[index].name,
            size: "1200px",
            height: "800px"
          });

          card.task.checkTimeout(30000);

        });
      }
    }
  },
  lineChart: {
    url: "product/golaxy_line.js",
    key: "golaxy_line",
    interface: "topicDataTrend"
  }
}

webCpu.commonTool = {
  initOptions: function (selector, options) {
    $("<option value='-'>未知</option>").appendTo(selector);
    for (var k in options) {
      if (k) {
        $("<option value='" + k + "'>" + options[k] + "</option>").appendTo(selector);
      }
    }
  }
}