const pug = nodeRequire('pug')
const path = nodeRequire('path')
const moment = nodeRequire('moment-timezone')

const studentsWaiting = pug.compileFile(path.join(__dirname,'templates/waiting.pug'));
const studentsBeingHelped = pug.compileFile(path.join(__dirname,'templates/beinghelped.pug'));

var uiLoading = function(){
}

var uiData = function(data){
  $('#mainContent').html('<h1>CS 236 Help Queue Demo</h1>' +
    studentsBeingHelped({list: data.list.filter(function(student){
      return student.beingHelpedBy;
    }), moment: moment}) +
    studentsWaiting({list: data.list.filter(function(student){
      return !student.beingHelpedBy;
    }), moment: moment}) + '<div class="alert alert-success"><pre>' + JSON.stringify(data, null, 2) + '</pre></div>');
}

var makeTable = function(data){
  var stuff = data.list.reduce(function(prev, current){
    return prev + '<tr><td>' + current.name + '</td><td>' + current.netId + '</td><td>' + current.question + '</td><td>' + current.enqueueTime + '</td></tr>';
  }, '<div class=""><table class="table"><tr><th>Name</th><th>NetID</th><th>Question</th><th>Time waiting</th></tr>') + '</table></div>';
  console.log(stuff);
  return stuff;
}
