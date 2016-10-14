var netID;

var remote = nodeRequire('electron').remote;

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
}
