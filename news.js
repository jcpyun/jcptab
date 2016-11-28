
function jcpyunfeed(){
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET", "https://www.facebook.com", false);
  xmlhttp.send();
  var parseddata = JSON.parse(xmlhttp.responseText);
  console.log(parseddata);
}

/////////////// NEWS 
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
    urllink=parseddata.articles[i].url;
    output += '-<a href="'+urllink+'">'+parseddata.articles[i].title +"</a>"+ "<br>";
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
    urllink=parseddata.articles[i].url;
    output += '-<a href="'+urllink+'">'+parseddata.articles[i].title +"</a>"+ "<br>";
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
    urllink=parseddata.articles[i].url;
    output += '-<a href="'+urllink+'">'+parseddata.articles[i].title +"</a>"+ "<br>";
    document.getElementById(source).innerHTML = output;
  }
}
///////////////
function displaytime(){
  var temptime= new Date();
  var output= String(temptime.getHours())+":"+String(temptime.getMinutes())+":"+String(temptime.getSeconds());
  document.getElementById("displaytime").innerHTML=output;
}

function quotes(){
  symbols=["AAPL","EBAY","MSFT","TSLA","GOOGL","AMZN"];
  for (var i = 0; i<symbols.length;i++){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","http://www.bloomberg.com/markets/chart/data/1D/"+symbols[i]+":US" , false);
    xmlhttp.send();
    var parseddata = JSON.parse(xmlhttp.responseText);
    
  }
}
// def cleaner():
//     symbols=["AAPL","EBAY","MSFT","TSLA","GOOGL","AMZN"]
//     res={}
//     for x in symbols:
//         htmltext=urllib.urlopen("http://www.bloomberg.com/markets/chart/data/1D/"+x+":US")
//         data=json.load(htmltext)
//         datapoints=data["data_values"]
//         datapoints=data["data_values"][len(datapoints)-1][1]
//         res.setdefault(x,0)
//         res[x]=datapoints
//     return res


document.addEventListener('DOMContentLoaded', function () {
  bloombergNews();
  BBCNews();
  OtherNews("cnn","top");
  OtherNews("the-new-york-times","top");
  // jcpyunfeed();
  displaytime();
  window.setInterval(displaytime, 1000);

});