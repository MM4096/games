class Game {
	constructor(name, description, id, urls, stylesheetPath, backgroundImage, bannerImage, changelog, platforms) {
		this.name = name;
		this.description = description;
		this.id = id;
		this.urls = urls;
		this.stylesheetPath = stylesheetPath;
		this.backgroundImage = backgroundImage;
		this.bannerImage = bannerImage;
		this.changelog = changelog;
		this.platforms = platforms;
	}
}

const GAMES = [
	new Game("Platformer - A Platformer",
		"A small game where as many game conventions as possible are broken<br><b>This game is on <a href='https://mm4096.itch.io/platformer-a-platformer'>itch.io</a>!</b>",
		"doing-everything-wrong",
		[""],
		"",
		"",
		"",
		[
			{
				version: "v1.0",
				date: "2024-10-01",
				changes: [
					"Initial Release"
				]
			},
			{
				version: "v1.2",
				date: "2024-11-14",
				changes: [
					"A few bug fixes (I know, improvements in a game that's supposed to be bad. Ironic.)",
					"Published on Itch.io. View the page <a href='https://mm4096.itch.io/platformer-a-platformer'>here</a>"
				]
			}
		],
		["Windows", "Linux"]),


	new Game("Spellcaster",
		"A Metroidvania centered around casting spells",
		"spellcaster",
		[""],
		"",
		"",
		"",
		[
			{
				version: "v0.1a",
				date: "2024-08-18",
				changes: [
					"Demo release 1",
				]
			}
		],
		["Windows", "Linux"]),
];

function parseVersion(version) {
	let versionParts = version.replace("v", "").split(".");
	let lastPart = versionParts.at(-1);

	if (lastPart.includes("a")) {
		versionParts[versionParts.length - 1] = lastPart.replace("a", "");
		versionParts.push("alpha");
	} else if (lastPart.includes("b")) {
		versionParts[versionParts.length - 1] = lastPart.replace("b", "");
		versionParts.push("beta");
	} else if (lastPart.includes("rc")) {
		versionParts[versionParts.length - 1] = lastPart.replace("rc", "");
		versionParts.push("release candidate");
	} else {
		versionParts.push("release");
	}

	return versionParts;
}

function getLastChangelog(game) {
	return game.changelog[game.changelog.length - 1]
}

function getLatestVersion(game) {
	return game.changelog[game.changelog.length - 1].version
}

function getMostRecentlyUpdatedGame() {
	let newestGame = GAMES[0];
	GAMES.forEach(game => {
		if (new Date(getLastChangelog(game).date) > new Date(getLastChangelog(newestGame).date)) {
			newestGame = game;
		}
	})
	return newestGame;
}