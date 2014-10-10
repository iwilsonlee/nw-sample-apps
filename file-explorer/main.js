global.$ = $;

var abar = require('address_bar');
var folder_view = require('folder_view');
var path = require('path');
var shell = require('nw.gui').Shell;
var exec = require('child_process').exec,
last = exec('echo $HOME');

$(document).ready(function() {
  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  var home = document.getElementById('home');
  var documents = document.getElementById('documents');
  var pictures = document.getElementById('pictures');

  folder.open(process.cwd());
  addressbar.set(process.cwd());

  folder.on('navigate', function(dir, mime) {
    if (mime.type == 'folder') {
      addressbar.enter(mime);
    } else {
      shell.openItem(mime.path);
    }
  });

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  });

  last.stdout.on('data', function (data) {
    //  console.log('标准输出：' + data);
     var userPath = data.trim();
     home.addEventListener('click', function(){
       folder.open(userPath);
       addressbar.set(userPath);
     });
     documents.addEventListener('click', function(){
       folder.open(userPath+"/Documents");
       addressbar.set(userPath+"/Documents");
     });
     pictures.addEventListener('click', function(){
       folder.open(userPath+"/Pictures");
       addressbar.set(userPath+"/Pictures");
     });
  });

});
