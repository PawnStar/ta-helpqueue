var fileData = nodeRequire('./data.json');
var data;
var refreshUiInterval;
var refreshDataTimeout;

var remote = nodeRequire('electron').remote;

//DEBUG
//data = fileData;

$(document).ready(function(){
  var login = function(ev, callback){
    if(ev)
      ev.preventDefault();
    makeModal('<iframe src="' + 'https://cas.byu.edu/cas/login?service=https%3A%2F%2Fstudents.cs.byu.edu%2F%7Ecs236ta%2Fhelpqueue%2F%3Flogin%3D' + '" id="ajaxLoginFrame"></iframe>', callback);
    return false;
  }
  var logout = function(ev, callback){
    if(ev)
      ev.preventDefault();
    $.ajax('https://students.cs.byu.edu/~cs236ta/helpqueue/?logout=true',{
      error:function(err){
        console.log("Error logging in");
      },
      success: function(){
        if(callback)
          return callback();
      }
    })
    return false;
  }
  var refreshData = function(ev){
    $('#toolbar-button-refresh').addClass('spin');
    uiLoading();
    if(ev)
      ev.preventDefault();
    if(refreshUiInterval)
      clearInterval(refreshUiInterval);
    if(refreshDataTimeout)
      clearTimeout(refreshDataTimeout);
    $.ajax('https://students.cs.byu.edu/~cs236ta/helpqueue/getStatus.php?id=egm8',{
      success:function(result){
        //Check for logged-out status
        if(JSON.parse(result).status == 'loggedOut'){
          $('#toolbar-button-refresh').on('animationiteration', function(){
            $('#toolbar-button-refresh').removeClass('spin');
          })
          return login(null, refreshData);
        }

        //Success!
        data = JSON.parse(result);
        uiData(data);

        refreshUiInterval = setInterval(function(){
          uiData(data);
        },500)
        $('#toolbar-button-refresh').on('animationiteration', function(){
          $('#toolbar-button-refresh').removeClass('spin');
        })
        refreshDataTimeout = setTimeout(refreshData, 10000);
      }
    })
    return false;
  }


  //Login stuff
  var makeModal = function(src, callback){
    var checkFrame;
    $('<div id="loginModal"><div id="modal" class="modal fade" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Login Required</h4></div><div class="modal-body">'
        + src
        + '</div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div><!-- /.modal --></div>').appendTo('body');
    setTimeout(function(){
      $('#modal').modal({backdrop: 'static',show: true}).on('hidden.bs.modal', function(e){$('#loginModal').remove()});
    },300)
    checkFrame = function(){
      if($('#ajaxLoginFrame')[0].contentWindow.location.hostname == 'students.cs.byu.edu'){
        $('#loginModal').remove();
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
        return callback();
      }
      setTimeout(checkFrame,100);
    };
    $('#ajaxLoginFrame')[0].onload = function(){this.contentWindow.scrollTo(0,0)};
    checkFrame();
  }

  $('#logout').click(logout)
  $('#getData').click(refreshData);
  $('#toolbar-button-refresh').click(refreshData);

  // Toolbar stuff
  $('#toolbar-button-close').click(function(ev){
    ev.preventDefault();

    //Close all windows
    console.log(remote.chatWindows);
    for(var netID in remote.chatWindows){
      var window = remote.chatWindows[netID];
      try{
        window.close();
      }catch(e){
        console.log('chat with ' + netID + ' already closed');
      }
      window = null;
    }
    //Logout and close this one
    logout(null, remote.getCurrentWindow().close);
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
  refreshData(null);
})

setupChat = function(ev){
  ev.preventDefault();
  var netID = $(this).attr('data-netID');
  if(!remote.chatWindows)
    remote.chatWindows = {};
  try{
    remote.chatWindows[netID].restore()
  }
  catch(e){
    remote.chatWindows[netID] = new remote.BrowserWindow({
      width: 400,
      height: 600,
      frame: false,
    })
    remote.chatWindows[netID].loadURL(path.join(__dirname,'chat.html') + '#' + netID);
    remote.chatWindows[netID].setMenu(null);
  }
  return false;
}
