/* Written by jcpyun */
function displaytime(){var e=new Date,t=String(e.getHours()),n=String(e.getMinutes()),o=String(e.getSeconds());1==t.length&&(t=0+t),1==n.length&&(n=0+n),1==o.length&&(o=0+o);var s=t+":"+n+":"+o;document.getElementById("displaytime").innerHTML=s}function quotes(){symbols=["INDU:IND","SPX:IND","UKX:IND","NK1:IND","EURUSD:CUR","CL1:COM"],actual=["DJIA","S&P 500","FTSE 100","Nikkei 225 Future","EUR-USD","WTI-Crude"];for(var e="",t="",n=0;n<symbols.length;n++){xmlhttp.open("GET","https://www.bloomberg.com/markets/chart/data/1D/"+symbols[n],!1),xmlhttp.send();var o=JSON.parse(xmlhttp.responseText);if(0!=o.show_1D){if(datapoints=o.data_values,datapoints=o.data_values[datapoints.length-1][1],prevclose=o.prev_close,delta=datapoints-prevclose,delta=Math.round(1e4*delta)/1e4,percent=delta/prevclose*100,percent=Math.round(100*percent)/100,percent="(%"+String(percent)+")",delta>=0){s="green";delta=String(delta),delta="+"+delta}if(delta<0)var s="red";e+="<font color='white'>"+actual[n]+": </font><font color="+s+">"+datapoints+"&nbsp&nbsp"+delta+"&nbsp"+percent+"</font>&nbsp &nbsp &nbsp",t+="<font color='white'>"+actual[n]+"</font>:<font color="+s+">"+datapoints+"&nbsp&nbsp"+delta+"&nbsp"+percent+"</font>&nbsp &nbsp &nbsp"}}document.getElementById("quotes").innerHTML=e}function ModularNews(e,t){var n={cnn:"CNN","the-new-york-times":"The New York Times",bloomberg:"Bloomberg","bbc-news":"BBC","business-insider":"Business Insider","google-news":"Google News","the-economist":"The Economist","hacker-news":"Hacker News","national-geographic":"National Geographic",time:"Time",espn:"ESPN","the-wall-street-journal":"The Wall Street Journal",techcrunch:"TechCrunch"};xmlhttp.open("GET","https://newsapi.org/v1/articles?source="+e+"&sortBy="+t+"&apiKey=8a284b7114cc49efa3f55b969b850f9a",!1),xmlhttp.send();var o=JSON.parse(xmlhttp.responseText),s=[],a=(document.createElement("div"),document.createElement("br"),"");a+="<table class='jcptable'>";for(var l=0;l<o.articles.length;l++)s.push(o.articles[l].title),urllink=o.articles[l].url,a+="<tr>",a+='<td><a href="'+urllink+'">'+o.articles[l].title+"</a><br></span></td>",a+="<td id='articlePic' style='display:none;'>"+o.articles[l].description+"</td>",a+="<td id='articlePic' style='display:none;'>"+o.articles[l].urlToImage+"</td>",a+="</tr>";return a+="</table>","<div class='compfont'>"+n[e]+"</div>"+a}function columnCreater(e,t){n="";if(1==t){for(var n='<div class="row">',o=0;o<e.length;o++)n+='<div class="cols">'+ModularNews(e[o],"top")+"</div>";n+="</div>"}if(2==t){for(o=0;o<e.length-1;o+=2)n+='<div class="row">',n+='<div class="cols">'+ModularNews(e[o],"top")+"</div>",n+='<div class="cols">'+ModularNews(e[o+1],"top")+"</div>",n+="</div>";n+="</div>"}if(420==t){for(o=0;o<e.length-1;o+=2)n+='<div class="row">',n+='<div class="col-6">'+ModularNews(e[o],"top")+"</div>",n+='<div class="col-6">'+ModularNews(e[o+1],"top")+"</div>",n+="</div>";n+="</div>"}document.getElementById("modular").innerHTML=n,$("tr").click(function(){console.log($(this).find("a").attr("href")),window.location.replace($(this).find("a").attr("href"))}),$("tr").hover(function(){var e="";e+="<img src="+("'"+$(this).find("td:nth-child(3)").text()+"'")+' style="width:40%;height:auto;float:left;margin-right:10px;">',e+='<div style="float:right;width:55%;">'+$(this).find("td:nth-child(2)").text()+"</div>",$(".jcpdiv").remove(),console.log($(this).find("td:nth-child(2)").text()),console.log(event.pageX,event.pageY),console.log($(this).find("td:nth-child(3)").text()),createWidget("previewDiv","Article X-Ray",String(event.pageX)+"px",String(event.pageY)+"px",e),$(".jcpdiv").css("left",String(event.pageX)+"px"),$(".jcpdiv").css("top",String(event.pageY)+"px")})}function createWidget(e,t,n,o,s){var a="";a+='<div class="jcpdiv" id="'+e+'">',a+='<div class="jcpdivhead">',a+=t,a+="</div>",a+=s,a+="</div>",$(".articles").append(a),console.log(n,o,typeof n)}xmlhttp=new XMLHttpRequest,document.addEventListener("DOMContentLoaded",function(){displaytime(),quotes(),window.setInterval(displaytime,1e3),window.setInterval(quotes,1e3)}),document.forms[0].addEventListener("submit",function(){chrome.tabs.update({url:"https://www.google.com/search?q="+document.getElementById("tftextinput").value})},!1),chrome.storage.sync.get(null,function(e){var t=e.columnSetting,n=e.newsList;2!=t&&1!=t&&columnCreater(["bbc-news","bloomberg","business-insider","cnn","espn","google-news","hacker-news","national-geographic","techcrunch","the-economist","the-new-york-times","the-wall-street-journal","time"],420),1==t&&$(document).ready(function(){columnCreater(n,1);for(var e=document.getElementsByClassName("cols");e.length;)e[0].className="col-12"}),2==t&&$(document).ready(function(){columnCreater(n,2);for(var e=document.getElementsByClassName("cols");e.length;)e[0].className="col-6"})});