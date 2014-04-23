module.exports = function(req, res){
  if( req.session.user === undefined ||  req.session.user.type !== "1"){
    return res.redirect('/login');
  }
	res.render('admin', {
    title:'admin',
    user: req.session.user
  })
}