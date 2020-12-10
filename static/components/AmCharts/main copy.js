webCpu.regComponent("AmCharts", {
  script: {
    armChart: "amchart.js"
  }
}, function (container, data, task) {
  am4core.ready(function () {

    var chart = am4core.create(container, am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Series for World map
    var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
    worldSeries.exclude = ["AQ"];
    worldSeries.useGeodata = true;



    var polygonTemplate = worldSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = chart.colors.getIndex(0);
    polygonTemplate.nonScalingStroke = true;

    // Hover state
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    // // Series for United States map
    // var usaSeries = chart.series.push(new am4maps.MapPolygonSeries());
    // usaSeries.geodata = am4geodata_usaLow;

    // var usPolygonTemplate = usaSeries.mapPolygons.template;
    // usPolygonTemplate.tooltipText = "{name}";
    // usPolygonTemplate.fill = chart.colors.getIndex(1);
    // usPolygonTemplate.nonScalingStroke = true;

    // // Hover state
    // var hs = usPolygonTemplate.states.create("hover");
    // hs.properties.fill = am4core.color("#367B25");

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.exclude = ["AQ"];

    // Add heat rule
    polygonSeries.heatRules.push({
      "property": "fill",
      "target": polygonSeries.mapPolygons.template,
      "min": am4core.color("#E7E7B9"),
      "max": am4core.color("#AAAA00")
    });

    // Add expectancy data
    polygonSeries.events.on("beforedatavalidated", function (ev) {
      var source = ev.target.data;
      if (source.maybe) {
        ev.target.data = source.maybe.here.values;
      }
    });

    polygonSeries.data = {
      something: "Useless",
      maybe: {
        here: {
          values: [{
              id: "US",
              value: 60
            },
            {
              id: "MX",
              value: 50
            },
            {
              id: "CA",
              value: 70
            }
          ]
        }
      }
    };



    if (data.map) {
      task.data = data.map(function (store) {
        return {
          name: store.name,
          long: am4core.type.toNumber(store.long),
          lat: am4core.type.toNumber(store.lat),
          count: am4core.type.toNumber(store.count),
          color: chart.colors.getIndex(3)
        }
      });
      var nodesSeries = createSeries(chart, "count", task.promise.clickLabel);

      nodesSeries.data = task.data;

      nodesSeries.show();

    };



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
    template.tooltipText = "{name}: {count}";

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