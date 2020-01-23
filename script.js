//http://nflarrest.com/api/v1/player/arrests/Aldon%20Smith
//https://www.fantasyfootballnerd.com/service/players/json/pp964njgnuwu
//https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu


const nflArrestSite = "http://nflarrest.com/api/v1/player/arrests/";
// const nflTeamSite1 = "https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu";
// const nflPlayerSite1 = "https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu";
const nflTeamSite = "http://www.markstout.com/api/nfl/teams";
const nflPlayerSite = "http://www.markstout.com/api/nfl/players"
var playerName = "Aldon%20Smith";
var teamName = "KC";
var playerId = "3311"
getTeams();
//getTeamPlayers(teamName);
//getPlayer(playerId);
//getArrestInfo()

///////////////////////////////////////////////////////////
//get a single players info using the ID in the api
function getPlayer(playerId) {
    console.log(playerId);
    $.get({
        url: nflPlayerSite,
        method: "GET",
        dataType: 'json'
    })
        .then(function (response) {
            console.log(response);
            let playersUl = $('<ul/>').addClass('list-player');
            $("body").append(playersUl);
            response.Players.forEach(function (player) {
                if (player.playerId === playerId) {
                    console.log(player);
                    playersUl.append("<li class='list-player-item' player-name='" + player.displayName + "'>" + player.displayName + "<br>" + player.jersey + player.height + player.dob + "</li>");
                }
            })
        })
}

///////////////////////////////////////////////////////////
//list of players per team. Team is passed as the argument
function getTeamPlayers(team) {
    console.log(team);
    $.get({
        url: nflPlayerSite,
        method: "GET",
        dataType: 'json'
    })
        .then(function (response) {
            console.log(response);
            let playersUl = $('<ul/>').addClass('list-players');
            $("body").append(playersUl);
            response.Players.forEach(function (player) {
                if (player.team === teamName) {
                    console.log(player);
                    playersUl.append("<li class='list-players-item' player-code='" + player.playerId + "'>" + player.displayName + "</li>");
                }
            })
        })
}

///////////////////////////////////////////////////////////
//Function to get team info and update divs
function getTeams() {
    console.log("getTeams");
    $.get({
        url: nflTeamSite,
        method: "GET",
        dataType: 'json'
    })
        .then(function (response) {
            console.log(response);
            //let teamUl = $('<ul/>').addClass('list-team');
            //$("body").append(teamUl);

            console.log(response.NFLTeams.length);
            response.NFLTeams.forEach(function (team) {
                console.log(team.fullName);
                let teamDiv = $("<div>").addClass("teams");
                $("#teamcontainer").append(teamDiv);
                teamDiv.attr("team-name", team.code);
                teamDiv.append(team.fullName);

                //teamUl.append("<li class='list-team-item' team-code='" + team.code + "'>" + team.fullName + "</li>");
            })


        })
}
////////////////////////////////////////////////////////
// function to get the arrest info, and update divs
function getArrestInfo() {
    let arrestAjax = $.ajax({
<<<<<<< HEAD
      url: nflArrestSite + playerName,
      method: "GET",
      origin
=======
        url: nflArrestSite + playerName,
        method: "GET",
>>>>>>> f93cb166726b2c93166d1e5acb3c902ac73bfea6
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            console.log(response);

        })

}



 origin
