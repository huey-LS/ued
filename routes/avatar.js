module.exports = function(app){
  var getAvatar = require('.././models/avatar/getAvatar');
  app.get('/avatar/getAvatar', function(req, res){
    getAvatar(req, res);
  })
}