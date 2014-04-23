var db  = require('.././db/index'),
  DB_CONFIG = require('../.././config/db'),
  db_work_config = DB_CONFIG.work,
  db_work = new db('work');

function Work(){}

module.exports = Work;

Work.save = function(data, callback){
  var work = {};

  for(i in data){
    if(i in db_work_config && DB_CONFIG.check(data[i], db_work_config[i])){
      work[i] = data[i];
    }
  }

  db_work.connect(function(err, collection){
    collection.findOne({}, {sort:{wid: -1}}, function(err, lastone){
      if(lastone){
        work.wid = (lastone.wid*1 + 1).toString();
      }else{
        work.wid = '1';
      }
      collection.insert(work, callback);
    })
    
  });
}

Work.get = function(query, callback){
  db_work.connect(function(err, collection){
    collection.findOne(query, callback);
  });
}
Work.update = function(query, data, callback){
  db_work.connect(function(err, collection){
    collection.update(query, data, callback);
  }); 
}