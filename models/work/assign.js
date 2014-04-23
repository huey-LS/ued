var workApp = require('./work');

function get(req, res){
  if((!req.query.wid)||req.query.wid == 0){
    return res.send('failure');
  }
  workApp.get({wid: req.query.wid}, function(err, data){
    if(data){
      res.render('work/assign', {
        title:'work/assign', 
        edit_work: data,
        user: req.session.user
      });
    }else{
      res.render('work/assign', {
        title:'work/assign', 
        edit_work: false,
        user: req.session.user
      });
    }
  })
}

function post(req, res){
  if(req.body.wid === '' || req.body.wid < 0){
    return res.send('employee_id error');
  }

  var workNew = {
    status: req.body.status,
    eid: req.body.eid
  }
  workApp.update({wid: req.body.wid},{$set:workNew}, function(err, wid){
    if(err === null){
      res.send('success');
    }else{
      res.send('failure');
    }
  })
}

module.exports = {
  get: get,
  post: post
}