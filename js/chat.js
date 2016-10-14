var netID;
var name;
var startingState;

var remote = nodeRequire('electron').remote;
const pug = nodeRequire('pug');
const path = nodeRequire('path');
const chatLayout = pug.compileFile(path.join(__dirname,'templates/chat.pug'));
const chatWindow = pug.compileFile(path.join(__dirname,'templates/chatWindow.pug'));

setupWindow = function(param){
  netID = param;
  // Toolbar stuff
  $('#toolbar-button-close').click(function(ev){
    ev.preventDefault();
    console.log(remote.chatWindows);
    remote.getCurrentWindow().close();
    return false;
  })
  $('#toolbar-button-minimize').click(function(ev){
    ev.preventDefault();
    remote.getCurrentWindow().minimize();
    return false;
  })
  $('#toolbar-button-maximize').click(function(ev){
     var window = remote.getCurrentWindow();
     if (!window.isMaximized()) {
       window.maximize();
     } else {
       window.unmaximize();
     }
  })
  document.title = netID;
  $('#title').html('Chat with ' + netID);

  console.log(netID);

  $('#nameForm').submit(function(ev){
    ev.preventDefault();
    name = $('#nameInput').val();
    if(name == '')
      return alert("You need to enter a name.", "Name Invalid")
    $.ajax({
      type:'post',
      url:'https://students.cs.byu.edu/~cs236ta/helpqueue/process.php',
      dataType:'json',
      data:{
        function:'getState',
        name:netID
      },
      success:function(result){
        startingState = result.state;
        $.ajax({
          type:'post',
          url:'https://students.cs.byu.edu/~cs236ta/helpqueue/process.php',
          dataType:'json',
          data:{
            function:'notify',
            name:netID
          },
          success:function(result){
            $('#mainContent').html(chatLayout());
            $('#chatControls').submit(sendMessage);
            setInterval(reprintWindow,500);
          }
        })
      }
    })
    return false;
  })
}

reprintWindow = function(){
  $.ajax({
    type:'post',
    url:'https://students.cs.byu.edu/~cs236ta/helpqueue/process.php',
    dataType:'json',
    data:{
      function:'update',
      name:netID,
      state:startingState
    },
    success:function(result){
      $('#chatWindow').html(chatWindow({messages:result.text}))
    }
  })
}

sendMessage = function(ev){
  ev.preventDefault();
  var message = $('#textInput').val();
  $('#textInput').val('');
  $.ajax({
    type:'post',
    url:'https://students.cs.byu.edu/~cs236ta/helpqueue/process.php',
    dataType:'json',
    data:{
      function:'send',
      name:netID,
      nickname:name,
      state:startingState,
      message:message
    }
  })
  return false;
}
