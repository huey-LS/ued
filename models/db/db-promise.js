var CONFIG = require('../.././config/index'),
  DB_CONFIG = require('../.././config/db'),
  mongo = require('mongodb'),
  mongoClient = require('mongodb').MongoClient,
  mongoPath = 'mongodb://'+CONFIG.host+':'+CONFIG.db_port+'/'+CONFIG.db,
  Promise = require('promise');

module.exports = DB;
function DB(collection){
  var collection = CONFIG.db + '_' + collection;
  return new Promise(function(resolve, reject){
    mongoClient.connect(mongoPath, function(err, db){
      if(err){
        reject(err);
        return false; 
      }
      resolve(db.collection(collection));
    })
  })
}
