var userApp = require('./models/users/userapp'),
  crypto = require('crypto'),
  eid = '0',
  username = 'admin',
  password = 'admin';

var md5 = crypto.createHash('md5'),
  password = md5.update(password).digest('hex'),

  user = {
    eid: eid,
    username: username,
    password: password,
    type: '1',
    inoffice: '0'
  }

userApp.save(user).then(function(data){
  console.log(data);
}, function(err){
  console.log(err);
});

