var userApp = require('.././models/users/index'),
  crypto = require('crypto'),
  md5 = crypto.createHash('md5'),
  password = md5.update('admin').digest('hex');

console.log(password);
userApp.update({eid:"1"}, {$set:{"password":password}}, function(){})