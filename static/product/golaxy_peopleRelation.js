golaxy_peopleRelation({
  "className": 'Cytoscape',
  "cardName": 'myRelationship',
  "task": {
    avaterMap: {
      org: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1572923768711" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2082" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30"><defs><style type="text/css"></style></defs><path d="M846.769231 433.230769v433.230769h98.461538v78.769231H78.769231v-78.769231h98.461538V433.230769H78.769231v-78.769231h103.660307C210.313846 197.750154 347.254154 78.769231 512 78.769231c164.726154 0 301.686154 118.980923 329.570462 275.692307H945.230769v78.769231h-98.461538z m-512 59.076923v315.076923h78.769231V492.307692h-78.769231z m256 0v315.076923h78.769231V492.307692h-78.769231z" p-id="2083" fill="#13227a"></path></svg>',
      male: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1572832963999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2411" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30"><defs><style type="text/css"></style></defs><path d="M511.500975 977.900039c-218.273684 0-395.22807 12.246082-395.228071-127.650682 0-115.135127 69.454347-213.982066 187.603587-279.044991 58.126472-32.017466 135.645068 25.370448 207.624484 25.370449 82.069708 0 166.325146-54.264016 229.501754-16.168421C845.847953 643.632904 906.729045 731.301676 906.729045 850.249357c0 139.896764-176.954386 127.650682-395.22807 127.650682zM511.500975 551.922027c-140.00655 0-253.504873-113.498324-253.504874-253.504873S371.494425 44.912281 511.500975 44.912281s253.504873 113.498324 253.504873 253.504873-113.498324 253.504873-253.504873 253.504873z" fill="#1296db" p-id="2412"></path></svg>',
      female: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1572832963999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2411" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30"><defs><style type="text/css"></style></defs><path d="M511.500975 977.900039c-218.273684 0-395.22807 12.246082-395.228071-127.650682 0-115.135127 69.454347-213.982066 187.603587-279.044991 58.126472-32.017466 135.645068 25.370448 207.624484 25.370449 82.069708 0 166.325146-54.264016 229.501754-16.168421C845.847953 643.632904 906.729045 731.301676 906.729045 850.249357c0 139.896764-176.954386 127.650682-395.22807 127.650682zM511.500975 551.922027c-140.00655 0-253.504873-113.498324-253.504874-253.504873S371.494425 44.912281 511.500975 44.912281s253.504873 113.498324 253.504873 253.504873-113.498324 253.504873-253.504873 253.504873z" fill="#d4237a" p-id="2412"></path></svg>',
      other: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1572832963999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2411" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30"><defs><style type="text/css"></style></defs><path d="M511.500975 977.900039c-218.273684 0-395.22807 12.246082-395.228071-127.650682 0-115.135127 69.454347-213.982066 187.603587-279.044991 58.126472-32.017466 135.645068 25.370448 207.624484 25.370449 82.069708 0 166.325146-54.264016 229.501754-16.168421C845.847953 643.632904 906.729045 731.301676 906.729045 850.249357c0 139.896764-176.954386 127.650682-395.22807 127.650682zM511.500975 551.922027c-140.00655 0-253.504873-113.498324-253.504874-253.504873S371.494425 44.912281 511.500975 44.912281s253.504873 113.498324 253.504873 253.504873-113.498324 253.504873-253.504873 253.504873z" fill="#8a8a8a" p-id="2412"></path></svg>'
    },
    aPrefix: "/mockData/image/",
    masterKey: "name",
    "data": {},
    "promise": {
      "beforeRender": function (container, data, task) {
        task.updateAvater(task.data);
        task.data = webCpu.Cytoscape.transData(task);
      },
      "afterRender": function (container, data, task) {
        var crossUrl = "http://10.60.1.99:8001/static/tMicro.html";
        task.crossItem = new CrossDomainService(crossUrl);
      },
    },
    "deleteNode": function (d) {
      webCpu.Cytoscape.removeById(this, d.id);
    },
    "expendNode": function (node) {
      var name = node.name;
      var url = "mockData/peoples/" + name + ".json";
      this._expendNode(url);
    },
    "_expendNode": function (d) {
      var _self = this;
      if (typeof (d) === "string") {
        $.get(d, {}, function (tData) {
          webCpu.Cytoscape.addNodeData(_self, tData);
        }, "json");
      } else {
        webCpu.Cytoscape.addNodeData(this, d);
      }
    },
    "openDetails": function (d) {
      this.updateDetails(this.crossItem, d.name);
    },
    attachAvater: function (d, name) {
      d.avater = [];
      if (d.type === "人——机构") {
        d.avater.push('data:image/svg+xml;utf8,' + encodeURIComponent(this.avaterMap["org"]));
      } else if (d.sex === "男") {
        d.avater.push('data:image/svg+xml;utf8,' + encodeURIComponent(this.avaterMap["male"]));
      } else if (d.sex === "女") {
        d.avater.push('data:image/svg+xml;utf8,' + encodeURIComponent(this.avaterMap["female"]));
      } else {
        d.avater.push('data:image/svg+xml;utf8,' + encodeURIComponent(this.avaterMap["other"]));
      }
      if (name || d.name) {
        d.avater.push(this.aPrefix + name + ".png");
      }
    },
    updateAvater: function (d) {
      this.attachAvater(d, d.name);
      for (var i in d.relation_list) {
        var item = d.relation_list[i];
        this.attachAvater(item, item.object);
      }
    },
    hiddenChildren: function (tapped) {

    },
    updateDetails: function (crossItem, name) {
      var _self = this;
      this.crossItem.request("/entity/", {
        p1: name
      }, "get", function (data) {
        console.log(data);
        var url = "product/golaxy_details.js";
        webCpu["CardItem"].leftCardDialog(webCpu.cards[_self.cardName], url, "人物画像", 350, {
          float: "right"
        }, {
          key: "golaxy_details",
          callback: function (c1, d1, t1) {
            d1.task.data = data;
          }
        });
      });
    },
    "url": 'mockData/peoples/陳菊.json',
    "requestType": 'get',
    "dataType": 'json',
    "relationMap": {
      "继任关系": "前任"
    },
    "option": {
      "extra": {
        "boxSelectionEnabled": false,
        "autounselectify": true
      },
      "layout": {
        "name": 'cose',
        "directed": true,
        "padding": 10
      },
      "nodeStyle": {
        "height": 60,
        "width": 60,
        "label": 'data(name)',
        "padding": "20px",
        "background-fit": 'contain contain',
        "background-image": 'data(avater)',
        "border-color": '#222',
        "border-width": 1,
        "border-opacity": 0.5,
        "color": '#fff',
        "text-background-color": '#ffffff',
        "text-background-shape": 'roundrectangle',
        "text-border-color": '#ddd',
        "text-border-opacity": 1,
        "text-border-width": 1,
        "text-outline-width": 1,
        "text-valign": 'bottom',
        "font-size": 12,
        "text-margin-y": 3,
        "text-background-padding": 3
      },
      "edgeStyle": {
        "curve-style": 'bezier',
        "width": 2,
        'target-arrow-shape': 'triangle',
        "line-color": '#ffaaaa',
        "label": 'data(label)',
        "font-size": 12,
        "text-max-width": 10,
        "text-wrap": 'wrap',
        "text-overflow-wrap": 'whitespace',
        "edge-text-rotation": 'autorotate'
      },
      "classStyle": {
        "female": {
          "border-color": 'red'
        },
        "male": {
          "border-color": 'blue'
        }
      }
    }
  }
});