module.exports = function(app){
  var index = require('.././models/users/index')
  app.get('/users/s/*', function(req, res){
    index.get(req, res);
  })
  app.get('/users', function(req, res){
    index.get(req, res);
  })

  var reg = require('.././models/users/reg');
  app.get('/users/reg', function(req, res){
    reg.get(req, res);
  })
  app.post('/users/reg', function(req, res){
    reg.post(req, res);
  })
  var reglist = require('.././models/users/reglist');
  app.get('/users/reglist', function(req, res){
    reglist.get(req, res);
  })
  app.post('/users/reglist', function(req, res){
    reglist.post(req, res);
  })

  var edit = require('.././models/users/edit');
  app.get('/users/edit', function(req, res){
    edit.get(req, res);
  })
  app.post('/users/edit', function(req, res){
    edit.post(req, res);
  })
}