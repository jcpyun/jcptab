/////////////////////
/*  
    news.js by jcpyun
*/
//////////////////////

/*/////////////// 

bork bork bork

///////////////*/
xmlhttp=new XMLHttpRequest();
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
  //  symbols=["EBAY","AAPL","MSFT","TSLA","GOOGL","AMZN"]; 
    symbols=["INDU:IND","SPX:IND","UKX:IND","NK1:IND","EURUSD:CUR","CL1:COM"]; 
    actual=["DJIA","SP&P 500","FTSE 100","Nikkei 225 Future","EUR-USD","WTI-Crude"]
    var output=""
    var newoutput=""
    for (var i=0;i<symbols.length;i++){
    // xmlhttp.open("GET","https://www.bloomberg.com/markets/chart/data/1D/"+symbols[i]+":US" , false);
    xmlhttp.open("GET","https://www.bloomberg.com/markets/chart/data/1D/"+symbols[i] , false);
    xmlhttp.send();
    var parseddata = JSON.parse(xmlhttp.responseText);
    if (parseddata.show_1D == false){
      continue;
    }
    datapoints=parseddata.data_values;
    datapoints=parseddata.data_values[datapoints.length-1][1]
    prevclose=parseddata.prev_close;
    delta= datapoints-prevclose;

    
    delta=Math.round(delta*10000)/10000;
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
    output+="<font color='white'>"+actual[i]+"</font>"+ ":"+ "<font color="+colour+">"+datapoints+"&nbsp&nbsp"+delta+"&nbsp"+percent+"</font>"+"&nbsp &nbsp &nbsp"
    newoutput+="<font color='white'>"+actual[i]+"</font>"+ ":"+ "<font color="+colour+">"+datapoints+"&nbsp&nbsp"+delta+"&nbsp"+percent+"</font>"+"&nbsp &nbsp &nbsp"
    }
    document.getElementById("quotes").innerHTML=output;
}

function redditFeeder(){
  var apikey="8a284b7114cc49efa3f55b969b850f9a";
  xmlhttp.open("GET", "https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=top"+"&apiKey="+apikey, false);
  xmlhttp.send();
  var parseddata = JSON.parse(xmlhttp.responseText);
  var titles=[];
  var newDiv= document.createElement("div");
  var br = document.createElement("br");
  var output="";
  for (var i=0; i<parseddata.articles.length;i++){
    titles.push(parseddata.articles[i].title);
    urllink=parseddata.articles[i].url;
    output +="<font color='white'>"+'-<a href="'+urllink+'">'+parseddata.articles[i].title +"</a>"+"</font>";
  }
  document.getElementById("reddit").innerHTML=output;
}



  // http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=GOOG&callback=myFunction

// function quotes(){
//    symbols=["EBAY","AAPL","MSFT","TSLA","GOOGL","AMZN"]; 
//     var output=""
//     for (var i=0;i<symbols.length;i++){
//     xmlhttp.open("GET","http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol="+symbols[i]+":US" , false);
//     xmlhttp.send();
//     var parseddata = JSON.parse(xmlhttp.responseText);
//     if (parseddata.status == false){
//       continue;
//     }
//     datapoints=parseddata.data_values;
//     datapoints=parseddata.data_values[datapoints.length-1][1]
//     prevclose=parseddata.prev_close;
//     delta= parsed.data;

    
//     delta=Math.round(delta*100)/100;
//     percent=delta/prevclose *100;
//     percent=Math.round(percent*100)/100;
//     percent="(%"+String(percent)+")";
//     if (delta>=0){
//       var colour="green";
//       delta=String(delta);
//       delta="+"+delta;
//     }
//     if (delta<0){
//       var colour="red"
//     }
//     output+="<font color='white'>"+symbols[i]+"</font>"+ ":"+ "<font color="+colour+">"+datapoints+"&nbsp&nbsp"+delta+"&nbsp"+percent+"</font>"+"&nbsp &nbsp &nbsp"

//     }
//     document.getElementById("quotes").innerHTML=output;
// }

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
    "national-geographic":"National Geographic",
    "time":"Time"
  }
  var apikey="8a284b7114cc49efa3f55b969b850f9a";

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
  }
  return "<div class='compfont'>"+NEWSDict[source]+"</div>"+ output;
}


function columnCreater(newsArray,n)
{

  var output="" 
  if (n==1){
    var output= '<div class="row">';
    for (var i=0; i<newsArray.length;i++){
      output += '<div class="cols">'+ModularNews(newsArray[i],"top")+'</div>'
    }
    output += '</div>'
  }
  if (n==2){
    var output;
    for (var i=0; i<(newsArray.length)-1;i+=2){
      output +=  '<div class="row">';
      output += '<div class="cols">'+ModularNews(newsArray[i],"top")+'</div>'
      output += '<div class="cols">'+ModularNews(newsArray[i+1],"top")+'</div>'
      output += '</div>'
    }
    output += '</div>'
  }
  if (n==420){
    var output;
    for (var i=0; i<(newsArray.length)-1;i+=2){
      output +=  '<div class="row">';
      output += '<div class="col-6">'+ModularNews(newsArray[i],"top")+'</div>'
      output += '<div class="col-6">'+ModularNews(newsArray[i+1],"top")+'</div>'
      output += '</div>'
    }
    output += '</div>'
  }
 document.getElementById("modular").innerHTML=output;
}
document.addEventListener('DOMContentLoaded', function () {  
  displaytime();
  quotes();
  redditFeeder();
  window.setInterval(displaytime, 1000);
  window.setInterval(quotes, 1000);
  window.setInterval(redditFeeder, 1000);
});






chrome.storage.sync.get(null, function (Items) {
  console.log(Items);
    var columnVal=Items.columnSetting;
    var newsList=Items.newsList;
  //  console.log(columnVal);
  //  console.log(newsList);
   if ((columnVal!= 2) && (columnVal!=1)){
         columnCreater(["bloomberg","bbc-news","google-news",  "the-economist"],420); 
   }
    if (columnVal==1){
        $(document).ready(function() { 
             columnCreater(newsList,1);
     
            var els = document.getElementsByClassName('cols');
            while (els.length) {els[0].className = 'col-12';}   
        });
    }
    if (columnVal==2){
        $(document).ready(function() { 
          // console.log("it reached here");
          columnCreater(newsList,2);
            var els = document.getElementsByClassName('cols');
            while (els.length) {els[0].className = 'col-6';}   
        });
    }
});

