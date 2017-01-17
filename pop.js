// pop.js
// Designed by jcpyun in Seoul


var optionsUrl = chrome.extension.getURL("options.html"); 
var content = '<a href="' + optionsUrl + '" target="_blank">Settings</a>';

function saveChanges(){
    var checked;
}

      function saveChanges() {
        // Get a value saved in a form.
        var theValue = textarea.value;
        // Check that there's some code there.
        if (!theValue) {
          message('Error: No value specified');
          return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'value': theValue}, function() {
          // Notify that we saved.
          message('Settings saved');
        });
      }

document.getElementById("wowow").innerHTML=content;
