

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
  }, function(items) {
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click',save_options);
function saver(){
    var column = document.getElementById('columnOptions').value;
    // var news = document.getElementById('columnOptions').value;
    var newsList=[];
    for (var i=0; i<document.getElementsByName("News").length;i++){
        if (document.getElementsByName("News")[i].checked){
        newsList.push(document.getElementsByName("News")[i].id)
        }
    }
    var symbolList=[];
    chrome.storage.sync.set({
      "columnSetting":column,
      "newsList":newsList,
      "symbolList":symbolList,
     }, function() {
          // Notify that we saved.
          console.log('Settings saved');
          
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved. Please refresh the tab.';
        setTimeout(function() {
        status.textContent = '';
        }, 1200);

        });
    
    chrome.storage.sync.get(null, function (Items) {
      console.log(Items.newsList);
 
    });
}
document.getElementById('columnSave').addEventListener('click',saver);

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(null, function (Items) {
      // console.log(Items.newsList);
      for (var i=0; i<Items.newsList.length;i++){
        document.getElementById(Items.newsList[i]).checked=true;
        // document.getElementById("columnOptions").options
      }
    });
});

// var matches = ["wowl","sup"];
// $(".className:checked").each(function() {
//     matches.push(this.value);
// });