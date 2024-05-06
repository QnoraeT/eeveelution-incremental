"use strict";
const saveID = "evb_incremental";
// list to add: Toska, Janko, Alxzyth

const STORIES = [
    {
        complete: 1,
        get story() {
            return [
                `<span style="color: #4aadd4; font-family: Tinos;"><b>FABI: </b>nom. you a vee ?</span>`
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
    delta: 0
}

let player = {}
let game = {}
const tmp = {}
const tab = [0, 0, 0]
let fpsList = [];
let lastFPSCheck = 0;
let lastSave = 0;
let saveTime = 30000;
let currentSave = 0;

function resetPlayer() {
    player = {
        story: [0, 0],
        inStory: true,
        name: "",
        gender: 0, // 0 = they/them, 1 = he/him, 2 = she/her
        fabi: {
            pats: D(0),
            members: D(0),
            bestLv: D(1)
        }
    }
}

function updatePlayerData(player) {
    player.version = player.version||-1;
    if (player.version < 0) {
        player.version = 0;
    }
    if (player.version === 0) {

        // player.version = 1;
    }
}

function loadGame() {
    lastFPSCheck = 0;
    let oldTimeStamp = 0;
    resetPlayer();
    game = {
        0: {
            name: "Save #1",
            mode: "normal",
            player: player
        }
    };

    let loadgame = JSON.parse(localStorage.getItem(saveID)); 
    if (loadgame !== null) {
        game = loadgame; 
        player = game[currentSave].player;
        updatePlayerData(player);
    } else {
        currentSave = 0;
        console.log("reset");
    }

    window.requestAnimationFrame(gameLoop);

    function gameLoop(timeStamp) {
        try {
            let generate;
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

                let gameDelta = Decimal.mul(otherGameStuffIg.delta, player.timeSpeed).mul(player.setTimeSpeed);
                player.gameTime = Decimal.add(player.gameTime, gameDelta);
                player.totalTime += otherGameStuffIg.delta;
                otherGameStuffIg.sessionTime += otherGameStuffIg.delta;

                el("story").style.display = (player.inStory) ? "flex" : "none";
                el("gameplay").style.display = (!player.inStory) ? "flex" : "none";
                if (player.inStory) {
                    el("storyThing").innerHTML = STORIES[player.story[0]].story[player.story[1]]
                }
                
                updateFABI()

                if (timeStamp > lastSave + saveTime) {
                    console.log(saveTheFrickingGame());
                    lastSave = timeStamp;
                }

                // misc unimportant stuff
            }
        } catch (e) {
            console.error(e);
            console.log("Game saving has been paused. It's likely that your save is broken or the programmer (TearonQ) is an idiot? Don't call them that, though.");
            return;
        }
        // do not change order at all
        oldTimeStamp = timeStamp;
        window.requestAnimationFrame(gameLoop);
    }
}

