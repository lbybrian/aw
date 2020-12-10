(function () {
  var config = {
    html: "layout.html",
    css: "style.css"
  }
  console.log('00000000000Carditem',webCpu)
  webCpu.regComponent("CardItem", config, function (container, data, task) {
    if (!data.title) {
      $(container).find(".CardItem_titleArea").hide();
      $(container).find("._CardItem_componentArea").css("top", "0px");
    }
    if (data.border && (webCpu.cards && webCpu.cards.transweb && webCpu.cards.transweb.task.current === "preview")) {
      $(container).css("border", data.border);
    }
    if (data.padding && (webCpu.cards && webCpu.cards.transweb && webCpu.cards.transweb.task.current === "preview")) {
      $(container).children(".CardItem_contentArea").css("padding", data.padding);
    }
    if (data.background) {
      $(container).children(".CardItem_contentArea").css("background", data.background);
    }

    if (data.position) {
      $(container).css("position", data.position);
    }

    if (data.overflow) {
      $(container).children(".CardItem_contentArea").children(".CardItem_content").children("._CardItem_componentArea").children(".CardItem_componentArea").css("overflow", data.overflow);
    }

    if (!task.unit || ($(container.parentNode).attr("flag") === "activeArea")) {
      $(container).css("width", "100%");
      $(container).css("height", "100%");
    } else {
      if (!data.size) {
        data.size = [Math.ceil(webCpu.layout.options.width / 3), Math.ceil(webCpu.layout.options.height / 3)];
      }

      var tWidth = data.size[0] * task.unit[0];
      var tHeight = data.size[1] * task.unit[1];
      if (webCpu.cards.transweb.task.current !== "preview") {
        tWidth -= 2;
        tHeight -= 2;
      }
      $(container).css("width", tWidth);
      $(container).css("height", tHeight);
      if (data.target) {
        for (var k in data.target) {
          if (data.target[k] === "center" && (k === "left" || k === "right")) {
            data.target[k] = $(container.parentNode).width() / 2 - $(container).width() / 2;
          }
          if (data.target[k] === "center" && (k === "top" || k === "bottom")) {
            data.target[k] = $(container.parentNode).height() / 2 - $(container).height() / 2;
          }
          if (k === "left" || k === "marginLeft") {
            $(container).css(k, data.target[k] * task.unit[0]);
          }

          if (k === "top" || k === "marginTop") {
            $(container).css(k, data.target[k] * task.unit[1]);
          }
        }
      }
    }
    data.task = data.task || {};
    data.className = data.className || "TemplateItem";
    $(container).find(".CardItem_componentArea").attr("mouldName", data.className);
    data.task.container = $(container).find(".CardItem_componentArea")[0];
    data.task.cardName = data.cardName || "anonymous";
    if (data.task.busIn && data.cardName) {
      webCpu.CardItem.message = webCpu.CardItem.message || {};
      webCpu.CardItem.message[data.cardName] = webCpu.CardItem.message[data.cardName] || {}
    }



    webCpu.CardItem.fresh(data);

    if (data.style) {
      $(container).css(data.style);
    }


    if (data.cardName) {
      $(container).attr("cardName", data.cardName);
    }
    data.task.cardBody = container;

    if (task.mode === "edit") {
      $(container).find(".CardItem_modifyArea").show();
      $(container).find(".CardItem_mask").hide();
    } else if (task.mode === "freeze") {
      $(container).find(".CardItem_modifyArea").hide();
      $(container).find(".CardItem_mask").show();
    } else {}
  });

  webCpu.CardItem.message = {};
  webCpu.CardItem.tips = {
    empty: "暂无数据",
    loading: "正在加载",
    error: "出现异常"
  }

  webCpu.CardItem.switchMask = function (data, state, n) {
    webCpu.CardItem.switchMaskStyle(data, {
      width: "100%",
      height: "100%",
      top: "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    });
    webCpu.CardItem._switchMask(data, state, n);
  }
  webCpu.CardItem._switchMask = function (data, state, n) {
    var task = data.task || data;
    if (!task.cardBody) {
      return false;
    }
    var t = $(task.cardBody).children(".CardItem_stateTemplate");
    var c = ".CardItem_template_" + state;
    var tips = this.tips[state];
    if (data.tips && data.tips[state]) {
      tips = data.tips[state];
    }
    var str = t.find(c).val();
    var mask = $(task.cardBody).children().children(".CardItem_mask");

    mask.html(str);

    mask.find(".CardItem_stateTips").html(tips);
    if (typeof (n) === "number") {
      setTimeout(function () {
        mask.hide();
      }, n * 1000);
    } else if (typeof (n) === "object" && n.task) {
      n.container = mask[0];
      webCpu.render(n.className || "TemplateItem", n.task);
    } else if (typeof (n) === "object" && !n.task) {
      if (n.type === "message") {
        mask.find(".btn-default").hide();
      }
      if (n.rightBtnName) {
        mask.find(".btn-default").html(n.rightBtnName);
      }
      if (n.leftBtnName) {
        mask.find(".btn-primary").html(n.leftBtnName);
      }
      if (n.message) {
        if (state !== "loading") {
          mask.html(n.message);
        } else {
          mask.children().children(".CardItem_stateTips").html(n.message);
        }

      }
    } else if (n !== undefined) {
      if (state !== "loading") {
        mask.html(n);
      } else {
        mask.children().children(".CardItem_stateTips").html(n);
      }
    } else {}
    mask.show();
    return mask[0];
  }

  webCpu.CardItem.switchMaskStyle = function (data, style) {
    var task = data.task || data;
    if (task.cardBody) {
      var mask = $(task.cardBody).children(".CardItem_contentArea").children(".CardItem_mask");
      for (var k in style) {
        mask.css(k, style[k]);
      }
    }
  }

  webCpu.CardItem.setForbidArea = function (data, tips, style) {
    webCpu.CardItem.switchMaskStyle(data, style);
    webCpu.CardItem._switchMask(data, "html", "");
    var task = data.task || data;
    if (task.cardBody) {
      var mask = $(task.cardBody).children(".CardItem_contentArea").children(".CardItem_mask");
      mask.attr("title", tips);
    }
  }

  webCpu.CardItem.cancelForbidArea = function (data) {
    if (!data) {
      return false;
    }
    webCpu.CardItem.dismissMask(data);
    var task = data.task || data;
    if (task.cardBody) {
      var mask = $(task.cardBody).children(".CardItem_contentArea").children(".CardItem_mask");
      mask.attr("title", "");
    }
  }

  webCpu.CardItem.dismissMask = function (data) {
    if (!data) {
      return false;
    }
    var task = data.task || data;
    if (task.cardBody) {
      var tipsArea = $(task.cardBody).children(".CardItem_contentArea").children(".CardItem_mask");
      tipsArea.hide();
    }
  }

  webCpu.CardItem.updateConfig = function (data, interface) {
    var config = interface;
    if (typeof (interface) === "string" && webCpu.interface && webCpu.interface[interface]) {
      config = webCpu.interface[interface];
    }
    this._updateConfig(data, config);
  }

  webCpu.CardItem._updateConfig = function (data, config, params) {
    var t = data.task || data;
    if (config && config.data && !config.url) {
      t.url = "";
    }
    //update the render task params
    params = params || ["url", "data", "requestType", "iframeProxy", "dataType", "query", "option", "dsl"];
    for (var k in config) {
      if (params.indexOf(k) !== -1) {
        if (k === "option") {
          t.option = t.option || {};
          for (var j in config.option) {
            t.option[j] = config.option[j];
          }
        } else {
          t[k] = config[k];
        }
      }
    }
  }

  webCpu.CardItem.checkData = function (data) {
    var ret = true;
    if (!data) {
      ret = false;
    } else if (data.constructor.name === "Array" && data.length === 0) {
      ret = false;
    } else if (data.data && data.data.length === 0) {
      ret = false;
    } else if (data.records && data.records.length === 0) {
      ret = false;
    } else {}
    return ret;
  }


  webCpu.CardItem.switchState = function (data, state) {
    if (!data) {
      return false;
    }
    var t = data.task || data;
    if (!t.container) {
      return false;
    }
    var elem = $(t.container).parent().parent().parent().parent().find(".CardItem_stateTemplate");
    var c = ".CardItem_template_" + state;
    var tips = this.tips[state];
    if (data.tips && data.tips[state]) {
      tips = data.tips[state];
    }
    var str = elem.find(c).val();
    var tipsArea = $(t.container);
    tipsArea.html(str);
    tipsArea.find(".CardItem_stateTips").html(tips);
  }

  webCpu.CardItem.leftCardDialog = function (card, objectCard, title, w, style, callback1, callback2) {
    var task = card.task || card;
    var w = w || 200;
    if (!task.cardBody) {
      return false;
    }
    var tParam = callback1;
    if (typeof (tParam) === "function") {
      tParam = {
        callback: callback1
      }
    }

    var maskSelector = $(task.cardBody).children(".CardItem_contentArea").children(".CardItem_mask");
    var htmlString = "<div class='cardDialogArea' style='position: relative; width: 100%; height: 100%;'>\
                        <div style='float: left; position:relative; height: 100%; overflow:auto; top: 0px; bottom:0px;' class='maskContentArea'></div>\
                        <div class='dialogBlankArea' style='float; left; position:relative; height: 100%; top: 0px; bottom: 0px; margin-left:0px; margin-right: 0px;'></div>\
                      </div>";
    maskSelector.html(htmlString);
    style = style || {
      "float": "left",
      "width": w
    };
    style.position = "relative";
    style.float = style.float || "right";
    style.width = style.width || w;
    var _self = this;
    var cSelector = maskSelector.find(".maskContentArea");
    for (var k in style) {
      cSelector.css(k, style[k]);
    }
    maskSelector.find(".dialogBlankArea").css("width", "calc( 100% - " + w + "px )");

    maskSelector.show();
    maskSelector.find(".dialogBlankArea").on("click", function () {
      _self.dismissMask(card);
      if (typeof (tParam.closeCallback) === "function") {
        tParam.closeCallback();
      }
    });
    if (objectCard) {
      var mArea = cSelector[0];
      webCpu.addCardItem(mArea, objectCard, {
        key: tParam.key || "transweb_cn",
        callback: function (c0, d0, c0) {
          if (typeof (tParam.callback) === "function") {
            tParam.callback(c0, d0, c0);
          }
          d0.title = objectCard.title || title;
          d0.titleHeight = 40;
        }
      }, function (c, d, t) {
        if (typeof (callback2) === "function") {
          callback2(c, d, t);
        }
        var tSlector = $(d.task.cardBody).children(".CardItem_contentArea").children(".CardItem_content").children(".CardItem_titleArea");
        tSlector.css("padding-top", "8px");
        tSlector.on("click", function () {
          _self.dismissMask(card);
        });
      });

    }
  }


  webCpu.CardItem.maskDialog = function (card, objectCard, title, option, style) {
    var pCardName = card.cardName;
    // var task = card.task || card;
    var maskCard = {
      cardName: "transwebMaskCard",
      task: {
        option: option,
        promise: {
          afterRender: function (mc, md, mt) {
            webCpu.addCardItem(mc, objectCard, {
              key: mt.option.key || mt.option || "transweb",
              callback: function (c, d, t) {
                if (typeof (option.callback) === "function") {
                  option.callback(c, d, t);
                }
                card.maskDialogCard = d;
                var storage = window.localStorage;
                if (webCpu.cards.transwebCms && webCpu.cards.transwebCms.task.logined) {
                  storage.transwebLogined = webCpu.cards.transwebCms.task.logined;
                }
                if (d.cardName === "transwebSignIn" || d.cardName === "transwebCms") {
                  return false;
                }

                if (d.cardName === "transwebArticleViewer" && pCardName === "transwebView") {
                  storage.transwebType = "markdown";
                  storage.transwebData = d.task.data;
                } else if (d.cardName !== "output" && pCardName === "transwebView") {
                  storage.transwebType = "js";
                  storage.transwebData = WebTool.objectToString(d);
                } else {

                }

              }
            }, function (c1, d1, t1) {
              d1.task.maskCard = maskCard;
            });
          }
        }
      }
    }
    this._maskDialog(card, maskCard, title, style);
  }

  webCpu.CardItem._maskDialog = function (card, objectCard, title, style) {
    var h = h || 40;
    var htmlString = "<div class='dialogContent' style='position: relative;  width: 100%; height: 100%; display: inline-block;'>\
                        <div style='position:relative; display: inline-block;  background-color: #fff; overflow:auto; width: 100%; height:" + h + "px; text-align: center;'>\
                          <span style='position: absolute; left: 0px; top: 50%; margin-top: -11px; display: inline-block; width: 50px; padding: 2px; vertical-align: middle; text-align: center; cursor: pointer;' class='glyphicon glyphicon-chevron-left'></span>\
                          <span style='position: absolute; left: 60px; top: 50%; margin-top: -11px; width: calc( 100% - 120px ); display: inline-block; padding: 2px; vertical-align: middle; text-align: center; '>" + title + "</span>\
                        </div>\
                        <div style='float: left; position:absolute; overflow:auto; width: 100%; top: " + h + "px; bottom:0px;' class='tipsStringArea'></div>\
                      </div>";
    var task = card.task || card;
    if (!task.cardBody) {
      return false;
    }
    var maskSelector = $(task.cardBody).children(".CardItem_contentArea").children(".CardItem_mask");
    maskSelector.html(htmlString);

    if (style) {
      maskSelector.find(".dialogContent").css(style);
    }

    var supports = ["js", "txt", "md"];

    maskSelector.show();

    var _self = this;
    maskSelector.find(".glyphicon-chevron-left").on("click", function () {
      _self.dismissMask(card);
    });
    if (objectCard) {
      var mArea = maskSelector.find(".tipsStringArea")[0];
      card.maskDialogCard = objectCard;
      if (typeof (objectCard) === "string") {
        var sub = getSubfix(objectCard);
        if (supports.indexOf(sub) === -1 && webCpu.cards.previewTool) {
          var _objectCard = WebTool.copyObject(webCpu.cards.previewTool);
          _objectCard.task.option.url = objectCard;
          objectCard = _objectCard;
        }
      }
      webCpu.addCardItem(mArea, objectCard, null, function (c, d, t) {
        card.maskDialogCard = d;
      });
    }
  }
  webCpu.CardItem.previewCard = function (container, card, size) {
    if (!webCpu.cards.previewTool) {
      return false;
    }
    webCpu.cards.previewTool.task.size = size;
    webCpu.cards.previewTool.task.card = card;
    webCpu.addCardItem(container, webCpu.cards.previewTool);
  }


  webCpu.CardItem.fresh = function (data, interface) {
    webCpu.CardItem.updateCardLayout(data);
    if (!data.inactive) {
      webCpu.CardItem._fresh(data, interface);
    } else if (data.sketch) {
      $(data.task.container).html('<div class="CardItem_sketch"><img src="#" /></div>');
      $(data.task.container).find(".CardItem_sketch>img").attr("src", data.sketch);
      $(data.task.container).find(".CardItem_sketch>img").attr("alt", data.title || data.cardName);
    } else {}
  }

  webCpu.CardItem._fresh = function (data, interface) {
    var t = data.task || data;
    webCpu.CardItem.switchState(t, "loading");
    webCpu.CardItem.updateConfig(data, interface);
    webCpu.render(data.className || "TemplateItem", t, data.componentPath || this.config.path);

  }

  webCpu.CardItem.createMenuItem = function (menu, flag, temp) {
    var nav = $('<ul class="nav navbar-nav"></ul>');
    for (let k in menu) {
      if (temp && !menu[k].fixed && !menu[k].auth) {
        continue;
      }
      var name = menu[k].name || menu[k];
      var item = $('<li level=1 key="' + menu[k].key + '"  ><a index=' + k + ' path="' + menu[k].path + '" href="#">' + name + '</a></li>');
      if (menu[k].children) {
        item = $('<li key="' + menu[k].key + '"  class="dropdown"><a level=1 index=' + k + ' class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" \
                            aria-haspopup="true" aria-expanded="false">' + name + '<span class="caret"></span> </a> \
                            <ul class="dropdown-menu"></ul> \
                        </li>');
        var tList = item.children(".dropdown-menu");
        if (flag === "right") {
          tList.addClass("dropdown-menu-right");
        }
        for (let i in menu[k].children) {
          var tItem = menu[k].children[i];
          var mItem = $('<li value="' + tItem.value + '" title="' + tItem.name + '" ><a index="' + (k + '.' + i) + '" path="' + tItem.path + '" href="#">' + tItem.name + '</a></li>');
          mItem.appendTo(tList);
        }
        tList.appendTo(item);
      }
      item.appendTo(nav);
    }
    return nav;
  }

  webCpu.CardItem.updateCardLayout = function (data) {
    if (!data.task || !data.task.container || !data.task.container.parentNode) {
      return false;
    }
    var container = data.task.container.parentNode.parentNode;
    if (!data.title && !data.titleMenu && !data.titleMenu && !data.titleData && !data.breadcrumb) {
      $(container).children(".CardItem_titleArea").hide();
      $(container).children("._CardItem_componentArea").css("padding-top", "0px");
    } else {
      var tData = data.titleData || data;
      if (typeof (tData.titleHeight) === "number" || typeof (tData.titleHeight) === "string") {
        var h = tData.titleHeight;
      } else {
        h = 40;
      }

      $(container).children("._CardItem_componentArea").css("padding-top", h);
      $(container).children(".CardItem_titleArea").css("height", h);
      $(container).children(".CardItem_titleArea").show();
      var titleSelector = $(container).children(".CardItem_titleArea").children(".CardItem_title");
      data.task.titleArea = titleSelector[0];
      if (data.titleMenu && data.titleMenu.constructor.name === "Array") {
        titleSelector.html("");
        for (var i = 0; i < data.titleMenu.length; i++) {
          var menuItem = data.titleMenu[i];
          var value = menuItem.text || menuItem;
          if (menuItem.data) {
            value = value.bindData(menuItem.data);
          }
          var item = $('<div style="float: left; height: 100%; width: ' + 100 / data.titleMenu.length + '%; display: flex; flex-wrap: wrap; justify-content:center; align-items:center;">' + value + '</div>')
          item.appendTo(titleSelector);
          if (typeof (menuItem.action) === "function") {
            item.on("click", menuItem.action);
          }
        }
      } else if (data.titleData) {
        titleSelector.html("");
        if (data.titleData.title) {
          var t = $('<div class="navbar-header"><a class="navbar-brand" href="#">' + data.titleData.title + '</a></div>');
          t.appendTo(titleSelector)
        }
        if (data.titleData.menu || data.titleData.leftMenu) {
          var menu = data.titleData.menu || data.titleData.leftMenu;
          var nav = webCpu.CardItem.createMenuItem(menu, "left", true);
          var clickCallback = function (e) {
            var elem = e.target;
            var path = $(elem).attr("path");
            if (!path) {
              path = $(elem.parentNode).attr("path");
            }
            if (path && webCpu.cards && webCpu.cards.main) {
              webCpu.cards.main.task.switchModule(path);
            }
          }
          nav.appendTo(titleSelector);
          nav.find("li>a").on("click", clickCallback);
        }
        if (data.titleData.rightMenu) {
          var menu = data.titleData.rightMenu;
          var nav = webCpu.CardItem.createMenuItem(menu, "right");
          nav.appendTo(titleSelector);
          nav.find("li>a").on("click", function (e) {
            var index = $(this).attr("index");
            var iArr = index.split(".");
            if (iArr.length == 1 && menu[index].callback) {
              menu[index].callback(menu[index]);
            } else if (iArr.length == 2 && menu[iArr[0]] && menu[iArr[0]].children && menu[iArr[0]].children[iArr[1]]) {
              var tCallback = menu[iArr[0]].children[iArr[1]].callback;
              if (typeof (tCallback) === "function") {
                tCallback(menu[iArr[0]].children[iArr[1]]);
              }
            }
          });
          nav.css({
            position: "absolute",
            right: "0px"
          });
        }
        if (data.titleData.style) {
          titleSelector.css(data.titleData.style);
        }

      } else if (data.breadcrumb) {
        titleSelector.html("");
        var bSelector = $('<ol class="breadcrumb"></ol>');
        for (var k = 0; k < data.breadcrumb.length; k++) {
          if (!data.breadcrumb[k]) {
            continue;
          }
          var text = data.breadcrumb[k].text || data.breadcrumb[k];
          var item = $('<li>' + text + '</li>');
          if (data.breadcrumb[k].href) {
            var target = data.breadcrumb[k].target || "_blank";
            item = $('<li><a target="' + target + '" href="' + data.breadcrumb[k].href + '">' + text + '</a></li>')
          }
          item.appendTo(bSelector);
          if (data.breadcrumbStyle) {
            item.css(data.breadcrumbStyle);
          }
        }
        bSelector.appendTo(titleSelector);

      } else if (data.title) {
        titleSelector.html(data.title);
      } else {}

      if (data.titleStyle) {
        titleSelector.css(data.titleStyle);
      }
      titleSelector.parent().css("overflow", "visible")
    }

    if (!data.foot && !data.footMenu) {
      $(container).children(".CardItem_footArea").hide();
      $(container).children("._CardItem_componentArea").css("padding-bottom", "0px");

    } else {
      var h = data.footHeight || 40;
      $(container).children(".CardItem_footArea").css("height", h);
      $(container).children("._CardItem_componentArea").css("padding-bottom", h);
      data.task.footArea = $(container).children(".CardItem_footArea")[0];
      if (data.footMenu && data.footMenu.constructor.name === "Array") {
        $(container).children(".CardItem_footArea").html("");
        for (var i = 0; i < data.footMenu.length; i++) {
          var menuItem = data.footMenu[i];
          var value = menuItem.text || menuItem;
          if (menuItem.data) {
            value = value.bindData(menuItem.data);
          }
          var item = $('<div style="float: left; height: 100%; width: ' + 100 / data.footMenu.length + '%; display: flex; flex-wrap: wrap; justify-content:center; align-items:center;">' + value + '</div>')
          item.appendTo($(container).children(".CardItem_footArea"));
          if (typeof (menuItem.action) === "function") {
            item.on("click", menuItem.action);
          }
        }
      }

      $(container).children(".CardItem_footArea").show();
    }


    if (data.footStyle) {
      $(container).children(".CardItem_footArea").css(data.footStyle);
    }


  }

  webCpu.CardItem.recoverCard = function (data) {
    if (data.task._data) {
      data.task.data = WebTool.copyObject(data.task._data);
    }
    data.task._url = data.task.url;
    delete data.task.url;
    data.inactive = false;
    // task.data.task.container.innerHTML = "";
    webCpu.render(data.className || "TemplateItem", data.task, data.componentPath || this.config.path);
    data.task.url = data.task._url;
  }

  webCpu.CardItem.CommonStyle = {
    width: "100%",
    height: "100%",
    "border-radius": "5px"
  }

  webCpu.CardItem.cardDialog = function (card, objectCard, title, options, param, dealName, callback) {
    var pCardName = card.cardName;
    param = param || {};
    if (typeof (param) === "function") {
      param = {
        callback: param
      }
    } else if (typeof (param) === "string") {
      param = {
        key: param
      }
    } else {}
    options = options || this.CommonStyle;

    var _options = {
      callback: function (elem) {
        var tipsStringArea = $(elem).find(".tipsStringArea");
        var titleArea = $(elem).find(".dialogTopArea")[0];
        var tArea = tipsStringArea.parent();
        for (var k in options) {
          tArea.css(k, options[k]);
        }
        tipsStringArea.css("width", "100%");
        tipsStringArea.css("height", "calc( 100% - 40px )");
        tipsStringArea.css("padding", "0px");
        $(elem).find(".confirmArea").hide();

        var maskCard = {
          cardName: "transwebMaskCard",
          task: {
            titleArea: titleArea,
            promise: {
              afterRender: function (mc, md, mt) {
                webCpu.addCardItem(mc, objectCard, {
                  key: param.key,
                  interface: param.interface || "",
                  callback: function (c, d, t) {
                    t.maskTitle = mt.titleArea;
                    //update dialog top area
                    for (let k in card.task.dialogMenu) {
                      let menuText = "<li title='{{name}}' style='color: #999; padding: 5px 10px; box-shadow: -1px 0px 0px inset #f2f2f2;'><label style='margin:0px; padding:0px;'><span style='padding: 0 3px;'>{{name}}</span>(<span style='padding: 0 2px;'>{{value}}</span>)</label></li>";
                      let menuItem = card.task.dialogMenu[k];
                      if (menuItem && menuItem.text) {
                        menuText = menuItem.text;
                      }
                      let menuData = menuItem.data || menuItem;
                      let text = menuText.bindData(menuData);
                      let itemSelector = $(text);
                      itemSelector.appendTo($(t.maskTitle).find(".dealDialogArea"));
                      $(t.maskTitle).find(".dealDialogArea").find(".dialogTitleArea").remove();
                      if (menuData.active && menuItem.activeStyle) {
                        itemSelector.children().css(menuItem.activeStyle);
                      }
                    }

                    if (typeof (param.callback) === "function") {
                      param.callback(c, d, t);
                    }
                    card.maskDialogCard = d;
                    var storage = window.localStorage;
                    if (webCpu.cards.transwebCms && webCpu.cards.transwebCms.task.logined) {
                      storage.transwebLogined = webCpu.cards.transwebCms.task.logined;
                    }
                    if (d.cardName === "transwebSignIn" || d.cardName === "transwebCms") {
                      return false;
                    }

                    if (d.cardName === "transwebArticleViewer" && pCardName === "transwebView") {
                      storage.transwebType = "markdown";
                      storage.transwebData = d.task.data;
                    } else if (d.cardName !== "output" && pCardName === "transwebView") {
                      storage.transwebType = "js";
                      storage.transwebData = WebTool.objectToString(d);
                    } else {

                    }

                  }
                }, function (c1, d1, t1) {
                  if (typeof (callback) === "function") {
                    callback(c1, d1, t1);
                  }
                });
              }
            }
          }
        }

        webCpu.addCardItem(tipsStringArea[0], maskCard)
      },
      tipsTitle: title,
      leftButton: dealName,
      closeDisabled: options.closeDisabled,
      closeCallback: param.closeCallback
    }

    this.showTips(card, "", callback, _options, {
      height: "100%"
    });
  }

  webCpu.CardItem.configDialog = function (card, title, params, callback, width) {
    var cParam = callback || {};
    if (typeof (callback) === "function") {
      cParam = {
        callback: callback
      }
    }
    var task = card.task || card;
    var options = {
      confirm: "确认",
      default: "取消",
      callback: function (elem) {
        var tipsStringArea = $(elem).find(".tipsStringArea");
        var w = width || "300px";
        tipsStringArea.parent().css("width", w);
        tipsStringArea.css("padding", "10px 0px 10px 0px");
        task.inputTask = {
          container: tipsStringArea[0],
          data: params,
          taskType: "multi",
          init: cParam.init,
          promise: {
            afterRender: function (container, data, task) {
              $(container).find("input:eq(0)").focus();
              if (typeof (task.init) === "function") {
                task.init(container, data, task);
              }
            }
          }
        }
        webCpu.render("FormItem", task.inputTask);
      },
      tipsTitle: title
    }
    this.showTips(card, "", cParam.callback, options);
  }

  webCpu.CardItem.showTips = function (mCard, str, callback, options, style) {
    var card = mCard.task || mCard;
    if (!card.cardBody) {
      return false;
    }
    var style = style || {
      height: "auto"
    }
    webCpu.CardItem.switchMask(card, "html",
      '<div style="text-align: center; width: auto; min-width: 200px; position: relative; padding: 10px; border-radius: 5px; background-color: rgba(0, 0, 0, 0.2);" class="confirmDialog">\
            <div class="dialogTopArea" style="position: relative; width: 100%; height: 40px; display: flex; align-items: center;"><ul class="nav nav-pills dealDialogArea"></ul>\
                <label class="dialogTitleArea" style="position: absolute; margin: 0px; display: inline-block; padding: 2px; vertical-align: middle; text-align: left; "></label></div>\
            <button title="关闭" style="position: absolute;z-index: 9; color: #000; right: 10px; top: 10px;" type="button" class="close" ><span style="font-size: 25px; " aria-hidden="true" class="glyphicon glyphicon-remove-circle"></span><span class="sr-only">Close</span></button>\
            <p class="tipsStringArea"></p>\
            <p class="confirmArea"><button style="margin-right: 10px;" class="btn btn-primary btn-sm" role="button">确认</button><button class="btn btn-default btn-sm" role="button">取消</button></p>\
        </div>'
    );
    var mask = $(card.cardBody).children().children(".CardItem_mask");
    mask.find(".tipsStringArea").html(str);
    mask.find(".confirmDialog").css(style);
    mask.find(".tipsStringArea").css({
      "padding": "20px 0px 20px 0px",
      "max-height": "calc( 100% - 50px )"
    });

    mask.find(".btn-primary").on("click", function () {
      webCpu.CardItem.dismissMask(card);
      if (typeof (callback) === "function") {
        callback(card);
      }
    })
    mask.find(".btn-default").on("click", function () {
      webCpu.CardItem.dismissMask(card);
    });
    mask.find(".close").on("click", function () {
      webCpu.CardItem.dismissMask(card);
      window.onkeydown = "";
      window.onkeypress = "";
      window.onkeyup = "";
      $(window).off("keydown");
      $(window).off("keyup");
      $(window).off("keypress");
      // setShortcutKey(window, ["metaKey", "83"], function (e) {});

      if (options && typeof (options.closeCallback) === "function") {
        options.closeCallback();
      }

      if (mCard.maskDialogCard) {
        var arr = webCpu._audioArr;
        for (var k in arr) {
          arr[k].pause();
        }
        webCpu._audioArr = [];
        delete mCard.maskDialogCard;
      }
    });
    if (options) {
      if (options.confirm) {
        mask.find(".btn-primary").html(options.confirm);
      } else {
        mask.find(".btn-primary").html(options.confirm).hide();
      }

      if (options && options.closeDisabled) {
        mask.find(".close").hide();
      }

      if (options.default) {
        mask.find(".btn-default").html(options.default);
      } else {
        mask.find(".btn-default").hide();
      }
      if (options.leftButton) {
        mask.find(".dealDialogArea").html(options.leftButton);
      } else {
        mask.find(".dealDialogArea").hide();
      }

      if (options.defaultCallback) {
        mask.find(".btn-default").off("click");
        mask.find(".btn-default").on("click", options.defaultCallback);
      }
      if (typeof (options.callback) === "function") {
        options.callback(mask[0]);
      }
      if (options.tipsTitle) {
        mask.find(".confirmDialog .dialogTitleArea").html(options.tipsTitle);
      }
    }
    mask.find(".tipsStringArea input:eq(0)").focus();

    return mask[0];
  }

  webCpu.CardItem.confirmRequest = function (adapter, condition, card, title, callback, style) {
    this.showTips(card, title, function () {
      adapter(condition, function (ret) {
        if (typeof (callback) === "function") {
          callback(ret);
        }
      });
    }, {
      tipsTitle: "提示",
      confirm: "确认",
      default: "取消"
    }, style || {
      width: "400px",
      height: "200px"
    });
  }

  webCpu.CardItem.dialog = function (data, options, closePromise) {
    var options = options || {};
    webCpu.render("ModalDialog", function () {
      var task = {
        data: data
      }

      if (typeof (closePromise) === "function") {
        task.promise = {
          closeDialog: closePromise
        }
      }

      var t = {
        container: data.task.container
      };
      $("#tModalDialog").attr("state", "previewCardItem");
      webCpu["ModalDialog"].displayComponent(options.title || "", "CardItem", task, options);
      task.data.task.container = t.container;
      task = null;
    });
  }



  webCpu.CardItem.Pagination = function (container, total, number, current, callback, flag) {
    this.container = container;
    this.total = total || 0;
    if (flag) {
      this.total = 100000000;
    }
    this.size = number || 10;
    this.flag = flag;
    this.count = Math.ceil(this.total / (this.size));
    this.current = current || 1;
    this.container.innerHTML = "";
    this.callback = callback;
    var nav = document.createElement("nav");
    this.container.appendChild(nav);

    $(nav).css({
      "line-height": "40px"
    })
    this.ul = document.createElement("ul");
    this.ul.setAttribute("class", "pagination pagination-sm");
    var label = document.createElement("div");
    if (this.count < 1000) {
      label.innerHTML = '<label class="goToPageItem" style="float: left; margin-right: 5px; margin-bottom: 0px;"><span>前往</span>\
                        <select value=' + current + ' class="pageNumber form-control input-sm" style="width: auto;display: inline-block; color: #999; padding: 0px 5px;"></select>页</label> \
                        <label style="margin-bottom: 0px;"><span>每页</span><select value=' + number + ' class="pageSize form-control input-sm" style="width: auto;display: inline-block; color: #999; padding: 0px 5px;"></select>条</label> \
                        <label class="totalItemInfo" style="margin-bottom: 0px;"> 总条数: <span class="countValue">' + total + '</span>条</label>'

    } else {
      label.innerHTML = '<label class="goToPageItem" style="float: left; margin-right: 5px;"><span>前往</span>\
                        <input value=' + (this.current) + ' class="pageNumber form-control input-sm" style="width: auto;display: inline-block; color: #999; padding: 0px 5px; width: 60px;"/>页 \
                        <button style="margin: 0 10px;" class="confirmJumpBtn btn btn-primary">跳转</button></label> \
                        <label><span>每页</span><select value=' + number + ' class="pageSize form-control input-sm" style="width: auto;display: inline-block; color: #999; padding: 0px 5px;"></select>条</label> \
                        <label class="totalItemInfo" > 总条数: <span class="countValue">' + total + '</span>条</label>'
    }

    label.setAttribute("class", "DataTable_goBtnArea");
    label.style.display = "inline-block";
    label.style.verticalAlign = "middle";
    this.ul.style.display = "inline-block";
    this.ul.style.margin = "0px";
    this.ul.style.verticalAlign = "middle";
    nav.appendChild(this.ul);
    nav.appendChild(label);
    this.goBtnArea = label;
    var select = $(label).find("select.pageSize");
    var sizes = [10, 20, 50, 100];
    for (var i = 0; i < sizes.length; i++) {
      $("<option value=" + Number(sizes[i]) + ">" + sizes[i] + "</option>").appendTo(select);
    }
    if (!this.flag) {
      if (this.current > this.count) {
        this.current = this.count;
      }
      if (this.count < 1000) {
        var select = $(label).find("select.pageNumber");
        for (var i = 0; i < this.count; i++) {
          // $("<option value=" + (i + 1) + ">" + (i + 1) + "</option>").appendTo(select);
          $("<option>" + (i + 1) + "</option>").appendTo(select);
        }
      }
    } else {
      $(label).find(".goToPageItem").hide();
      $(label).find(".totalItemInfo").hide();
    }

    this.updatePages(this.current, this.size, this.flag);
  }

  webCpu.CardItem.Pagination.prototype.updatePages = function (n, size, flag) {
    n = Number(n) || 0;
    if (n < this.count + 1) {
      this.ul.innerHTML = "";
      this.current = n;


      if (!flag) {
        $(this.ul).append("<li  class='active'><a>" + (this.current) + "</a></li>");
        if (this.current < 5) {
          for (var i = 1; i < this.current; i++) {
            $(this.ul).prepend("<li><a>" + (this.current - i) + "</a></li>");
          }
          if (this.current !== 1) {
            $(this.ul).prepend("<li><a>上一页</a></li>");
          }
        } else {
          $(this.ul).prepend("<li><a>" + (this.current - 1) + "</a></li>");
          $(this.ul).prepend("<li><a>" + (this.current - 2) + "</a></li>");

          $(this.ul).prepend("<li><a>...</a></li>");

          $(this.ul).prepend("<li><a>1</a></li>");
          $(this.ul).prepend("<li><a>上一页</a></li>");
        }

        if (this.count - this.current < 4) {
          for (var i = 1; i < this.count - this.current + 1; i++) {
            $(this.ul).append("<li><a>" + (this.current + i) + "</a></li>");
          }
          if (this.current !== this.count) {
            $(this.ul).append("<li><a>下一页</a></li>");
          }
        } else {
          $(this.ul).append("<li><a>" + (this.current + 1) + "</a></li>");
          $(this.ul).append("<li><a>" + (this.current + 2) + "</a></li>");
          $(this.ul).append("<li><a>...</a></li>");
          $(this.ul).append("<li><a>" + this.count + "</a></li>");
          $(this.ul).append("<li><a>下一页</a></li>");
        }
      } else {
        $(this.ul).prepend("<li><a>上一页</a></li>");
        $(this.ul).append("<li><a>下一页</a></li>");
      }


      var _self = this;
      $(this.container).find("li>a").click(function () {
        var p = Number(this.innerHTML);
        if (this.innerHTML == "下一页") {
          p = _self.current + 1;
        } else if (this.innerHTML == "上一页") {
          p = _self.current - 1;
        } else if (this.innerHTML == "...") {
          p = (Number(this.parentNode.previousSibling.innerText) || 0) + 1;
        } else {}

        if (typeof (_self.callback) === "function") {
          var size = Number($(_self.container).find("select.pageSize").val()) || 10;
          _self.callback(p, size);
        }

      });

      $(this.container).find("select.pageNumber").val(n + "");

      $(this.container).find("select.pageNumber").on("change", function () {
        var value = Number($(this).val());
        var size = Number($(_self.container).find("select.pageSize").val()) || 10;
        if (value !== NaN && value < _self.count + 1 && value > 0) {
          _self.callback(value, size);
        }
      });

      $(this.container).find("input.pageNumber").on("change", function () {
        var value = Number($(this).val());
        var size = Number($(_self.container).find("select.pageSize").val()) || 10;
        if (value !== NaN && value < _self.count + 1 && value > 0) {
          _self.callback(value, size);
        }
      });

      $(this.container).find("select.pageSize").val(Number(size));
      $(this.container).find("select.pageSize").on("change", function () {
        var value = Number($(this).val());
        _self.callback(1, value);
      });


    }
  }

})();