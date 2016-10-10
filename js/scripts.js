$(document).ready(function(){
  var remote = nodeRequire('electron').remote;
  //Toolbar buttons, because custom
  $('#toolbar-button-close').click(function(ev){
    ev.preventDefault();
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
  $('#openDevTools').click(function(ev){
    ev.preventDefault();
    remote.getCurrentWindow().webContents.openDevTools();
    return false;
  })
})
