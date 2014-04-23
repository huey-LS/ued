var path = require('path'),
  fs = require('fs'),
  path = require('path'),
  Promise = require('promise');

module.exports = get;

function getImage(imageName){
  var realPath = path.join(__dirname, '../.././public/images/avatar/'+imageName + '.png');

  return new Promise(function(resolve, reject){
    fs.exists(realPath, function(exists){
      if(exists){
        resolve(realPath);
      }else{
        reject(exists);
      }
    });
  });
}

function sendImage(realPath, res){
  return new Promise(function(resolve, reject){
    resolve(realPath);
  });
}

function get(req, res){
  var eid = req.query.eid;
  if(!eid){
    eid = 'default';
  }
  getImage(eid).then(function(data){
    res.sendfile(data);
  }, function(data){
    if(eid === 'default'){
      res.send('null');
      return;
    }
    req.query.eid = 'default';
    get(req, res)
  })
}