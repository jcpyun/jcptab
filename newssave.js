// function save_options() {
//   var column = document.getElementById('columnOptions').value;
//   chrome.storage.sync.set({
//     columnPreference: column,
//   }, function() {
//     // Update status to let user know options were saved.
//     var status = document.getElementById('status');
//     status.textContent = 'Options saved.';
//     setTimeout(function() {
//       status.textContent = '';
//     }, 750);
//   });
//   console.log("save wow");
// }
//////////


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    columnPreference: '2',
  }, function(items) {
    // document.getElementById('currentColumn').value = items.columnPreference;
    // document.getElementById('like').checked = items.likesColor;
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

    // var x = document.getElementsByName("fname")[0].value
    chrome.storage.sync.set({"columnSetting":column,"newsList":newsList }, function() {
          // Notify that we saved.
          console.log('Settings saved');
          
              // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved. Please refresh the tab.';
        setTimeout(function() {
        status.textContent = '';
        }, 1200);

        });
    // document.getElementById("currentColumnStatus").textContent=chrome.storage.sync.get(columnSetting);
    
    
   
    chrome.storage.sync.get(null, function (Items) {console.log(Items.newsList)});
}
document.getElementById('columnSave').addEventListener('click',saver);


// var matches = ["wowl","sup"];
// $(".className:checked").each(function() {
//     matches.push(this.value);
// });