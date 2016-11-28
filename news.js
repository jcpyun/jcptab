
function bloombergNews(){
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET", "https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=8a284b7114cc49efa3f55b969b850f9a", false);
  xmlhttp.send();
  var parseddata = JSON.parse(xmlhttp.responseText);

  var titles=[];
  var newDiv= document.createElement("div");
  var br = document.createElement("br");
  var output="";
  for (var i=0; i<parseddata.articles.length;i++){
    titles.push(parseddata.articles[i].title);
    output += parseddata.articles[i].title + "<br>";
    document.getElementById("bloomberg").innerHTML = output;
  }
}
function BBCNews(){
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET", "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=8a284b7114cc49efa3f55b969b850f9a", false);
  xmlhttp.send();
  var parseddata = JSON.parse(xmlhttp.responseText);

  var titles=[];
  var newDiv= document.createElement("div");
  var br = document.createElement("br");
  var output="";
  for (var i=0; i<parseddata.articles.length;i++){
    titles.push(parseddata.articles[i].title);
    output += parseddata.articles[i].title + "<br>";
    document.getElementById("bbc").innerHTML = output;
  }
}



function OtherNews(source,sort){
  var apikey="8a284b7114cc49efa3f55b969b850f9a";
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET", "https://newsapi.org/v1/articles?source="+source+"&sortBy="+sort+"&apiKey="+apikey, false);
  xmlhttp.send();
  var parseddata = JSON.parse(xmlhttp.responseText);

  var titles=[];
  var newDiv= document.createElement("div");
  var br = document.createElement("br");
  var output="";
  for (var i=0; i<parseddata.articles.length;i++){
    titles.push(parseddata.articles[i].title);
    output += parseddata.articles[i].title + "<br>";
    document.getElementById(source).innerHTML = output;
  }
}



document.addEventListener('DOMContentLoaded', function () {
  bloombergNews();
  BBCNews();
  OtherNews("cnn","top");
  OtherNews("the-new-york-times","popular");

});