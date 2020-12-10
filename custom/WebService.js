var WebService = function (app, other, params) {
  this.app = app;
  this.other = other;
  this.params = params;
  for (var i in other.data.cardData) {
    var item = other.data.cardData[i];
    item.params = this.params;
    this.addItem(item);
  }
}

WebService.prototype.addItem = function (task, config) {
  var method = task.method || "get";
  var _self = this;
  //when config is not defined, the interface created can access this service 
  task.config = config;
  if (task.config) {
    task.service = this;
  }
  this.app[task.method](task.url, function (req, res) {
    task.callback(req, res, task);
  });
}

exports.create = function (app, origin, params) {
  return new WebService(app, origin, params);
};