function get(req, res){
  var userapp = require('./userapp'),
    limit = require('../.././config/alibaba_workers').page.limit,
    seachkey = {},
    pagenum = 1;
    params = req.route.params;

  if(params[0]){
    var s = new RegExp(params[0]);
    seachkey = {$or:[{'username':s},{'wangwang':s}]}
  }

  if(req.query.page && req.query.page > 1){
    pagenum = req.query.page;
  }

  var sort = {alibaba_id: 1};
  userapp.all(seachkey, pagenum, sort).then(function(data){
    res.render('alibaba_workers',{
      title: 'alibaba_workers',
      users: data.data,
      count: Math.ceil(data.count/limit),
      page: pagenum,
      user: req.session.user,
      nav: 'alibaba_workers'
    })
  }, function(err){
    console.log(err);
  })
}

module.exports = {
  get: get
}