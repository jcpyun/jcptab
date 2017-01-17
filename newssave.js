function save_options() {
  var column = document.getElementById('columnOptions').value;
  chrome.storage.sync.set({
    columnPreference: column,

  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    columnPreference: '2',
  }, function(items) {
    document.getElementById('currentColumn').value = items.columnPreference;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);

