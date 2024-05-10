"use strict";

function updateArt() {
    tmp.artAbsEngEff = Decimal.max(player.art.absorbed, 0).div(1000).add(1).sqrt().mul(2.41421356237).sub(1.41421356237)
    tmp.artTotalSpeed = D(1)

    tmp.artNConversionGper = D(1)
    tmp.artNConversionJper = D(100)

    tmp.artNConversionSpeedJ = D(10)
    tmp.artNConversionSpeedJ = tmp.artNConversionSpeedJ.mul(tmp.artTotalSpeed)
    
    tmp.artAbsorbJSpeed = D(25)
    tmp.artAbsorbJSpeed = tmp.artAbsorbJSpeed.mul(tmp.artTotalSpeed)

    tmp.artAbsorbNutrientLossSpeed = D(0.5)
    tmp.artAbsorbNutrientLossSpeed = tmp.artAbsorbNutrientLossSpeed.mul(tmp.artTotalSpeed)
    
    // if (player.art.state === 1) {
    //     player.art.nutrients = Decimal.add(player.art.nutrients, tmp.artNConversionSpeedJ.div(tmp.artNConversionJper).mul(tmp.artNConversionGper).mul(otherGameStuffIg.gameDelta))
    // }

    el("artEngAbs").innerText = format(player.art.absorbed, 1)
    el("absEngAbsEff").innerText = format(tmp.artAbsEngEff, 2)
    el("artNutrientAmt").innerText = format(player.art.nutrients, 2)
    el("artNutrientConvG").innerText = format(tmp.artNConversionGper, 2)
    el("artNutrientConvJ").innerText = format(tmp.artNConversionJper, 1)
    el("artAbsorbJSpeed").innerText = format(tmp.artAbsorbJSpeed, 1)
    el("artNutrientLossSpeed").innerText = format(tmp.artAbsorbNutrientLossSpeed, 2)
    el("artNutrientConvSpeed").innerText = format(tmp.artNConversionSpeedJ, 1)
    
    el("artNutrientGet").style["background-color"] = player.art.state === 1 ? "#008010" : "#004704"
    el("artAbsorbGet").style["background-color"] = player.art.state === 2 ? "#008010" : "#004704"
}

function toggleArtNutrient() {
    player.art.state = player.art.state === 1 ? 0 : 1
}

function toggleArtAbsorb() {
    player.art.state = player.art.state === 2 ? 0 : 2
}