function jcpyunfeed(){ //for local debugging purpose
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET", "http://127.0.0.1:8000/media/traffic.json", false);
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
  symbols=["EBAY","AAPL","MSFT","TSLA","GOOGL","AMZN"];


// var url = 'https://www.bloomberg.com/markets/chart/data/1D/AAPL:US';
// var xhr = createCORSRequest('GET', url);
// xhr.withCredentials = false;
// console.log(xhr)
// xhr.send();
  
    // var xhr= new XMLHttpRequest();
    // xhr.withCredentials = false;
    
    // xhr.open("GET","https://www.bloomberg.com/markets/chart/data/1D/AAPL:US" ,true);
    // // xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    // xhr.onreadystatechange=function(){
    //   if (xhr.readyState==4){
    //     var resp=JSON.parse(xhr.responseText);
    //     console.log(resp);
    //   }
    // }
    // xhr.send();



    // console.log(resp);
    var output=""
    for (var i=0;i<symbols.length;i++){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","https://www.bloomberg.com/markets/chart/data/1D/"+symbols[i]+":US" , false);
    xmlhttp.send();
    var parseddata = JSON.parse(xmlhttp.responseText);
    // console.log(parseddata);
    datapoints=parseddata.data_values;
    datapoints=parseddata.data_values[datapoints.length-1][1]
    // console.log(datapoints);
    output+=symbols[i]+":"+datapoints+"&nbsp &nbsp &nbsp"

    }
    // console.log(output);
    document.getElementById("quotes").innerHTML=output;
  
}



document.addEventListener('DOMContentLoaded', function () {
  bloombergNews();
  BBCNews();
  OtherNews("cnn","top");
  OtherNews("the-new-york-times","top");
  // jcpyunfeed();
  quotes();
  displaytime();
  window.setInterval(displaytime, 1000);

});

//// Note: It only works on Packed extension for security reason: 
// refer: http://stackoverflow.com/questions/9421933/cross-origin-xmlhttprequest-in-chrome-extensions

/// thank you https://www.html5rocks.com/en/tutorials/cors/
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
////////////////
