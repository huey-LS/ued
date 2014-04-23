var CONFIG = require('../.././config/index'),
  DB_CONFIG = require('../.././config/db'),
  mongo = require('mongodb'),
  mongoClient = require('mongodb').MongoClient,
  mongoPath = 'mongodb://'+CONFIG.host+':'+CONFIG.db_port+'/'+CONFIG.db;

function DB(collection){
  this.collection = CONFIG.db + '_' + collection;
}

DB.prototype.connect = function(callback){
  var _self = this;
  mongoClient.connect(mongoPath, function(err, db){
    if(err) throw(err);
    return callback(err, db.collection(_self.collection));
  });
}

module.exports = DB;