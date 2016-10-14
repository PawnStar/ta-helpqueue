const pug = nodeRequire('pug')
const path = nodeRequire('path')
const moment = nodeRequire('moment-timezone')

const studentsWaiting = pug.compileFile(path.join(__dirname,'templates/waiting.pug'));
const studentsBeingHelped = pug.compileFile(path.join(__dirname,'templates/beinghelped.pug'));

var uiLoading = function(){
}

var uiData = function(data){
  var newData = data;
  newData.stats = 'too long to show';
  $('#mainContent').html('<h1>CS 236 Help Queue Demo</h1>' +
    studentsBeingHelped({list: data.list.filter(function(student){
      return student.beingHelpedBy;
    }), moment: moment}) +
    studentsWaiting({list: data.list.filter(function(student){
      return !student.beingHelpedBy;
    }), moment: moment}));

  $('.chat-button').click(setupChat)
}
