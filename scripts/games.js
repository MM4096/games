const GAMES = [
    {
        "name": "Spellcaster",
        "description": "A Metroidvania centered around casting spells",
        "id": "spellcaster",
        "urls": [""],
        "stylesheet-path": "",
        "background-image": "",
        "changelog": [
            {
                "version": "v0.1a",
                "date": "2024-08-18",
                "changes": [
                    "Demo release 1",
                ]
            }
        ],
        "platforms": ["Windows", "Linux"],
    },
    {
        "name": "Platformer - A Platformer",
        "description": "A small game where as many game conventions as possible are broken",
        "id": "doing-everything-wrong",
        "urls": [""],
        "stylesheet-path": "",
        "background-image": "",
        "changelog": [
            {
                "version": "v1.0",
                "date": "2021-10-01",
                "changes": [
                    "Initial Release"
                ]
            },
            {
                "version": "v1.2",
                "date": "2021-11-14",
                "changes": [
                    "A few bug fixes (I know, in a game where I shouldn't have play-tested)",
                    "Published on Itch.io. Get more information here: <a href='https://mm4096.itch.io/platformer-a-platformer'>here</a>"
                ]
            }
        ],
        "platforms": ["Windows", "Linux"],
    },
]

function parseVersion(version) {
    let versionParts = version.replace("v", "").split(".");
    let lastPart = versionParts.at(-1);

    if (lastPart.includes("a")) {
        versionParts[versionParts.length - 1] = lastPart.replace("a", "");
        versionParts.push("alpha");
    }
    else if (lastPart.includes("b")) {
        versionParts[versionParts.length - 1] = lastPart.replace("b", "");
        versionParts.push("beta");
    }
    else if (lastPart.includes("rc")) {
        versionParts[versionParts.length - 1] = lastPart.replace("rc", "");
        versionParts.push("release candidate");
    }
    else {
        versionParts.push("release");
    }

    return versionParts;
}