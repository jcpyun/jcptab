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
  
  // document.getElementById("headertime").innerHTML=output;
}


function quotes(){
    symbols=["INDU:IND","SPX:IND","UKX:IND","NK1:IND","EURUSD:CUR","CL1:COM"]; 
    actual=["DJIA","S&P 500","FTSE 100","Nikkei 225 Future","EUR-USD","WTI-Crude"]
    var output=""
    var newoutput=""
    for (var i=0;i<symbols.length;i++){
   
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
    output+="<font color='white'>"+actual[i]+ ": "+"</font>"+ "<font color="+colour+">"+datapoints+"&nbsp&nbsp"+delta+"&nbsp"+percent+"</font>"+"&nbsp &nbsp &nbsp"
    newoutput+="<font color='white'>"+actual[i]+"</font>"+ ":"+ "<font color="+colour+">"+datapoints+"&nbsp&nbsp"+delta+"&nbsp"+percent+"</font>"+"&nbsp &nbsp &nbsp"
    }
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
    "national-geographic":"National Geographic",
    "time":"Time",
    "espn":"ESPN",
    "the-wall-street-journal":"The Wall Street Journal",
    "techcrunch":"TechCrunch",
  }
  var apikey="8a284b7114cc49efa3f55b969b850f9a";

  xmlhttp.open("GET", "https://newsapi.org/v1/articles?source="+source+"&sortBy="+sort+"&apiKey="+apikey, false);
  xmlhttp.send();
  var parseddata = JSON.parse(xmlhttp.responseText);

  var titles=[];
  var newDiv= document.createElement("div");
  var br = document.createElement("br");
  var output="";
  output+="<table class='jcptable'>"
  for (var i=0; i<parseddata.articles.length;i++){
    titles.push(parseddata.articles[i].title);
    urllink=parseddata.articles[i].url;
    output +="<tr>"
    output += "<td>"+'<a href="'+urllink+'">'+parseddata.articles[i].title+"</a>"+ "<br>"+"</span>"+"</td>"
    output += "<td id='articlePic' style='display:none;'>"+parseddata.articles[i].description+"</td>"
    output += "<td id='articlePic' style='display:none;'>"+parseddata.articles[i].urlToImage+"</td>"
    output += "</tr>";
    // output +='<tr onclick="window.location=\'http://example.com \' " >'+'<td>'+parseddata.articles[i].title+ "<br>"+"</span>"+"</td>"+"</tr>";
// onclick="window.location=\'http://example.com \' "
  //  onclick=
  }
  output +="</table>"
  // for (var i=0; i<parseddata.articles.length;i++){
  //   titles.push(parseddata.articles[i].title);
  //   urllink=parseddata.articles[i].url;
  //   output +="<div class='orfont'>"+'-<a href="'+urllink+'">'+parseddata.articles[i].title +"</a>"+ "<br>"+"</div>";
  // }
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

  $("tr").click(function() {
      console.log($(this).find("a").attr("href"));
      window.location.replace($(this).find("a").attr("href"))
  });
  $( "tr" ).hover(function(){
      var imgurl="'"+$(this).find('td:nth-child(3)').text()+"'"
      var i=""
      i+='<img src='+imgurl+' style="width:40%;height:auto;float:left;margin-right:10px;">'
      i+= '<div style="float:right;width:55%;">'+$(this).find('td:nth-child(2)').text()+'</div>'
      $(".jcpdiv").remove();
      // console.log($(this))
       console.log($(this).find('td:nth-child(2)').text());
       console.log(event.pageX,event.pageY)
       console.log($(this).find('td:nth-child(3)').text())
       createWidget("previewDiv","Article X-Ray",String(event.pageX)+"px",String(event.pageY)+"px",i)
       $(".jcpdiv").css("left", String(event.pageX)+"px");
       $(".jcpdiv").css("top", String(event.pageY)+"px");
  })
}
document.addEventListener('DOMContentLoaded', function () {  
  displaytime();
  quotes();

  window.setInterval(displaytime, 1000);
  window.setInterval(quotes, 1000);

});
document.forms[0].addEventListener('submit', function() {
  chrome.tabs.update({url:'https://www.google.com/search?q='
                           + document.getElementById('tftextinput').value});
    // window.location.href = 'https://www.google.com.com?q='
    //                        + document.getElementById('tftextinput').value;
}, false);




chrome.storage.sync.get(null, function (Items) {

    var columnVal=Items.columnSetting;
    var newsList=Items.newsList;
 
   if ((columnVal!= 2) && (columnVal!=1)){
         columnCreater(["bbc-news","bloomberg","business-insider","cnn","espn", "google-news","hacker-news","national-geographic","techcrunch","the-economist", "the-new-york-times","the-wall-street-journal","time"],420); 
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

          columnCreater(newsList,2);
            var els = document.getElementsByClassName('cols');
            while (els.length) {els[0].className = 'col-6';}   
        });
    }
});


function createWidget(idname,titlename,xcoord,ycoord,context){
    var idvar="";
    idvar+='<div class="jcpdiv" id="'+idname+'">'
    idvar+='<div class="jcpdivhead">'
    idvar+=titlename
    idvar+='</div>'
    idvar+=context
    idvar+='</div>'
    $(".articles").append(idvar);
    console.log(xcoord,ycoord,typeof(xcoord))

}