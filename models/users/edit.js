var userApp = require('./userapp');

function get(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }
  if((!req.query.eid)||req.query.eid == 0){
    if(req.session.user && req.session.user.eid){
      req.query.eid = req.session.user.eid;
    }else{
      return res.send('failure');
    }
  }
  userApp.get({eid: req.query.eid}).then(function(user){
    res.render('users/edit', {
      title:'users/edit', 
      edit_user: user,
      user: req.session.user
    });
  })
}
function post(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }
  if(req.body.eid === '' || req.body.eid < 0){
    return res.send('employee_id error');
  }
  if(req.body.username === ''){
    return res.send('username error');
  }
  var userNew = {
      email : req.body.email,
      telephone: req.body.telephone||'',
      tel_extension: req.body.tel_extension||'',
      deparyment: req.body.deparyment||0,
      position: req.body.position||0,
      wangwang: req.body.wangwang||'',
      qq: req.body.qq||'',
      inoffice: req.body.inoffice||'1'
    };
  userApp.update({eid: req.body.eid}, {$set:userNew}).then(function(eid){
    res.redirect('/users');
  }, function(err){
    res.redirect('/users/edit?eid='+req.body.eid);
  });
}

module.exports = {
  get: get,
  post: post
}