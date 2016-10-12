var uiLoading = function(){
}

var uiData = function(data){
  $('#mainContent').html('<h1>CS 236 Help Queue Demo</h1>' +
    makeTable(data) +
    '<div class="alert alert-success"><pre>' + JSON.stringify(data, null, 2) + '</pre></div>');
}

var makeTable = function(data){
  var stuff = data.list.reduce(function(prev, current){
    return prev + '<tr><td>' + current.name + '</td><td>' + current.netId + '</td></tr>';
  }, '<div class=""><table class="table"><tr><th>Name</th><th>NetID</th></tr>') + '</table></div>';
  console.log(stuff);
  return stuff;
}
