"use strict";

const ART_ELEMENTS = [
    {
        get eff() {
            return Decimal.max(player.art.elements[0], 0).mul(0.01).add(1).root(1.8)
        },
        get effDesc() {
            return `Oxygen increases how much you pat TearonQ by <b><span style="font-size: 20px">${format(this.eff, 2)}</span></b>x.`
        },
        name: "Oxygen",
        color: "#37ff48",
        bgcolor: "#0f4b14",
        milestones: [
            {
                req: D(50),
                get effect() {
                    return Decimal.max(player.tearonq.pats, 10).log10().pow(2).div(40).add(1)
                },
                get desc() {
                    return `TearonQ pats boost nutrient gain by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: D(100),
                get effect() {
                    let i = Decimal.max(player.janko.excessEnergy, 10).dilate(0.9).div(10).pow(0.1)
                    if (Decimal.gte(player.art.elements[1], ART_ELEMENTS[1].milestones[0].req)) { i = i.pow(ART_ELEMENTS[1].milestones[0].effect) }
                    return i
                },
                get desc() {
                    return `Janko overflow energy makes absorption <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x faster.`
                }
            },
            {
                req: D(400),
                get effect() {
                    return Decimal.pow((tmp.jankoGenEff ?? D(1)), 0.07)
                },
                get desc() {
                    return `Janko generators also multiply TearonQ pats by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: D(2000),
                get effect() {
                    return Decimal.max(player.tearonq.temperature, 1).log10().add(1)
                },
                get desc() {
                    return `TearonQ's temperature also increases how much ${pronouns(player.tearonq.gender)[0] + (player.tearonq.gender === 0 ? " get" : " gets")} pat by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: D(125000),
                get effect() {
                    return D(0.1)
                },
                get desc() {
                    return `Janko upgrade 2's base is increased by +<b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>.`
                }
            },
        ]
    },
    {
        get eff() {
            return Decimal.max(player.art.elements[1], 0).mul(0.02).add(1).root(1.5)
        },
        get effDesc() {
            return `Nitrogen boosts Janko's energy generation by <b><span style="font-size: 20px">${format(this.eff, 2)}</span></b>x.`
        },
        name: "Nitrogen",
        color: "#ff8953",
        bgcolor: "#492515",
        milestones: [
            {
                req: D(100),
                get effect() {
                    return D(1.4)
                },
                get desc() {
                    return `Unlock another Janko Upgrade, and Oxygen Milestone 2 is improved by <b><span style="font-size: 16px">${format(this.effect.sub(1).mul(100), 2)}</span></b>%.`
                }
            },
            {
                req: D(500),
                get effect() {
                    return Decimal.max(player.janko.energy, 10).div(10).pow(0.1)
                },
                get desc() {
                    return `Janko's energy boosts itself by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: D(4000),
                get effect() {
                    return D(1.15)
                },
                get desc() {
                    return `TearonQ members effect is raised to the ^<b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>.`
                }
            },
            {
                req: D(200000),
                get effect() {
                    return D(10)
                },
                get desc() {
                    return `TearonQ's temperature increases <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x as fast.`
                }
            },
        ]
    },
    {
        get eff() {
            return Decimal.max(player.art.elements[2], 0).add(1).ln().div(5).add(1).pow(5).sub(1).mul(0.01).add(1)
        },
        get effDesc() {
            return `Hydrogen buffs Janko's energy capacity by <b><span style="font-size: 20px">${format(this.eff, 2)}</span></b>x.`
        },
        name: "Hydrogen",
        color: "#fff460",
        bgcolor: "#424018",
        milestones: [
            {
                req: D(1000),
                get effect() {
                    return Decimal.root(player.janko.excessEnergy, 3).div(1000).add(1)
                },
                get desc() {
                    return `Janko overflow energy increases his capacity by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: D(2500),
                get effect() {
                    return Decimal.max(player.tearonq.temperature, 0).div(100).add(1).pow(0.7)
                },
                get desc() {
                    return `TearonQ's temperature also increases Art's absorption speed by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: D(5000),
                get effect() {
                    return Decimal.max(player.tearonq.pats, 0).add(1).log10().pow(2).div(400).add(1)
                },
                get desc() {
                    return `TearonQ's pats increase how much energy Janko can hold by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: D(100000),
                get effect() {
                    return D(2)
                },
                get desc() {
                    return `Art's nutrient gathering speed is increasd by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
        ]
    },
    {
        get eff() {
            return Decimal.max(player.art.elements[3], 0).div(1000).add(1).ln().div(3).add(1).pow(2)
        },
        get effDesc() {
            return `Carbon increases Art's overall speed by <b><span style="font-size: 20px">${format(this.eff, 2)}</span></b>x.`
        },
        name: "Carbon",
        color: "#5956ff",
        bgcolor: "#1e1e53",
        milestones: [
            {
                req: D(7500),
                get effect() {
                    return Decimal.max(player.art.nutrients, 0).div(1000).add(1).ln().div(12).add(1).pow(3)
                },
                get desc() {
                    return `Art's current nutrients multiply his speed by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: D(450000),
                get effect() {
                    return D(2.5)
                },
                get desc() {
                    return `Art's absorption speed is <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x faster.`
                }
            },
        ]
    },
    {
        get eff() {
            return artHugTarget(player.art.elements[4])
        },
        next(x) {
            return artHugReq(x)
        },
        get effDesc() {
            return `Phosphorus lets Art hug TearonQ <b><span style="font-size: 20px">${format(this.eff)}</span></b> times. (Next: ${format(this.next(this.eff.add(1).floor()))})<br>`
        },
        name: "Phosphorus",
        color: "#a04eff",
        bgcolor: "#351b52",
        milestones: [
            {
                req: artHugReq(D(1)),
                get effect() {
                    return ART_ELEMENTS[4].eff.add(1)
                },
                get desc() {
                    return `TearonQ hugs increases ${pronouns(player.tearonq.gender)[2]} temperature by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: artHugReq(D(6)),
                get effect() {
                    return Decimal.pow(1.1, ART_ELEMENTS[4].eff)
                },
                get desc() {
                    return `TearonQ hugs boost ${pronouns(player.tearonq.gender)[2]} pats and temperature by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
            {
                req: artHugReq(D(12)),
                get effect() {
                    return Decimal.pow(1.25, ART_ELEMENTS[4].eff.sub(9).max(0))
                },
                get desc() {
                    return `TearonQ hugs also increase Art's absorption speed by <b><span style="font-size: 16px">${format(this.effect, 2)}</span></b>x.`
                }
            },
        ]
    },
]

function artHugReq(x) {
    return x.sub(1).pow(1.2).pow_base(2).mul(1000).ceil()
}

function artHugTarget(x) {
    x = Decimal.max(x, 0)
    if (x.lt(1000)) { return D(0) }
    return x.div(1000).log2().root(1.2).add(1).floor()
}

function setupArtHTML() {
    let table = '<b><span style="font-size: 20px">Art\'s collected elements:</span></b><br>'
    for (let i = 0; i < ART_ELEMENTS.length; i++) {
        table += `<button id="artElmAll${i}" onclick="artSelectElm(${i})" style="font-family: Tinos; color: ${ART_ELEMENTS[i].color}; border: 3px solid ${ART_ELEMENTS[i].color}; background-color: ${ART_ELEMENTS[i].bgcolor};">Art has <b><span id="artElm${i}" style="font-size: 20px"></span></b>g of ${ART_ELEMENTS[i].name}.</button>`
    }
    el("artNutrients").innerHTML = table
    reloadArtMilestones()
}

function updateArt() {
    tmp.artAbsEngEff = Decimal.max(player.art.absorbed, 0).div(1000).add(1).sqrt().mul(2.41421356237).sub(1.41421356237)

    tmp.artTotalSpeed = D(1)
    tmp.artTotalSpeed = tmp.artTotalSpeed.mul(ART_ELEMENTS[3].eff)
    tmp.artTotalSpeed = tmp.artTotalSpeed.mul(JANKO_ENG_UPS[3].eff)
    if (Decimal.gte(player.art.elements[3], ART_ELEMENTS[3].milestones[0].req)) { tmp.artTotalSpeed = tmp.artTotalSpeed.mul(ART_ELEMENTS[3].milestones[0].effect) }

    tmp.artNConversionGper = D(1)
    if (Decimal.gte(player.art.elements[0], ART_ELEMENTS[0].milestones[0].req)) { tmp.artNConversionGper = tmp.artNConversionGper.mul(ART_ELEMENTS[0].milestones[0].effect) }
    tmp.artNConversionJper = D(100)

    tmp.artNConversionSpeedJ = D(10)
    tmp.artNConversionSpeedJ = tmp.artNConversionSpeedJ.mul(JANKO_ENG_UPS[2].eff)
    tmp.artNConversionSpeedJ = tmp.artNConversionSpeedJ.mul(tmp.artTotalSpeed)
    
    tmp.artOverallAbsSpd = D(1)
    if (Decimal.gte(player.art.elements[0], ART_ELEMENTS[0].milestones[1].req)) { tmp.artOverallAbsSpd = tmp.artOverallAbsSpd.mul(ART_ELEMENTS[0].milestones[1].effect) }
    if (Decimal.gte(player.art.elements[2], ART_ELEMENTS[2].milestones[1].req)) { tmp.artOverallAbsSpd = tmp.artOverallAbsSpd.mul(ART_ELEMENTS[2].milestones[1].effect) }

    tmp.artAbsorbJSpeed = D(25)
    tmp.artAbsorbJSpeed = tmp.artAbsorbJSpeed.mul(tmp.artOverallAbsSpd)
    tmp.artAbsorbJSpeed = tmp.artAbsorbJSpeed.mul(tmp.artTotalSpeed)

    tmp.artAbsorbNutrientLossSpeed = D(0.5)
    tmp.artAbsorbNutrientLossSpeed = tmp.artAbsorbNutrientLossSpeed.mul(tmp.artOverallAbsSpd)
    tmp.artAbsorbNutrientLossSpeed = tmp.artAbsorbNutrientLossSpeed.mul(tmp.artTotalSpeed)
    
    tmp.artNutrientExtractSpeed = [D(2), D(2), D(1), D(5), D(2.5)][player.art.elementSelected]
    tmp.artNutrientExtractSpeed = tmp.artNutrientExtractSpeed.mul(tmp.artTotalSpeed)

    tmp.artExtractNutrientLoss = [D(2), D(3), D(5), D(7), D(10)][player.art.elementSelected]
    tmp.artExtractNutrientLoss = tmp.artExtractNutrientLoss.mul(tmp.artTotalSpeed)

    if (player.art.state === 1) {
        let ratio = Decimal.div(player.janko.energy, tmp.artNConversionSpeedJ).min(1).mul(otherGameStuffIg.gameDelta)

        player.art.nutrients = Decimal.add(player.art.nutrients, tmp.artNConversionSpeedJ.div(tmp.artNConversionJper).mul(tmp.artNConversionGper).mul(ratio))
        player.janko.energy = Decimal.sub(player.janko.energy, tmp.artNConversionSpeedJ.mul(ratio)).max(0)
    }

    if (player.art.state === 2) {
        let ratio = Decimal.min(Decimal.div(player.art.nutrients, tmp.artAbsorbNutrientLossSpeed), Decimal.div(player.janko.energy, tmp.artAbsorbJSpeed)).min(1).mul(otherGameStuffIg.gameDelta)
        
        player.art.absorbed = Decimal.add(player.art.absorbed, tmp.artAbsorbJSpeed.mul(ratio))
        player.janko.energy = Decimal.sub(player.janko.energy, tmp.artAbsorbJSpeed.mul(ratio)).max(0)
        player.art.nutrients = Decimal.sub(player.art.nutrients, tmp.artAbsorbNutrientLossSpeed.mul(ratio)).max(0)
    }

    if (player.art.state >= 10) {
        let ratio = Decimal.div(player.art.nutrients, tmp.artExtractNutrientLoss).min(1).mul(otherGameStuffIg.gameDelta)

        player.art.elements[player.art.state - 10] = Decimal.add(player.art.elements[player.art.state - 10], tmp.artNutrientExtractSpeed.mul(ratio))
        player.art.nutrients = Decimal.sub(player.art.nutrients, tmp.artExtractNutrientLoss.mul(ratio)).max(0)
    }

    el("art").style.display = Decimal.gte(player.janko.upgrades[0], 1) ? "flex" : "none";
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
    el("artElmEffName").innerText = ART_ELEMENTS[player.art.elementSelected].name
    el("artNutrientTab").style["background-color"] = ART_ELEMENTS[player.art.elementSelected].bgcolor
    el("artNutrientTab").style.color = ART_ELEMENTS[player.art.elementSelected].color
    el("artNutrientTab").style.border = `3px solid ${ART_ELEMENTS[player.art.elementSelected].color}`
    el("artElmEff").innerHTML = ART_ELEMENTS[player.art.elementSelected].effDesc
    el("artNutrientsTab").style.display = Decimal.gte(player.janko.upgrades[2], 1) ? "flex" : "none";
    el("artExtractNutrient").style.color = ART_ELEMENTS[player.art.elementSelected].color
    el("artExtractNutrient").style.border = `3px solid ${ART_ELEMENTS[player.art.elementSelected].color}`
    el("artExtractNutrient").style["background-color"] = colorChange(ART_ELEMENTS[player.art.elementSelected].bgcolor, (player.art.state - 10) === player.art.elementSelected ? 1.5 : 1.0, 1.0)
    el("artExtrNutrient").innerText = ART_ELEMENTS[player.art.elementSelected].name
    el("artNutrientExtrLossSpeed").innerText = format(tmp.artExtractNutrientLoss, 1)
    el("artExtrGainSpeed").innerText = format(tmp.artNutrientExtractSpeed, 1)
    //  Rate: -<span id="artNutrientExtrLossSpeed"></span>g/s, +<span id="artExtrGainSpeed"></span>g/s
    for (let i = 0; i < ART_ELEMENTS.length; i++) {
        el("artElm" + i).innerText = format(player.art.elements[i], 2)
        el("artElmAll" + i).style.display = Decimal.gte(player.janko.upgrades[2], i + 1) ? "" : "none";
        if (i === player.art.elementSelected) {
            for (let j = 0; j < ART_ELEMENTS[i].milestones.length; j++) {
                let req = `Requirement: `
                if (i === 4) {
                    req += `${format(artHugTarget(ART_ELEMENTS[i].milestones[j].req))} hugs`
                } else {
                    req += `${format(ART_ELEMENTS[i].milestones[j].req, 1)}g of ${ART_ELEMENTS[i].name}`
                }
                el("artElmMileReq" + j).innerHTML = req
                el("artElmMileDesc" + j).innerHTML = ART_ELEMENTS[i].milestones[j].desc
                el("artElmMilestone" + j).style["background-color"] = colorChange(ART_ELEMENTS[player.art.elementSelected].bgcolor, Decimal.gte(player.art.elements[i], ART_ELEMENTS[i].milestones[j].req) ? 1.5 : 1.0, 1.0)
            }
        }
    }
}

function artSelectElm(x) {
    player.art.elementSelected = x
    reloadArtMilestones()
}

function reloadArtMilestones() {
    let table = ""
    for (let i = 0; i < ART_ELEMENTS[player.art.elementSelected].milestones.length; i++) {
        let req = `Requirement: `
        if (player.art.elementSelected === 4) {
            req += `${format(artHugTarget(ART_ELEMENTS[player.art.elementSelected].milestones[i].req))} hugs`
        } else {
            req += `${format(ART_ELEMENTS[player.art.elementSelected].milestones[i].req, 1)}g of ${ART_ELEMENTS[player.art.elementSelected].name}`
        }

        table += `
            <div id="artElmMilestone${i}" style="font-family: Tinos; text-align: center; margin: 2px; padding: 4px; font-size: 14px; color: ${ART_ELEMENTS[player.art.elementSelected].color}; border: 2px solid ${ART_ELEMENTS[player.art.elementSelected].color}; background-color: ${ART_ELEMENTS[player.art.elementSelected].bgcolor};">
                <div id="artElmMileReq${i}">${req}</div>
                <div id="artElmMileDesc${i}">${ART_ELEMENTS[player.art.elementSelected].milestones[i].desc}</div>
            </div>
        `
    }
    el("artElmMilestones").innerHTML = table
}

function artExtractNutrients() {
    player.art.state = player.art.state === (player.art.elementSelected + 10) ? 0 : (player.art.elementSelected + 10)
}