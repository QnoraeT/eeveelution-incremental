"use strict";
const saveID = "eeveelution_incremental";

const STORIES = [
    {
        complete: 1,
        get story() {
            return [
                `<span style="color: #ff4000; font-family: Tinos;">...</span>`
            ]
        }
    }
]

function nextStory() {
    player.story[1]++
    if (player.story[1] >= STORIES[player.story[0]].complete) {
        player.inStory = false
    }
}

const el = id => document.getElementById(id);

function resetTheFrickingGame() {
    localStorage.setItem(saveID, null);
    loadGame();
}

function saveTheFrickingGame() {
    try {
        game[currentSave].player = player;
        localStorage.setItem(saveID, JSON.stringify(game));
        return "Game was saved!";
    } catch (e) {
        console.warn("Something went wrong while trying to save the game!!");
        throw e;
    }
}

const otherGameStuffIg = {
    FPS: 0,
    sessionTime: 0,
    delta: 0,
    gameDelta: D(0),
}

let player = initPlayer()
let game = {}
let tmp = {}
let fpsList = [];
let lastFPSCheck = 0;
let lastSave = 0;
let saveTime = 30000;
let currentSave = 0;

function initPlayer() {
    const obj = {
        timeSpeed: D(1),
        setTimeSpeed: D(1),
        story: [0, 0],
        inStory: true,
        name: "",
        gender: 0, // 0 = they/them, 1 = he/him, 2 = she/her
        tearonq: {
            gender: 2,
            name: "TearonQ",
            shiny: false,
            pats: D(0),
            totalPats: D(0),
            members: D(0),
            moderators: D(0),
            moderatorAlloc: [D(0), D(0), D(0)],
            bestLv: D(1),
            friendship: D(120),
            temp: D(0),
            highTemp: D(0)
        },
        jolteon: {
            gender: 0,
            name: "Sparky",
            shiny: false,
            generators: D(0),
            energy: D(0),
            bestEnergy: D(0),
            excessEnergy: D(0),
            upgrades: [D(0), D(0), D(0), D(0)]
        },
        leafeon: {
            gender: 1,
            name: "Cauli",
            shiny: false,
            absorbed: D(0),
            nutrients: D(10),
            bestNutrients: D(10),
            state: 1,
            elements: [D(0), D(0), D(0), D(0), D(0)],
            bestElements: [D(0), D(0), D(0), D(0), D(0)],
            elementSelected: 0
        },
        vaporeon: {
            gender: 2,
            name: "Aequor",
            shiny: false,
            water: D(0),
            flow: D(0),
            completions: [],
            inWaterChallenge: null,
            storedData: {
                tearonq: {
                    pats: D(0),
                    totalPats: D(0),
                    members: D(0)
                },
                jolteon: {
                    generators: D(0),
                    energy: D(0),
                    bestEnergy: D(0),
                    excessEnergy: D(0),
                    upgrades: [D(0), D(0), D(0), D(0)]
                },
                leafeon: {
                    absorbed: D(0),
                    nutrients: D(10),
                    bestNutrients: D(10),
                    state: 1,
                    elements: [D(0), D(0), D(0), D(0), D(0)],
                    bestElements: [D(0), D(0), D(0), D(0), D(0)],
                    elementSelected: 0
                }
            }
        }
    }

    return obj
}

function resetTemp() {
    tmp = {
        tearonqPPS: D(0),
        tearonqMemberCost: D(1),
        tearonqMemberTarget: D(0),
        tearonqEffectiveTemp: D(0),
        tearonqLevelBase: D(0),
        tearonqLevel: D(0),
        tearonqXP: D(0),
        tearonqNextXP: D(0)
    }
}

const PRONOUN = [["they", "them", "their", "are", "have", "get"], ["he", "him", "his", "is", "has", "gets"], ["she", "her", "her", "is", "has", "gets"]]
function pronouns(gender) {
    return PRONOUN[gender]
}

function updatePlayerData(player) {
    player.version = player.version||-1;
    if (player.version < 0) {
        player.version = 0;
    }
    if (player.version === 0) {

        player.version = 1;
    }
    if (player.version === 1) {
        player.tearonq.name = "TearonQ"
        player.tearonq.gender = 2
        player.jolteon.name = "Sparky"
        player.jolteon.gender = 0
        player.leafeon.name = "Cauli"
        player.leafeon.gender = 0
        player.version = 2;
    }
    if (player.version === 2) {
        player.leafeon.gender = 1
        player.vaporeon = {
            gender: 2,
            name: "Aequor",
            shiny: false,
            water: D(0),
            flow: D(0),
            completions: [],
            inWaterChallenge: null,
            storedData: {
                tearonq: {
                    pats: D(0),
                    totalPats: D(0),
                    members: D(0)
                },
                jolteon: {
                    generators: D(0),
                    energy: D(0),
                    bestEnergy: D(0),
                    excessEnergy: D(0),
                    upgrades: [D(0), D(0), D(0), D(0)]
                },
                leafeon: {
                    absorbed: D(0),
                    nutrients: D(10),
                    bestNutrients: D(10),
                    state: 1,
                    elements: [D(0), D(0), D(0), D(0), D(0)],
                    bestElements: [D(0), D(0), D(0), D(0), D(0)],
                    elementSelected: 0
                }
            }
        }
        player.version = 3;
    }
    if (player.version === 3) {
        player.tearonq.moderators = D(0)
        player.tearonq.moderatorAlloc = [D(0), D(0), D(0)]
        player.version = 4;
    }
    if (player.version === 4) {
        
        // player.version = 5;
    }
    if (player.version === 5) {
        
        // player.version = 6;
    }
}

