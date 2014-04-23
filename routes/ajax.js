module.exports = function(app){
  app.get('/ajax/*', function(req, res){
    return res.render('ajax', {
      status: "200",
      data: JSON.stringify({a:1})
    });
  })
}