window.onload = function(){
  var search = document.getElementById('search'),
    btn = search.getElementsByTagName('button')[0];

  btn.onclick = function(){
    var skey = '';
    var sk = search.getElementsByTagName('select')[0].value;
    var sc = search.getElementsByTagName('input')[0].value
    search.action = '/users/s/'+sk+':'+sc;
  }
}