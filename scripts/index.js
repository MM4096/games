$(document).ready(function () {
    let gameList = $("#gamesList")
    gameList.empty()
    GAMES.forEach(game => {
        gameList.append(`<li><a href="game_view.html?game=${game.id}">${game.name}</a></li>`)
    })
});