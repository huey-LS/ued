var mongodb = require('./index'),
  connection = function(db_name, callback){
    //打开数据库
    mongodb.open(function (err, db) {
      if (err) {
        return callback(err);//错误，返回 err 信息
      }
      //读取 db 集合
      db.collection(db_name, function (err, collection) {
        if (err) {
          mongodb.close();
          return callback(err);//错误，返回 err 信息
        }
        //返回集合
        callback(err, collection);
      });
    });
  };

connection.close = function(){
  mongodb.close();
}

module.exports = connection;