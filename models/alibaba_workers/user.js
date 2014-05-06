var db  = require('.././db/index'),
  DB_CONFIG = require('../.././config/db'),
  db_users = new db('alibaba_workers');

function User(user){
  
}

User.save = function(data, callback){
  var user = {},i,_self = this;

  for(i in data){
    if(i in DB_CONFIG.user && DB_CONFIG.check(data[i], DB_CONFIG.user[i])){
      user[i] = data[i];
    }
  }

  if(!user.eid){
    return callback(0)
  }

  User.get({eid:user.eid}, function(err, u){
    if(!u){
      db_users.connect(function(err, collection){
        collection.insert(user, callback)
      });
    }else{
      callback(2)
    }
  })
}
User.get = function(query, callback){
  db_users.connect(function(err, collection){
    collection.findOne(query, callback);
  });
}
User.update = function(query, data, callback){
  db_users.connect(function(err, collection){
    collection.update(query, data, callback);
  }); 
}
module.exports = User;