var userApp = require('./userapp'),
  Promise =require('promise'),
  crypto = require('crypto');

function get(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }
  res.render('users/reglist', {
    title:'users/reglist',
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
    if(userParam[2] === '男'){
      userParam[2] = '1';
    }else if(userParam[2] === '女'){
      userParam[2] = '2';
    }else{
      userParam[2] = '0';
    }

    var md5 = crypto.createHash('md5'),
      password = md5.update(userParam[0]).digest('hex'),
      userNew = {
        eid: userParam[0],
        username: userParam[1],
        password: password,
        sex: userParam[2],
        deparyment: userParam[3],
        position: userParam[4],
        tel_extension: userParam[5],
        telephone: userParam[6],
        email: userParam[7],
        wangwang: userParam[8],
        qq: userParam[9],
        jointime: userParam[10],
        type: "0",
        inoffice: '1'
      };
    userSaveList.push(userApp.save(userNew))
  }
  Promise.all.apply(Promise, userSaveList).then(function(){
    res.redirect('/users');
  },function(){
    res.redirect('/users/reglist'); 
  })
}

module.exports = {
  get: get,
  post: post
}