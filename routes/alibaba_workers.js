module.exports = function(app){
  var index = require('.././models/alibaba_workers/index')
  app.get('/alibaba_workers/s/*', function(req, res){
    index.get(req, res);
  })
  app.get('/alibaba_workers', function(req, res){
    index.get(req, res);
  })

  var reglist = require('.././models/alibaba_workers/reglist');
  app.get('/alibaba_workers/reglist', function(req, res){
    reglist.get(req, res);
  })
  app.post('/alibaba_workers/reglist', function(req, res){
    reglist.post(req, res);
  })

  var edit = require('.././models/alibaba_workers/edit');
  app.get('/alibaba_workers/edit', function(req, res){
    edit.get(req, res);
  })
  app.post('/alibaba_workers/edit', function(req, res){
    edit.post(req, res);
  })
}