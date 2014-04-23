function get(req, res){
  var db  = require('.././db/index'),
    USERS_CONFIG = require('../.././config/work'),
    page_config = USERS_CONFIG.page,
    db_users = new db('work'),
    seachkey = {},
    skip = 0;

  if(req.query.wid){
    seachkey.eid = new RegExp(req.query.wid);
  }else if(req.query.title){
    seachkey.title = new RegExp(req.query.title);
  }

  if(req.query.page && req.query.page > 1){
    skip = page_config.limit*(req.query.page - 1);
  }
  db_users.connect(function(err, db){
    db.find(seachkey).limit(page_config.limit).skip(skip).toArray(function(err, docs){
      res.render('work', {
        title:'work', 
        work: docs,
        user: req.session.user
      });
    })
  })
}

module.exports = {
  get: get
}