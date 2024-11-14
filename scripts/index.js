$(document).ready(function () {
    let gameList = $("#gamesList")
    gameList.empty()
    GAMES.forEach(game => {
        gameList.append(getGameNode(game))
        gameList.append("<br><br>")
    })

    // find the newest game
    let newestGame = getMostRecentlyUpdatedGame()
    $("#mostRecentUpdatedGame").append(getGameNode(newestGame))
});

function getGameNode(game) {
    let url = `game_view.html?game=${game.id}`
    let lastUpdated = new Date(getLastChangelog(game).date)
    let updatedTimeText = `${lastUpdated.getDate()} ${lastUpdated.toLocaleString('default', { month: 'long' })} ${lastUpdated.getFullYear()}`
    return `
        <div class="game" onclick="window.location.href='${url}'">
            <a href="${url}" class="big_text">${game.name}</a>
            <br>
            <br>
            <p class="small_text center" id="latest_updated_time"><i>Last Updated on: ${updatedTimeText}, Latest Version: ${getLatestVersion(game)}</i></p>
        </div>`
}