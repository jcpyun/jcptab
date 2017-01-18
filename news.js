/////////////////////
/*  
    news.js by jcpyun
*/
//////////////////////

/////////////// NEWS 

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


function quotes(){
  symbols=["EBAY","AAPL","MSFT","TSLA","GOOGL","AMZN"];
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
    "bbc-news":"BBC",
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
    // document.getElementById("modular").innerHTML ="<div class='compfont'>"+NEWSDict[source]+"</div>"+ output;
  }
  return "<div class='compfont'>"+NEWSDict[source]+"</div>"+ output;
}


function columnCreater(newsArray,n) // news is a list of news
{
  if (n==1){
    var output= '<div class="row">';
    for (var i=0; i<newsArray.length;i++){
      output += '<div class="col-12">'+ModularNews(newsArray[i],"top")+'</div>'
    }
    output += '</div>'
  }

 document.getElementById("modular").innerHTML=output;
}

document.addEventListener('DOMContentLoaded', function () {

  columnCreater(["bbc-news","the-new-york-times",  "hacker-news","google-news"],1);
  displaytime();

  quotes();
  // ModularNews("cnn","top");
   

  window.setInterval(displaytime, 1000);
  window.setInterval(quotes, 1000);

});






chrome.storage.sync.get(null, function (Items) {
    console.log(Items.columnSetting);
    var columnVal=Items.columnSetting;
    // document.getElementById('cur').textContent=columnVal;
    if (columnVal==1){
        $(document).ready(function() { 
            //  columnCreater(["bbc-news","the-new-york-times",  "hacker-news","google-news"],1);
            var els = document.getElementsByClassName('col-6');
            while (els.length) {els[0].className = 'col-12';}   
        });
    }
    if (columnVal==2){
        $(document).ready(function() { 
          // columnCreater(["bbc-news","the-new-york-times",  "hacker-news","google-news"],2);
            var els = document.getElementsByClassName('col-12');
            while (els.length) {els[0].className = 'col-6';}  
            // ModularNews("hacker-news","top"); 
        });
    }
});

