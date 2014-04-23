module.exports = function(app){
  var my = require('.././models/my/');
  app.get('/my', function(req, res){
    my(req, res);
  })
  app.get('/my/*', function(req, res){
    my.other(req, res);
  })
}