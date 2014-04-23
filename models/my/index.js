var userapp = require('../users/userapp');
module.exports = My;
function My(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }
  userapp.get({eid: req.session.user.eid}).then(function(data){
    res.render('my',{
      title: 'my',
      my: data,
      user: req.session.user
    })
  });
}
My.other = function(req, res){
  var params = req.route.params;
  if(params[0]){
    userapp.get({eid: params[0]}).then(function(data){
      res.render('my',{
        title: 'my',
        my: data,
        user: req.session.user
      })
    });
  }else{
    My(req, res);
  }
}