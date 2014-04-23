var userApp = require('.././models/users/user'),
  crypto = require('crypto');
module.exports = function(app){
  app.get('/login', function(req, res){
    delete req.session.user;
    res.render('login', {
      title: land('login'),
      user: req.session.user,
      redirect : req.query.redirect||''
    });
  });
  app.post('/login', function(req, res){
    delete req.session.user;
    var md5 = crypto.createHash('md5'),
       password = md5.update(req.body.password).digest('hex');

    userApp.get({username:req.body.username}, function(err, user){
      if(!user){
        return res.redirect('/login?error=username');
      }
      if(user.password !== password){
        return res.redirect('/login?error=password');
      }else{
        var s_user = {}
        s_user.eid = user.eid;
        s_user.username = user.username;
        s_user.type = user.type;
        req.session.user = s_user;

        if(req.body.redirect && req.body.redirect !== ''){
          res.redirect(req.body.redirect);
        }else{
          res.redirect('/');
        }
      }
    })
  });
}