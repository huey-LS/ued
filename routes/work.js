module.exports = function(app){
  var index = require('../models/work/index');
  app.get('/work', function(req, res){
    index.get(req, res);
  })

  var add = require('../models/work/add');
  app.get('/work/add', function(req, res){
    add.get(req, res);
  })
  app.post('/work/add', function(req, res){
    add.post(req, res);
  })

  var edit = require('.././models/work/edit');
  app.get('/work/edit', function(req, res){
    edit.get(req, res);
  })
  app.post('/work/edit', function(req, res){
    edit.post(req, res);
  })

  var assign = require('.././models/work/assign');
  app.get('/work/assign', function(req, res){
    assign.get(req, res);
  })
  app.post('/work/assign', function(req, res){
    assign.post(req, res);
  })
}