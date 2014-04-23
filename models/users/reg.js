var userApp = require('./userapp'),
  crypto = require('crypto');

function get(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }
  res.render('users/reg', {
    title:'users/reg',
    user: req.session.user
  });
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
  if(req.body.password !== req.body.password_re){
    return res.send('password is not same');
  }
  var md5 = crypto.createHash('md5'),
    password = md5.update(req.body.eid).digest('hex'),
    userNew = {
      eid : req.body.eid,
      username : req.body.username,
      password : password,
      email : req.body.email,
      telephone: req.body.telephone||'',
      tel_extension: req.body.tel_extension||'',
      deparyment: req.body.deparyment||0,
      position: req.body.position||0,
      wangwang: req.body.wangwang||'',
      qq: req.body.qq||'',
      type: "0",
      inoffice: '1'
    };
  userApp.insert(userNew).then(function(eid){
    res.redirect('/users');
  });
}


module.exports = {
  get: get,
  post: post
}