let game;

$(document).ready(function () {
	const urlParams = new URLSearchParams(window.location.search);
	const gameId = urlParams.get("game")

	game = GAMES.find(game => game.id === gameId)
	if (game) {
		let platformsObject = $("#platforms")
		$("#header").text(game.name)
		$("#description").html(game.description)
		$("#title").text("Viewing game: " + game.name)
		platformsObject.empty()
		platformsObject.append(`<i>Available Platforms: </i>`)
		platformsToIcons(game.platforms).forEach(icon => {
			platformsObject.append(`<i class="${icon}"/> `)
		})

		getRepoContents(`games/${gameId}/releases`).then(releases => {
			$("#releasesList").empty()
			releases.forEach(release => {
				$("#releasesList").append(`<li><a href="#" onclick="showChangelog('${release["name"]}')">${release["name"]}</a></li>`)
			})
		}).catch(e => {
			console.log(e)
			$("#releasesList").append(`<li><p class="text-danger">ERROR: Couldn't get releases.</p></li>`)
		})
	} else {
		window.location.href = "404.html"
	}
})

function showChangelog(release) {
	let changelogList = $("#changelogList")
	$("#changelog").show();
	$("#changelogTitle").text(release)

	const releaseData = game.changelog.find(changelog => changelog.version === release)
	if (releaseData) {
		changelogList.empty()
		releaseData.changes.forEach(change => {
			changelogList.append(`<li>${change}</li>`)
		})
	} else {
		changelogList.text("No changelog available")
	}
	let versionParts = parseVersion(release);
	if (versionParts.at(-1) === "alpha") {
		changelogList.append(`<br><br><li class="error">WARNING: This is an alpha release. Alpha releases can be <em>very</em> unstable.
                                    Proceed at your own risk.</li>`)
	} else if (versionParts.at(-1) === "beta") {
		changelogList.append(`<br><br><li class="warning">WARNING: This is a beta release. Beta releases can be unstable.
                                    Proceed with caution.</li>`)
	} else if (versionParts.at(-1) === "release candidate") {
		changelogList.append(`<br><br><li class="info">This is a release candidate. This version is almost ready for release.`)
	}

	changelogList.append("<br><br><li><h3>Downloads:</h3></li><li><ul id='downloads'></ul></li>")
	game.platforms.forEach(platform => {
		let icon = "";
		if (platform === "Windows") {
			icon = "bi bi-windows";
		}
		else if (platform === "Linux") {
			icon = "bi bi-ubuntu";
		}
		else if (platform === "Mac") {
			icon = "bi bi-apple";
		}
		$("#downloads").append(`<li>Download for ${platform} <i class="${icon}"/>: <a href="#" onclick="downloadRelease('${release}', '${platform}')">Download</a></li>`)
	});
}

function downloadRelease(release, platform) {
	const downloadPath = `games/${game.id}/releases/${release}/${platform.toLowerCase()}.zip`
	downloadFile(downloadPath).then(r => {
		console.log(r)
	})
}