var userApp = require('./userapp'),
  Promise =require('promise');

function get(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }
  res.render('alibaba_workers/reglist', {
    title:'alibaba_workers/reglist',
    user: req.session.user
  });
}

function post(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }

  var content = req.body.content,
    userlist = content.replace(/\r\n$/,'').split('\r\n'),
    len = userlist.length,
    i = 0,
    userParam,
    userNew,
    userSaveList = [];

  for(;i<len;i++){
    userParam = userlist[i].replace(/\t$/,'').split('\t');

    var userNew = {
      username: userParam[0],
      telephone: userParam[1],
      tel_extension: userParam[2],
      email: userParam[3],
      wangwang: userParam[4],
      deparyment: userParam[5],
      interface_person: userParam[6] 
    };
    userSaveList.push(userApp.insert(userNew))
  }
  Promise.all.apply(Promise, userSaveList).then(function(){
    res.redirect('/alibaba_workers');
  },function(){
    res.redirect('/alibaba_workers/reglist'); 
  })
}

module.exports = {
  get: get,
  post: post
}