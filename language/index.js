var language = require('./language');
module.exports = function(land){
  return language[land]||'';
}