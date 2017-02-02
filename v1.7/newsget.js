chrome.storage.sync.get(null, function (Items) {
    console.log(Items.columnSetting);
    var columnVal=Items.columnSetting;
    // document.getElementById('cur').textContent=columnVal;
    if (columnVal==1){
        $(document).ready(function() { 
             
            var els = document.getElementsByClassName('col-6');
            while (els.length) {els[0].className = 'col-12';}   
        });
    }
    if (columnVal==2){
        $(document).ready(function() { 
            var els = document.getElementsByClassName('col-12');
            while (els.length) {els[0].className = 'col-6';}   
        });
    }
});

// $(document).ready(function() {
//     $( ".articles" ).append('\
//     <div class="row">\
//         <div class="col-6">\
//             <div class= "compfont">\
//                 BBC\
//             </div>\
//             <div class= "orfont">\
//                 <div id="bbc"></div>\
//             </div>\
//         </div>\
//         <div class="col-6">\
//             <div class= "compfont">\
//                 The New York Times\
//             </div>\
//             <div class= "orfont">\
//                 <div id="the-new-york-times"></div>\
//             </div>\
//         </div>\
//     </div>\
//     ');
// });