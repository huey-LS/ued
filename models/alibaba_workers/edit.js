var userApp = require('./userapp');
var BSON = require('mongodb').BSONPure;

function get(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }
  if((!req.query.id)||req.query.id == 0){
    return res.send('failure');
  }
  var id = req.query.id;
  userApp.get({_id:BSON.ObjectID.createFromHexString(id)}).then(function(user){
    res.render('alibaba_workers/edit', {
      title:'alibaba_workers/edit', 
      edit_user: user,
      user: req.session.user
    });
  })
}
function post(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }
  if(req.body.id === '' || req.body.id < 0){
    return res.send('id error');
  }
  if(req.body.username === ''){
    return res.send('username error');
  }
  var id = req.body.alibaba_id;
  var userNew = {
      email : req.body.email,
      telephone: req.body.telephone||'',
      tel_extension: req.body.tel_extension||'',
      deparyment: req.body.deparyment||0,
      wangwang: req.body.wangwang||'',
      interface_person: req.body.interface_person||''
    };

  userApp.update({_id:BSON.ObjectID.createFromHexString(id)}, {$set:userNew}).then(function(id){
    res.redirect('/alibaba_workers');
  }, function(err){
    res.redirect('/alibaba_workers/edit?id='+id);
  });
}

module.exports = {
  get: get,
  post: post
}