var workApp = require('./work');

function get(req, res){
  if((!req.query.wid)||req.query.wid == 0){
    return res.send('failure');
  }
  workApp.get({wid: req.query.wid}, function(err, data){
    if(data){
      res.render('work/edit', {
        title:'work/edit', 
        edit_work: data,
        user: req.session.user
      });
    }else{
      res.render('work/edit', {
        title:'work/edit', 
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
  if(req.body.username === ''){
    return res.send('username error');
  }
  var workNew = {
    title: req.body.title,
    content: req.body.content,
    request: req.body.request,
    jointime: req.body.jointime,
    needtime: req.body.needtime
  };

  workApp.update({wid: req.body.wid}, {$set:workNew}, function(err, wid){
    if(err === null){
       res.redirect('/work/edit?wid='+req.body.wid);
    }else{
      res.send('failure');
    }
  });
}

module.exports = {
  get: get,
  post: post
}