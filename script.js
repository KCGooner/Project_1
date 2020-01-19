//http://nflarrest.com/api/v1/player/arrests/Aldon%20Smith
//https://www.fantasyfootballnerd.com/service/players/json/pp964njgnuwu
//https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu

const nflArrestSite = "http://nflarrest.com/api/v1/player/arrests/";
const nflTeamSite = "https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu";
const nflPlayerSite = "https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu";
var playerName = "Aldon%20Smith";

getTeams();
getArrestInfo()

function getTeams(){
  console.log("getTeams");
  $.get({
    url: nflTeamSite,
    method: "GET",
    //crossDomain: true,
    dataType: 'json'
  })
  .then(function (response1) {
    console.log(response1);
  })
}

function getArrestInfo() {
    let arrestAjax = $.ajax({
      url: nflArrestSite + playerName,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        console.log(response);
        
      })
  
  }


