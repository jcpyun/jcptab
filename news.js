xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET", "https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=8a284b7114cc49efa3f55b969b850f9a", false);
xmlhttp.send();
var parseddata = JSON.parse(xmlhttp.responseText);
console.log(parseddata);
function bloombergNews(){
    document.getElementById("bloomberg").innerHTML = parseddata.articles;
    // for (var i=0; i<parseddata.articles.length;i++){
    //     console.log(parseddata.articles[i].title);
    //     var newstitle;
    //     newstitle+= parseddata.articles[i].title;
    //     document.getElementById("bloomberg").innerHTML = newstitle;
    // }
}

document.addEventListener('DOMContentLoaded', function () {
  bloombergNews();

});