const PEOPLE_HTML = ["tq", "jolt", "leaf", "vappy"]
const PEOPLE_DATA = ["tearonq", "jolteon", "leafeon", "vaporeon"]
const PEOPLE_COLORS = ["#FF4000", "#FFFF00", "#00FF00", "#0080FF"]
let NAME_PRONOUN_HTML = []
let NAME_PRONOUN_HTML_DATA = []

function getAllNamePronounHTMLs() {
    let elems = []
    for (let i = 0; i < PEOPLE_HTML.length; i++) {
        elems = document.querySelectorAll(`.${PEOPLE_HTML[i]}Name`);
        for (let j = 0; j < elems.length; j++) {
            NAME_PRONOUN_HTML.push({type: "name", name: i, data: elems[j]});
            NAME_PRONOUN_HTML_DATA.push(elems[j])
        }
        for (let j = 0; j < 6; j++) {
            elems = document.querySelectorAll(`.${PEOPLE_HTML[i]}Pronoun${j}`);
            for (let k = 0; k < elems.length; k++) {
                NAME_PRONOUN_HTML.push({type: "pronoun", name: i, pronoun: j, caps: false, data: elems[k]});
                NAME_PRONOUN_HTML_DATA.push(elems[k])
            }
        }
    }

    // this is O(n^2) because i have no idea how to optimize this
    elems = document.querySelectorAll(`.caps`);
    for (let i = 0; i < NAME_PRONOUN_HTML.length; i++) {
        for (let j = 0; j < elems.length; j++) {
            if (elems[j].isEqualNode(NAME_PRONOUN_HTML[i].data)) {
                NAME_PRONOUN_HTML[i].caps = true
            }
        }
    }
}

function updateAllNames() {
    for (let i = 0; i < NAME_PRONOUN_HTML.length; i++) {
        if (NAME_PRONOUN_HTML[i].type === "name") {
            NAME_PRONOUN_HTML[i].data.textContent = player[PEOPLE_DATA[NAME_PRONOUN_HTML[i].name]].name;
            NAME_PRONOUN_HTML[i].data.style.color = PEOPLE_COLORS[NAME_PRONOUN_HTML[i].name]
        }
        if (NAME_PRONOUN_HTML[i].type === "pronoun") {
            NAME_PRONOUN_HTML[i].data.textContent = pronouns(player[PEOPLE_DATA[NAME_PRONOUN_HTML[i].name]].gender)[NAME_PRONOUN_HTML[i].pronoun]
            if (NAME_PRONOUN_HTML[i].caps) {
                NAME_PRONOUN_HTML[i].data.textContent = capitalizeFirstLetter(NAME_PRONOUN_HTML[i].data.textContent);
            }
        }
    }
}

function setupHTML() {
    setupVaporeonHTML()
    setupLeafHTML()
    setupJoltyHTML()
}

function loadGame() {
    lastFPSCheck = 0;
    let oldTimeStamp = 0;
    initPlayer();
    game = [
        {
            name: "Save File",
            modes: [],
            player: player
        }
    ]

    let loadgame = JSON.parse(localStorage.getItem(saveID)); 
    if (loadgame !== null) {
        game = loadgame; 
        player = game[currentSave].player;
        updatePlayerData(player);
    } else {
        currentSave = 0;
        console.log("reset");
    }

    resetTemp()

    setupHTML()
    getAllNamePronounHTMLs()
    console.log(NAME_PRONOUN_HTML_DATA)
    console.log(PRONOUN)

    window.requestAnimationFrame(gameLoop);

    function gameLoop(timeStamp) {
        otherGameStuffIg.delta = (timeStamp - oldTimeStamp) / 1000;
        if (otherGameStuffIg.delta > 0) {
            fpsList.push(otherGameStuffIg.delta);
            if (timeStamp > lastFPSCheck) {
                lastFPSCheck = timeStamp + 500;
                otherGameStuffIg.FPS = 0;
                for (let i = 0; i < fpsList.length; ++i) {
                    otherGameStuffIg.FPS += fpsList[i];
                }
                otherGameStuffIg.FPS = (fpsList.length / otherGameStuffIg.FPS).toFixed(1);
                fpsList = [];
            }

            otherGameStuffIg.gameDelta = Decimal.mul(otherGameStuffIg.delta, player.timeSpeed).mul(player.setTimeSpeed);
            player.gameTime = Decimal.add(player.gameTime, otherGameStuffIg.gameDelta);
            player.totalTime += otherGameStuffIg.delta;
            otherGameStuffIg.sessionTime += otherGameStuffIg.delta;

            el("story").style.display = (player.inStory) ? "flex" : "none";
            el("gameplay").style.display = (!player.inStory) ? "flex" : "none";
            if (player.inStory) {
                el("storyThing").innerHTML = STORIES[player.story[0]].story[player.story[1]]
            }

            updateVaporeon_Game()
            updateLeafeon_Game()
            updateJolteon_Game()
            updateTearonQ_Game()

            updateVaporeon_HTML()
            updateLeafeon_HTML()
            updateJolteon_HTML()
            updateTearonQ_HTML()
            updateAllNames()
            if (timeStamp > lastSave + saveTime) {
                console.log(saveTheFrickingGame());
                lastSave = timeStamp;
            }

            // misc unimportant stuff
        }
        // do not change order at all
        oldTimeStamp = timeStamp;
        window.requestAnimationFrame(gameLoop);
    }
}