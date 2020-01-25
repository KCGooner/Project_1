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

$( document ).on( "pagecreate", "#demo-page", function() {
        $( document ).on( "swipeleft swiperight", "#demo-page", function( e ) {
            // We check if there is no open panel on the page because otherwise
            // a swipe to close the left panel would also open the right panel (and v.v.).
            // We do this by checking the data that the framework stores on the page element (panel: open).
            if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
                if ( e.type === "swipeleft" ) {
                    $( "#good-panel" ).panel( "open" );
                } else if ( e.type === "swiperight" ) {
                    $( "#felon-panel" ).panel( "open" );
                }
            }
        });
    });


getTeams();


$(document).on("click", ".teams", function () {
    console.log($(this));
    var currentThis = $(this)
    //getTeamPlayers(currentThis.attr("team-name"));
    $("#teamcontainer").fadeOut('slow', function() {
    getTeamPlayers(currentThis.attr("team-name"));
    });
    $( "#teamcontainer" ).effect( "slide", {}, 750, function() {
        console.log(currentThis);
            //getTeamPlayers(currentThis.attr("team-name"));
            // $( "#teamcontainer" ).removeAttr( "style" ).hide().fadeIn();

    //     setTimeout(function() {
             
    // }, 1001)
})
})    
    //getTeamPlayers($(this).attr("team-name"))

//$(document).on("click", ".team", function () {

    //var teamThis = $(this);
    //$("#teamcontainer").fadeOut('slow', function() {
      //  getPlayer(teamThis.attr("player-code"));
    //});
    //$("#teamcontainer").effect( "slide", {}, 750, function() {
    //    console.log(teamThis)
  //  })

//});

$(document).on("click", ".player", function () {
    $("#playercontainer").show();
    getArrestInfo($(this).attr("player-name"));
})
$(document).on("click", ".team", function () {
    var teamThis = $(this);
    $("#teamcontainer").fadeOut('slow', function() {
        getPlayer(teamThis.attr("player-code"));
        getPlayer($(this).attr("player-code"));
    });
    
    // fixes the animation lag when clicking a player on a team
    $("#playercontainer").delay(1000).effect( "slide", {}, 750, function() {
        console.log(teamThis)
        console.log(this)
    })
});



////////////
$(document).on("click", ".team", function () {
    console.log($(this));
    var currentThis = $(this)
    getPlayer($(this).attr("player-code"));
    //getTeamPlayers(currentThis.attr("team-name"));
    $("#teamcontainer").fadeOut('slow', function() {
    getTeamPlayers(currentThis.attr("team-name"));
    });
    $( "#playercontainer" ).effect( "slide", {}, 750, function() {
        console.log(currentThis);
            getTeamPlayers(currentThis.attr("team-name"));
           // $( "#teamcontainer" ).removeAttr( "style" ).hide().fadeIn();

        setTimeout(function() {
             
    }, 1001)
})
})    
    //getTeamPlayers($(this).attr("team-name"))

// $(document).on("click", ".team", function () {
//     getPlayer($(this).attr("player-code"));
// });
$(document).on("click", ".player", function () {
    getArrestInfo($(this).attr("player-name"));
})



// back button functionality
$(document).on("click", "#backBtn", function() {
    $("#playercontainer").empty()
    $("#teamcontainer").effect("slide", {}, 100, function() {
        console.log(event);
    })
    getTeams();
    
});

//getTeamPlayers(teamName);
//getPlayer(playerId);
//getArrestInfo()
// function runEffect() {
//     // get effect type from
//     var selectedEffect = "fold";

//     // Most effect types need no options passed by default
//     var options = {};
//     // some effects have required parameters
//     if ( selectedEffect === "scale" ) {
//       options = { percent: 50 };
//     } else if ( selectedEffect === "transfer" ) {
//       options = { to: "#button", className: "ui-effects-transfer" };
//     } else if ( selectedEffect === "size" ) {
//       options = { to: { width: 200, height: 60 } };
//     }

//     // Run the effect
//     $( "#teamcontainer" ).effect( selectedEffect, options, 5000, getTeamPlayers($(this).attr("team-name")));
//   };
//     // Callback function to bring a hidden box back
//     function callback() {
//         return new Promise( function(resolve){
//             setTimeout(function() {
//                  $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
//                 resolve("stuff");
//         }, 5000 );
        
//       });
//     }

function removeElement(playercontainer) {
    // Removes an element from the document
    var element = document.getElementById("playercontainer");
    element.parentNode.removeChild(element);
}

///////////////////////////////////////////////////////////
//get a single players info using the ID in the api
function getPlayer(playerId) {
    console.log(playerId);
    $.ajax({
        url: nflPlayerSite,
        method: "GET",
        dataType: 'json'
    })
        .then(function (response) {
            console.log(response);
            //let playersUl = $('<ul/>').addClass('list-player');
            //$("body").append(playersUl);
            $("#teamcontainer").empty();
            $("#playercontainer").show();
            response.Players.forEach(function (player) {
                if (player.playerId === playerId) {
                    console.log(player);
                    let playerDiv = $("<div>").addClass("player");
                    $("#playercontainer").append(playerDiv);
                    playerDiv.attr("player-name", player.displayName);
                    playerDiv.append(player.displayName);
                    let statDiv = $("<div>").addClass("playerStat");
                    $("#playercontainer").append(statDiv);
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
    $.ajax({
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
                let link = $("<a>");
                $("#teamcontainer").append(link);
                link.attr("href", "#page2");
                link.attr("data-transition", "flip");

                let teamDiv = $("<div>").addClass("teams");
                $(link).append(teamDiv);
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


