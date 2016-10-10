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
  $('#getData').click(function(ev){
    ev.preventDefault();
    remote.getCurrentWindow().webContents.openDevTools();
    $.ajax('https://students.cs.byu.edu/~cs236ta/helpqueue/getStatus.php?id=egm8',{
      success:function(data){
        console.log(data);
      }
    })
    return false;
  })
  $('#openDevTools').click(function(ev){
    ev.preventDefault();
    remote.getCurrentWindow().webContents.openDevTools();
    $.ajax('https://cas.byu.edu/cas/login?service=https%3A%2F%2Fstudents.cs.byu.edu%2F%7Ecs236ta%2Fhelpqueue%2F%3Flogin%3D',{
      success:function(data){
        console.log(data);
      },
      error:function(result){
        console.log(result);
      }
    })
    return false;
  })
})
