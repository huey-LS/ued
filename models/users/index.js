function get(req, res){
  var userapp = require('./userapp'),
    limit = require('../.././config/users').page.limit,
    seachkey = {},
    pagenum = 1;
    params = req.route.params;

  if(params[0]){
    var s = params[0].split('-');
    for(var i=0,len=s.length;i<len;i++){
      var p = s[i].split(':');
      seachkey[p[0]] = new RegExp(p[1]);
    }
  }

  if(req.query.page && req.query.page > 1){
    pagenum = req.query.page;
  }

  if(! (req.session.user && req.session.user.type === '1')){
    seachkey['inoffice'] = {$in:['1', undefined]};  
  }
  var sort = {eid: 1};
  userapp.all(seachkey, pagenum, sort).then(function(data){
    res.render('users2',{
      title: 'users',
      users: data.data,
      count: Math.ceil(data.count/limit),
      page: pagenum,
      user: req.session.user
    })
  }, function(err){
    console.log(err);
  })
}

module.exports = {
  get: get
}