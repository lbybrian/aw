webCpu.regComponent("AmCharts", {
  script: {
    armChart: "amchart.js"
  }
}, function (container, data, task) {
  am4core.ready(function () {


    // Create map instance
    var chart = am4core.create(container, am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    // polygonTemplate.fill = am4core.color("#74B266");

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];

    // Add some data
    // polygonSeries.data = [{
    //   "id": "US",
    //   "name": "United States",
    //   "value": 100,
    //   "fill": am4core.color("#F05C5C")
    // }, {
    //   "id": "FR",
    //   "name": "France",
    //   "value": 50,
    //   "fill": am4core.color("#5C5CFF")
    // }];
    polygonSeries.data = task.data.map(function(item){
      var index = Math.floor(item.value / task.gap);
      item.fill = chart.colors.getIndex(index);
      item.data = {
        name: item.id
      }
      return item;
    });

    // Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = "fill";
    // polygonSeries.mapImages.template.events.on

    polygonTemplate.events.on("hit", function(e) {
      console.log(e.target.dataItem.dataContext);
      var tData = e.target.dataItem.dataContext;
      if(typeof(task.clickCallback) === "function") {
        task.clickCallback(tData, e)
      }
    });

    // chart.events.on("hit", function(e) {
    //   console.log(e);
    // });

    task.chart = chart;

  }); // end am4core.ready()

  function createSeries(chart, heatfield, callback) {
    var series = chart.series.push(new am4maps.MapImageSeries());
    series.dataFields.value = heatfield;

    var template = series.mapImages.template;
    template.verticalCenter = "middle";
    template.horizontalCenter = "middle";
    template.propertyFields.latitude = "lat";
    template.propertyFields.longitude = "long";
    template.tooltipText = "{name}: {value}";

    var circle = template.createChild(am4core.Circle);
    circle.radius = 10;
    circle.fillOpacity = 0.7;
    circle.verticalCenter = "middle";
    circle.horizontalCenter = "middle";
    circle.nonScaling = true;

    var label = template.createChild(am4core.Label);
    label.text = "{count}";
    label.fill = am4core.color("#fff");
    label.verticalCenter = "middle";
    label.horizontalCenter = "middle";
    label.nonScaling = true;

    var heat = series.heatRules.push({
      target: circle,
      property: "radius",
      min: 20,
      max: 20
    });

    // Set up drill-down
    series.mapImages.template.events.on("hit", function (ev) {
      if (typeof (callback) === "function") {
        callback(ev.target);
      }
    });

    return series;
  }

});