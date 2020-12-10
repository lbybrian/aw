 webCpu.regComponent("Cytoscape", {
   script: {
     cy: "cytoscape.min.js",
     //  menu: "cytoscape-cxtmenu.js"
   }
 }, function (container, data, task) {
   $(container).html("");
   task.option = task.option || {};
   var param = task.option.extra || {};
   param.container = container;

   var sSheet = cytoscape.stylesheet()
   if (task.option.nodeStyle || task.option.edgeStyle) {
     task.option.nodeStyle = task.option.nodeStyle || {};
     task.option.edgeStyle = task.option.edgeStyle || {};
     sSheet.selector('node')
       .css(task.option.nodeStyle)
       .selector('edge')
       .css(task.option.edgeStyle);
   }
   if (task.option.idStyle) {
     for (var k in task.option.idStyle) {
       sSheet.selector("#" + k)
         .css(task.option.idStyle[k]);
     }
   }
   if (task.option.classStyle) {
     for (var k in task.option.classStyle) {
       sSheet.selector("." + k)
         .css(task.option.classStyle[k]);
     }
   }
   param.layout = task.option.layout || {};
   param.style = sSheet;
   param.elements = data || {};
   var cy = window.cy = task.cy = cytoscape(param);
   //  task.cy.on('tap', 'node', function () {
   //    webCpu.Cytoscape.switchChildren(this);
   //  });
   setTimeout(function () {
     let defaults = {
       menuRadius: 100, // the radius of the circular menu in pixels
       selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
       commands: [ // an array of commands to list in the menu or a function that returns the array
         {
           content: '拓展',
           select: function (elem) {
             if (typeof (task.expendNode) === "function") {
               task.expendNode(elem.data());
             }

           }
         }, {
           content: '删除',
           select: function (elem) {
             if (typeof (task.deleteNode) === "function") {
               task.deleteNode(elem.data());
             }
           }
         },
         {
           content: '详情',
           select: function (elem) {
             if (typeof (task.openDetails) === "function") {
               task.openDetails(elem.data());
             }
           }
         },
         {
           content: '分析',
           select: function (elem) {
             if (typeof (task.analysisPerson) === "function") {
               task.analysisPerson(elem.data());
             }
           }
         }
       ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
       fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
       activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
       activePadding: 20, // additional size in pixels for the active command
       indicatorSize: 24, // the size in pixels of the pointer to the active command
       separatorWidth: 3, // the empty spacing in pixels between successive commands
       spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
       minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
       maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
       openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
       itemColor: 'white', // the colour of text in the command's content
       itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
       zIndex: 9999, // the z-index of the ui div
       atMouse: false // draw menu at mouse position
     };

     task.menu = task.cy.cxtmenu(defaults);
   }, 1000)

 });

 webCpu.Cytoscape.addNodeData = function (task, d) {
   if (typeof (task.updateAvater) === "function") {
     task.updateAvater(d);
   }
   var elements = this.transData(task, d);
   task.cy.add(elements);
   this.updateLayout(task);
 }

 webCpu.Cytoscape.transData = function (task, d) {
   var tData = d || task.data;
   var masterKey = task.masterKey || "id";
   var objectKey = task.objectKey || "object";
   var ret = {
     nodes: [{
       data: {
         id: tData[masterKey],
         name: tData.name,
         avater: tData.avater
       }
     }],
     edges: []
   };
   for (var i in tData.relation_list) {
     var item = tData.relation_list[i];
     var node = {
       data: {
         id: item[objectKey],
         name: item.name || item[objectKey],
         avater: item.avater
       }
     };
     ret.nodes.push(node);
     var edge = {
       data: {
         "target": tData[masterKey],
         "source": item[objectKey],
         "label": item.value || item.type,
         "id": tData[masterKey] + "-" + item[objectKey]
       }
     };

     if (task.relationMap && task.relationMap[item.type] !== item.value) {
       var t = edge.data.source;
       edge.data.source = edge.data.target;
       edge.data.target = t;
       edge.data.id = item[objectKey] + "-" + tData[masterKey]
     }

     ret.edges.push(edge);
   }
   return ret;
 }

 webCpu.Cytoscape.addNodes = function (task, data, source) {
   var nodes = [];
   data = data || {};
   if (typeof (data) === "string") {
     data = {
       id: data
     }
   }
   nodes.push({
     group: 'nodes',
     data: data
   });

   if (source) {
     sourceId = source.id || source;
     nodes.push({
       group: 'edges',
       data: {
         id: sourceId + "_" + data.id,
         source: sourceId,
         target: data.id
       }
     });
   }
   task.cy.add(nodes);
   this.updateLayout(task);
 }

 webCpu.Cytoscape.switchChildren = function (node) {
   if (!node.hiddenItems) {
     this.hiddenChildren(node);
   } else {
     for (var k in node.hiddenItems) {
       node.hiddenItems[k].restore();
     }
     node.hiddenItems = null;
   }
 }


 webCpu.Cytoscape.hiddenChildren = function (node) {
   node.hiddenItems = [];
   var nodes = node;
   var food = [];
   nodes.addClass('eater');

   var connectedEdges = nodes.connectedEdges(function (el) {
     return !el.target().anySame(nodes);
   });
   var connectedNodes = connectedEdges.targets();
   Array.prototype.push.apply(food, connectedNodes);

   for (var i = food.length - 1; i >= 0; i--) {
     var tEdges = food[i].connectedEdges();
     if (tEdges.length === 1) {
       var t = food[i].remove();
       node.hiddenItems.push(t);
     }
   }
 }


 webCpu.Cytoscape.updateLayout = function (task) {
   var option = task.option.layout || {}
   var layout = task.cy.layout(option);
   layout.run();
 }

 webCpu.Cytoscape.removeById = function (task, id) {
   var j = task.cy.$id(id);
   task.cy.remove(j);
 }