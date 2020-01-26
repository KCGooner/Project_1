const nflArrestSite = "http://nflarrest.com/api/v1/player/arrests/";
// const nflTeamSite1 = "https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu";
// const nflPlayerSite1 = "https://www.fantasyfootballnerd.com/service/nfl-teams/json/pp964njgnuwu";
const nflTeamSite = "http://www.markstout.com/api/nfl/teams";
const nflPlayerSite = "http://www.markstout.com/api/nfl/players"


//MAIN here, start by loading list of teams
getTeams();

//Binds during list of all teams, to narrow down to one team
$(document).on("click", ".teams", function () {
    console.log($(this));
    let currentThis = $(this)
    $("#teamcontainer").fadeOut('slow', function () {
        getTeamPlayers(currentThis.attr("team-name"));
    });
    $("#teamcontainer").effect("slide", {}, 750, function () {
        console.log(currentThis);
    })
})
//Binds during list of players on team div to show PLAYER info
$(document).on("click", ".team", function () {
    console.log($(this));
    let currentThis = $(this)
    //createSwipe();
    $("#teamcontainer").fadeOut('slow', function () {
        getPlayer(currentThis.attr("player-code"));
    });
    $("#teamcontainer").effect("slide", {}, 750, function () {
        console.log(currentThis);
    })
})
//Binds click on player to get arrest info, need to revisit
$(document).on("click", ".player", function () {

    getArrestInfo($(this).attr("player-name"));
})

//Binds the back button to go to list of teams only
$(document).on("click", "#backBtn", function () {
    $("#playercontainer").empty()
    $("#teamcontainer").effect("slide", {}, 100, function () {
        console.log(event);
    })
    getTeams();

});
//////////////////////////////////////////////////////
//This creates the swipe listener
function createSwipe() {
    //$(document).on("pagecreate", "#felon-page", function () {
    $(document).on("swipeleft swiperight", "#felon-page", function (e) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ($(".ui-page-active").jqmData("panel") !== "open") {
            if (e.type === "swipeleft") {
                $("#good-panel").panel().panel("open");
            } else if (e.type === "swiperight") {
                $("#felon-panel").panel().panel("open");
            }
        }
    });

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
            $("#teamcontainer").empty();
            // $("#teamcontainer").show();
            response.Players.forEach(function (player) {
                if (player.playerId === playerId) {
                    
                    console.log(player);
                    let playerDiv = $("<div>").addClass("player");
                    $("#teamcontainer").prepend(playerDiv);
                    playerDiv.attr("player-name", player.displayName);
                    playerDiv.append(player.displayName);
                    //playerDiv.css('display',"");
                    let statDiv = $("<div>").addClass("playerStat");
                    $("#teamcontainer").append(statDiv);
                    statDiv.append("<div class='jersey'>Number: " + player.jersey + "</div>");
                    statDiv.append("<div class='position'>Position: " + player.position + "</div>");
                    statDiv.append("<div class='height'>Height: " + player.height + "\"" + "</div>");
                    statDiv.append("<div class='weight'>Weight: " + player.weight +  " lbs" + "</div>");
                    statDiv.append("<div class='college'>College: " + player.college + "</div>");
                    statDiv.append("<div class='DOB'>DOB: " + player.dob + "</div>");
                    let isFelonDiv = $("<div>").addClass("isFelon");
                    $("#teamcontainer").append(isFelonDiv);
                    isFelonDiv.append("<div class='felonBtn'><a href='#felon-panel'>Felon?</a></div");
                    isFelonDiv.append("<div class='goodBtn'><a href='#good-panel'>Good?</a></div");
                    getArrestInfo(player.displayName);
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
    $(document).off("swipeleft swiperight", "#felon-page") // removes swipe listener for back/home button
    $.ajax({
        url: nflTeamSite,
        method: "GET",
        dataType: 'json'
    })
        .then(function (response) {
            console.log(response);

            $("#teamcontainer").empty();
            $("#panelsOnly").empty();
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
            let felonPanelDiv = $("<div data-role='panel' id='felon-panel' data-display='push' data-theme='b' class='ui-panel ui-panel-position-left ui-panel-display-reveal ui-body-b ui-panel-animate ui-panel-closed'>");
            let goodPanelDiv = $("<div data-role='panel' id='good-panel' data-display='push' data-theme='b' data-position='right' class='ui-panel ui-panel-position-right ui-panel-display-push ui-panel-animate ui-panel-closed' >");
            
            $("#panelsOnly").append(felonPanelDiv);
            $("#panelsOnly").append(goodPanelDiv);
            //plaDiv.attr("player-name", player.displayName);
            if(response[0]){
                console.log("felon");
                //guiltyDiv.append(response[0].Name + response[0].Team_name + response[0].Category + response[0].Description + response[0].Outcome);
                felonPanelDiv.addClass("felon-green");
                goodPanelDiv.addClass("good-red");
                felonPanelDiv.append("<div class='ui-panel-inner'><p> CORRECT! <br></p>" + 
                    "<br><p>" + response[0].Category + "</p>" + 
                    "<br><p>" + response[0].Description + "</p>" +
                    "<br><p>" + response[0].Outcome +"</p><br><a href='#' data-rel='close'>close</a></div>")
                goodPanelDiv.append("<div class='ui-panel-inner'>" + 
                    "<p>WRONG!<br></p><br><p>Swipe left to see conviction" +
                    "</p><br><a href='#' data-rel='close'>close</a></div>") 
            }
            else {
                console.log("good guy");
                felonPanelDiv.addClass("felon-red");
                goodPanelDiv.addClass("good-green");
                felonPanelDiv.append("<div class='ui-panel-inner'>" + 
                    "<p>WRONG!<br></p><br><p>No convictions on record.</p><br><a href='#' data-rel='close'>close</a></div>")
                goodPanelDiv.append("<div class='ui-panel-inner'>" + 
                    "<p>CORRECT!<br></p><br><p>Good guy." +
                    "</p><br><a href='#' data-rel='close'>close</a></div>")
            
            }
            createSwipe();    
        })

}