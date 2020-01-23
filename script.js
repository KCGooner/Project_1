//http://nflarrest.com/api/v1/player/arrests/Aldon%20Smith
//https://www.fantasyfootballnerd.com/service/players/json/pp964njgnuwu
//https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu

const nflArrestSite = "http://nflarrest.com/api/v1/player/arrests/";
// const nflTeamSite1 = "https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu";
// const nflPlayerSite1 = "https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu";
const nflTeamSite = "http://www.markstout.com/api/nfl/teams";
const nflPlayerSite = "http://www.markstout.com/api/nfl/players"
var playerName = "Aldon%20Smith";
//var teamName = "KC";
//var playerId = "3311"
getTeams();

$(document).on("click", ".teams", function () {
    getTeamPlayers($(this).attr("team-name"))
});
$(document).on("click", ".team", function () {
    getPlayer($(this).attr("player-code"));
});
$(document).on("click", ".player", function () {
    getArrestInfo($(this).attr("player-name"));
})
//getTeamPlayers(teamName);
//getPlayer(playerId);
getArrestInfo()

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
            //let playersUl = $('<ul/>').addClass('list-player');
            //$("body").append(playersUl);
            $("#teamcontainer").empty();
            response.Players.forEach(function (player) {
                if (player.playerId === playerId) {
                    console.log(player);
                    let playerDiv = $("<div>").addClass("player");
                    $("#teamcontainer").append(playerDiv);
                    playerDiv.attr("player-name", player.displayName);
                    playerDiv.append(player.displayName);
                    let statDiv = $("<div>").addClass("playerStat");
                    $("#teamcontainer").append(statDiv);
                    statDiv.append("<div class='jersey'>Number: " + player.jersey + "</div>");
                    statDiv.append("<div class='position'>Position: " + player.position + "</div>");
                    statDiv.append("<div class='height'>Height: " + player.height + "</div>");
                    statDiv.append("<div class='weight'>Weight: " + player.weight + "</div>");
                    statDiv.append("<div class='college'>College: " + player.college + "</div>");
                    statDiv.append("<div class='DOB'>DOB: " + player.dob + "</div>");
                }
            })
        })
}

///////////////////////////////////////////////////////////
//list of players per team. Team is passed as the argument
function getTeamPlayers(team) {
    console.log(team);
    console.log("here");
    $.get({
        url: nflPlayerSite,
        method: "GET",
        dataType: 'json'
    })
        .then(function (response) {
            console.log(response);
            $("#teamcontainer").empty();
            //let playersUl = $('<ul/>').addClass('list-players');
            //$("body").append(playersUl);
            response.Players.forEach(function (player) {
                if (player.team === team) {
                    console.log(player);
                    let playersDiv = $("<div>").addClass("team");
                    $("#teamcontainer").append(playersDiv);
                    playersDiv.attr("player-code", player.playerId);
                    playersDiv.append(player.displayName);

                    //playersUl.append("<li class='list-players-item' player-code='" + player.playerId + "'>" + player.displayName + "</li>");
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
            $("#teamcontainer").empty();
            console.log(response.NFLTeams.length);
            response.NFLTeams.forEach(function (team) {
                console.log(team.fullName);
                let teamDiv = $("<div>").addClass("teams");
                $("#teamcontainer").append(teamDiv);
                teamDiv.attr("team-name", team.code);
                teamDiv.append(team.fullName);


                // $(".teams").style.backgroundColor = "gray";

                // // teams.style.backgroundColor = "gray";

                // teamDiv.style.backgroundColor = "gray";

                //teamUl.append("<li class='list-team-item' team-code='" + team.code + "'>" + team.fullName + "</li>");
            })


        })
}
////////////////////////////////////////////////////////
// function to get the arrest info, and update divs
function getArrestInfo(playerName) {
    console.log(playerName);
    let arrestAjax = $.ajax({
        url: nflArrestSite + playerName,
        method: "GET",
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            console.log(response);
            let guiltyDiv = $("<div>").addClass("guilty");
            $("#teamcontainer").append(guiltyDiv);
            //plaDiv.attr("player-name", player.displayName);
            guiltyDiv.append(response[0].Name + response[0].Team_name + response[0].Category + response[0].Description + response[0].Outcome);
            // let statDiv = $("<div>").addClass("playerStat");
            // $("#teamcontainer").append(statDiv);
            // statDiv.append("<div class='jersey'>Number: " + player.jersey + "</div>");
            // statDiv.append("<div class='position'>Position: " + player.position + "</div>");
            // statDiv.append("<div class='height'>Height: " + player.height + "</div>");
            // statDiv.append("<div class='weight'>Weight: " + player.weight + "</div>");
            // statDiv.append("<div class='college'>College: " + player.college + "</div>");
            // statDiv.append("<div class='DOB'>DOB: " + player.dob + "</div>");

        })

}


