var db  = require('.././db/db-promise'),
  DB_CONFIG = require('../.././config/db'),
  USERS_CONFIG = require('../.././config/alibaba_workers'),
  db_users = db('alibaba_workers'),
  Promise = require('promise'),
  page = USERS_CONFIG.page.limit*1;

module.exports = Userapp;
function Userapp(){
  
}

Userapp.get = function(query){
  return db_users.then(function(db){
    return new Promise(function(resolve, reject){
      db.findOne(query, function(err, data){
        if(err) return reject(err)
        resolve(data)
      })
    })
  })
}

Userapp.getCount = function(){
  return db_users.then(function(db){
    return new Promise(function(resolve, reject){
      db.count(function(err, count){
        if(err) return reject(err)
        resolve(count);
      })
    })
  })
}

Userapp.all = function(query, pagenum, sort){
  var skip = (pagenum-1)*page;

  var getCount = db_users.then(function(db){
    return new Promise(function(resolve, reject){
      db.count(query, function(err, count){
        if(err) return reject(err)
        resolve(count);
      })
    })
  })
  var getFind = db_users.then(function(db){
    return new Promise(function(resolve, reject){
      db.find(query).limit(page).skip(skip).sort(sort).toArray(function(err, data){
        if(err) return reject(err);
        resolve(data);
      })
    })
  });

  return Promise.all(getCount, getFind).then(function(data){
    return {
      count: data[0],
      data: data[1]
    }
  })
}

Userapp.insert = function(user){
  var i,_self = this;

  for(i in user){
    if(!(i in DB_CONFIG.alibaba_workers && DB_CONFIG.check(user[i], DB_CONFIG.alibaba_workers[i]))){
      delete user[i];
    }
  }
  console.log(user);
  return new Promise(function(resolve, reject){
    db_users.then(function(db){
      db.insert(user, function(err, data){
        if(err) return reject(err);
        resolve(data);
      })
    })
  })
}

Userapp.save = function(user){
  var i,_self = this;

  for(i in user){
    if(!(i in DB_CONFIG.user && DB_CONFIG.check(user[i], DB_CONFIG.user[i]))){
      delete user[i];
    }
  }

  return new Promise(function(resolve, reject){
    if(!user.alibaba_id){
      return reject(0)
    }

    Userapp.get({alibaba_id: user.alibaba_id}).then(function(data){
      if(data){
        db_users.then(function(db){
          db.update(data, user, function(err, data){
            if(err) return reject(err);
            resolve(data);
          })
        })
      }else{
        db_users.then(function(db){
          db.insert(user, function(err, data){
            if(err) return reject(err);
            resolve(data);
          })
        })
      }
    });
  })
}

Userapp.update = function(query, user){
  return db_users.then(function(db){
    return new Promise(function(resolve, reject){
      db.update(query, user, function(err, data){
        if(err) return reject(err)
        resolve(data)
      })
    })
  })
}
