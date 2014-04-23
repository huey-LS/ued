var workApp = require('./work');

function get(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }

  res.render('work/add', {
    title:'work/add', 
    user: req.session.user
  });
}

function post(req, res){
  var session = req.session;
  if( session.user === undefined || session.user.type !== '1'){
    return res.redirect('/login');
  }
  if(req.body.title === ''){
    return res.redirect('/work/add?error=title');
  }
  if(req.body.jointime === ''){
    return res.redirect('/work/add?error=jointime');
  }

  var workNew = {
    title: req.body.title,
    content: req.body.content,
    request: req.body.request,
    jointime: req.body.jointime,
    needtime: req.body.needtime,
    status: '0'
  }

  workApp.save(workNew, function(err, eid){
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