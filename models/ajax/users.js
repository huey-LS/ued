function get(req, res){
  var db  = require('.././db/index'),
    USERS_CONFIG = require('../.././config/users'),
    page_config = USERS_CONFIG.page,
    db_users = new db('users'),
    seachkey = {},
    skip = 0;

  if(req.query.eid){
    seachkey.eid = new RegExp(req.query.eid);
  }else if(req.query.username){
    seachkey.username = new RegExp(req.query.username);
  }

  if(req.query.page && req.query.page > 1){
    skip = page_config.limit*(req.query.page - 1);
  }
  db_users.connect(function(err, db){
    db.find(seachkey).limit(page_config.limit).skip(skip).toArray(function(err, docs){
      res.render('users', {
        title:'users', 
        users:docs,
        user: req.session.user
      });
    })
  })
}