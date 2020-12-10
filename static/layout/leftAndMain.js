transweb_cn({
  task: {
    style: {
      padding: "10px 15px",
      background: "rgba(0, 0, 0, 0.3)"
    },
    app: {

    },
    template: '<div style="width: 100%; height: 100%; position: relative;">\
                        <div style="padding-left:360px;  width: 100%; height: 100%; position: relative;">\
                            <div component="CardItem" cardName="centerAreaItem" class="conterArea" style="width: 100%; height: 100%; position: relative; text-align: center;"></div>\
                        </div>\
                        <div class="leftArea" component="CardItem" cardName="leftAreaItem" style="width: 350px; height:100%; position: absolute; overflow: auto; top: 0px;"></div>\
                    </div>',
    promise: {
      beforeRender: function (container, data, task) {

      },
      afterRender: function (container, data, task) {


      }
    }

  }
});