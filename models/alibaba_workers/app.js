var user = require('./index');

var u = new user({
	id: '1',
	name:'test1',
	password:'test1',
	email:'email@email'
})
/*user.get('test1', function(err, us){
  if(err === null){
  	console.log(us);
  }else{
  	console.log(err);
  }
})*/

u.save(function(err, us){
  if(err === null){
  	console.log(us);
  }else{
  	console.log(err);
  }
})
/*user.get({name:'test1'}, function(err, docs){
  console.log(docs);
})*/