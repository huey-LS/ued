
/*
 * GET home page.
 */
module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index', {
      title: 'index',
      user: req.session.user
    });
  });

  require('./users')(app);
  require('./alibaba_workers')(app);
  
  require('./work')(app);
  
  app.get('/admin', function(req, res){
    require('./admin')(req, res);
  });

  require('./my')(app);

  require('./login')(app);

  require('./ajax')(app);

  require('./avatar')(app);
}