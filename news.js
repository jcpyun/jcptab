/////////////////////
/*  
    news.js by jcpyun
*/
//////////////////////
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
  var thour=String(temptime.getHours());
  var tminute=String(temptime.getMinutes());
  var tsecond=String(temptime.getSeconds());
  if (thour.length==1){
    thour=0+thour;
  }
  if (tminute.length==1){
    tminute=0+tminute;
  }
  if (tsecond.length==1){
    tsecond=0+tsecond;
  }
 
  
  var output= thour+":"+tminute+":"+tsecond;
  document.getElementById("displaytime").innerHTML=output;
}
// function msg(){
//     xmlhttp=new XMLHttpRequest();
//     xmlhttp.open("GET","https://qalantir.herokuapp.com/api/chrome/?format=json" , false);
//     xmlhttp.send();
//     var parseddata= JSON.parse(xmlhttp.responseText);
//     output= parseddata[parseddata.length-1].msg;
//     console.log(output);
//     document.getElementById("msg").innerHTML = output;
// }

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
    prevclose=parseddata.prev_close;
    delta= datapoints-prevclose;

    
    delta=Math.round(delta*100)/100;
    percent=delta/prevclose *100;
    percent=Math.round(percent*100)/100;
    percent="(%"+String(percent)+")";
    if (delta>=0){
      var colour="green";
      delta=String(delta);
      delta="+"+delta;
    }
    if (delta<0){
      var colour="red"
    }
    output+="<font color='white'>"+symbols[i]+"</font>"+ ":"+ "<font color="+colour+">"+datapoints+"&nbsp&nbsp"+delta+"&nbsp"+percent+"</font>"+"&nbsp &nbsp &nbsp"

    }
    // console.log(output);
    document.getElementById("quotes").innerHTML=output;
  
}


function ModularNews(source,sort){
  var NEWSDict={
    "cnn":"CNN",
    "the-new-york-times":"The New York Times",
    "bloomberg":"Bloomberg",
    "bbc":"BBC",
    "business-insider":"Business Insider",
    "google-news":"Google News",
    "the-economist":"The Economist",
    "hacker-news":"Hacker News",
  }
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
    output +="<div class='orfont'>"+'-<a href="'+urllink+'">'+parseddata.articles[i].title +"</a>"+ "<br>"+"</div>";
    document.getElementById("modular").innerHTML ="<div class='compfont'>"+NEWSDict[source]+"</div>"+ output;
  }
}


document.addEventListener('DOMContentLoaded', function () {
  bloombergNews();
  // msg();
  // window.setInterval(bloombergNews, 1000);
  BBCNews();
  // window.setInterval(BBCNews, 1000);
  OtherNews("cnn","top");
  // window.setInterval(OtherNews("cnn","top"), 1000);
  OtherNews("the-new-york-times","top");
  // window.setInterval(OtherNews("the-new-york-times","top"), 1000);
  // jcpyunfeed();
  quotes();
  ModularNews("cnn","top");
   ModularNews("business-insider","top");
  displaytime();
  window.setInterval(displaytime, 1000);
  window.setInterval(quotes, 1000);

});

//// Note: It only works on Packed extension for security reason: 
// refer: http://stackoverflow.com/questions/9421933/cross-origin-xmlhttprequest-in-chrome-extensions

/// from https://www.html5rocks.com/en/tutorials/cors/
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