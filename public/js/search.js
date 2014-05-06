window.onload = function(){
  var search = document.getElementById('search'),
    btn = search.getElementsByTagName('button')[0],
    action = search.action;

  btn.onclick = function(){
    var skey = '';
    var sk = search.getElementsByTagName('select')[0];
    var sc = search.getElementsByTagName('input')[0];
    if(sk){
      skey += sk.value + ':'
    }
    skey += sc.value;
    search.action += skey;
  }
}