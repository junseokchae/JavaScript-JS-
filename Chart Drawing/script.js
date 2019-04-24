document.getElementById("title").innerHTML = "Current Standings of English Premier League";
let url = 'https://api.football-data.org/v2/competitions/PL/standings';
fetch(url, {
    headers: {
        "X-Auth-Token": "1c2860743d664531ba9cc0cacc44ea9c"
    }
})
.then(function(response){
    return response.json();
})
.then(function(json){
  var objResult = json;
  console.log("Imported Data");
  console.log(objResult);
  var table = objResult.standings[0].table;
  console.log(table);
  
  var width = 500;
  var height = 150;
  var container = document.getElementById("graph");
  container.style.margin = 50;

  var svg = d3.select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height",height);
  var xScale = d3.scaleBand()
    .domain(table.map(function(d){return d.position}))
    .rangeRound([0,width-50]);
  var yScale = d3.scaleLinear()
    .domain([0,100])
    .range([100,0]);

  svg.selectAll("rect")
    .data(table)
    .enter().append("rect")
    .attr("x", function (d) {return xScale(d.position)+30})
    .attr("y", function (d) {return yScale(d.points)+10})
    .attr("height", function (d) { return height - yScale(d.points)-50})
    .attr("width", 20)
    .attr("fill", "skyblue");


  var xAxis = d3.axisBottom()
    .scale(xScale);
  svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(20,110)")
    .call(xAxis)
  svg.select(".axis").selectAll("text").remove();
  var ticks = svg.select(".axis").selectAll(".tick")
    .data(table)
    .append("svg:image")
    .attr("xlink:href", function (d) {return d.team.crestUrl;})
    .attr("width", 20)
    .attr("height", 20);

  
  var yAxis = d3.axisLeft()
    .scale(yScale);
  svg.append("g")
    .attr("class","axis")
    .attr("transform", "translate(30,10)")
    .call(yAxis);
  /*
        Create a new Picker instance and set the parent element.
        By default, the color picker is a popup which appears when you click the parent.
    */
   var parent = document.querySelector('#graph');
   var picker = new Picker(parent);

   /*
       You can do what you want with the chosen color using two callbacks: onChange and onDone.
   */
   picker.onChange = function(color) {
	   parent.style.background = color.rgbaString();
   };


})
/*
Today's Matches: https://api.football-data.org/v2/matches
Get all matches of the Champions League: https://api.football-data.org/v2/competitions/CL/matches
See all upcoming matches for Real Madrid: https://api.football-data.org/v2/teams/86/matches?status=SCHEDULED
Get all matches where Gigi Buffon was in the squad: https://api.football-data.org/v2/players/2019/matches?status=FINISHED
Check schedules for Premier League on matchday 11: https://api.football-data.org/v2/competitions/PL/matches?matchday=11
Get the league table for HOME matches only of Belgiums Jupiler Pro League: https://api.football-data.org/v2/competitions/BJL/standings?standingType=HOME
See best 10 scorers of Italy's top league (scorers subresource defaults to limit=10): https://api.football-data.org/v2/competitions/SA/scorers

Tottenham Hotspur: https://api.football-data.org/v2/teams/73
*/