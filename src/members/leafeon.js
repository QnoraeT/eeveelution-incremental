"use strict";

const LEAF_ELEMENTS = [
    {
        get eff() {
            let i = Decimal.max(player.leafeon.elements[0], 0).mul(0.01).add(1).root(1.8)
            if (getLeafMilestone(0, 5)) { i = i.pow(getLeafMileEff(0, 5)) } 
            return i
        },
        gainConstant: D(2), // how much of the element to gain
        lossConstant: D(2), // how much nutrients to lose
        effString: `Oxygen increases how much you pat <span class="tqName"></span> by <b><span id="leafNutrient0Eff" style="font-size: 20px"></span></b>x.`,
        name: "Oxygen",
        color: "#37ff48",
        bgcolor: "#0f4b14",
        milestones: [
            {
                req: D(50),
                get effect() {
                    return Decimal.max(player.tearonq.pats, 10).log10().pow(2).div(40).add(1)
                },
                effString: `<span class="tqName"></span> pats boost nutrient gain via gathering by <b><span id="leafNMile-0,0" style="font-size: 16px"></span></b>x.`
            },
            {
                req: D(100),
                get effect() {
                    let i = Decimal.max(player.jolteon.excessEnergy, 10).dilate(0.9).div(10).pow(0.1)
                    if (getLeafMilestone(1, 0)) { i = i.pow(getLeafMileEff(1, 0)) }
                    return i
                },
                effString: `<span class="joltName"></span> overflow energy makes absorption <b><span id="leafNMile-0,1" style="font-size: 16px"></span></b>x faster.`
            },
            {
                req: D(400),
                get effect() {
                    return Decimal.pow(tmp.jolteon.genEff, 0.07)
                },
                effString: `<span class="joltName"></span> generators also multiply <span class="tqName"></span> pats by <b><span id="leafNMile-0,2" style="font-size: 16px"></span></b>x.`
            },
            {
                req: D(2000),
                get effect() {
                    return Decimal.max(player.tearonq.temperature, 1).log10().add(1)
                },
                effString: `<span class="tqName"></span>'s temperature also increases how much <span class="tqPronoun0"></span> <span class="tqPronoun5"></span> pat by <b><span id="leafNMile-0,3" style="font-size: 16px"></span></b>x.`
            },
            {
                req: D(125000),
                get effect() {
                    return D(0.1)
                },
                effString: `<span class="joltName"></span> upgrade 2's base is increased by +<b><span id="leafNMile-0,4" style="font-size: 16px"></span></b>.`
            },
            {
                req: D(2e6),
                get effect() {
                    return Decimal.max(player.tearonq.highTemp, 963).div(0.963).log10().sub(2)
                },
                effString: `<span class="tqName"></span>'s highest temperature >${format(1e3)}°C improves Oxygen's effect! (^<b><span id="leafNMile-0,5" style="font-size: 16px"></span></b>)`
            }
        ]
    },
    {
        get eff() {
            return Decimal.max(player.leafeon.elements[1], 0).mul(0.02).add(1).root(1.5)
        },
        gainConstant: D(2), // how much of the element to gain
        lossConstant: D(3), // how much nutrients to lose
        effString: `Nitrogen boosts <span class="joltName"></span>'s energy generation by <b><span id="leafNutrient1Eff" style="font-size: 20px"></span></b>x.`,
        name: "Nitrogen",
        color: "#ff8953",
        bgcolor: "#492515",
        milestones: [
            {
                req: D(100),
                get effect() {
                    return D(1.4)
                },
                effString: `Unlock another <span class="joltName"></span> Upgrade, and Oxygen Milestone 2 is improved by ^<b><span id="leafNMile-1,0" style="font-size: 16px"></span></b>.`
            },
            {
                req: D(500),
                get effect() {
                    return Decimal.max(player.jolteon.energy, 10).div(10).pow(0.1)
                },
                effString: `<span class="joltName"></span>'s energy boosts <span class="joltPronoun2"></span> own generation by <b><span id="leafNMile-1,1" style="font-size: 16px"></span></b>x.`
            },
            {
                req: D(4000),
                get effect() {
                    return D(1.15)
                },
                effString: `<span class="tqName"></span> members effect is raised to the ^<b><span id="leafNMile-1,2" style="font-size: 16px"></span></b>.`
            },
            {
                req: D(200000),
                get effect() {
                    return D(10)
                },
                effString: `<span class="tqName"></span>'s temperature increases <b><span id="leafNMile-1,3" style="font-size: 16px"></span></b>x as fast.`
            },
        ]
    },
    {
        get eff() {
            return Decimal.max(player.leafeon.elements[2], 0).add(1).ln().div(5).add(1).pow(5).sub(1).mul(0.01).add(1)
        },
        gainConstant: D(1), // how much of the element to gain
        lossConstant: D(5), // how much nutrients to lose
        effString: `Hydrogen buffs <span class="joltName"></span>'s energy capacity by <b><span id="leafNutrient2Eff" style="font-size: 20px"></span></b>x.`,
        name: "Hydrogen",
        color: "#fff460",
        bgcolor: "#424018",
        milestones: [
            {
                req: D(1000),
                get effect() {
                    return Decimal.root(player.jolteon.excessEnergy, 3).div(100).add(10).dilate(0.667).div(10)
                },
                effString: `<span class="joltName"></span>'s overflowed energy increases <span class="joltPronoun2"></span> capacity by <b><span id="leafNMile-2,0" style="font-size: 16px"></span></b>x.`
            },
            {
                req: D(2500),
                get effect() {
                    return Decimal.max(player.tearonq.temperature, 0).div(100).add(1).pow(0.7)
                },
                effString: `<span class="tqName"></span>'s temperature also increases <span class="leafName"></span>'s absorption speed by <b><span id="leafNMile-2,1" style="font-size: 16px"></span></b>x.`
            },
            {
                req: D(5000),
                get effect() {
                    return Decimal.max(player.tearonq.pats, 0).add(1).log10().pow(2).div(400).add(1)
                },
                effString: `<span class="tqName"></span>'s pats increase how much energy <span class="joltName"></span> can hold by <b><span id="leafNMile-2,2" style="font-size: 16px"></span></b>x.`
            },
            {
                req: D(1e10),
                get effect() {
                    return Decimal.max(player.leafeon.elements[2], 10).log10().log10().mul(0.01).add(1)
                },
                effString: `Hydrogen directly boosts <span class="joltName"></span>'s energy capacity by ^<b><span id="leafNMile-2,3" style="font-size: 16px"></span></b>.`
            },
        ]
    },
    {
        get eff() {
            return Decimal.max(player.leafeon.elements[3], 0).div(1000).add(1).ln().div(3).add(1).pow(2)
        },
        gainConstant: D(5), // how much of the element to gain
        lossConstant: D(7), // how much nutrients to lose
        effString: `Carbon increases <span class="leafName"></span>'s overall speed by <b><span id="leafNutrient3Eff" style="font-size: 20px"></span></b>x.`,
        name: "Carbon",
        color: "#5956ff",
        bgcolor: "#1e1e53",
        milestones: [
            {
                req: D(7500),
                get effect() {
                    return Decimal.max(player.leafeon.nutrients, 0).div(1000).add(1).ln().div(12).add(1).pow(3)
                },
                effString: `<span class="leafName"></span>'s current nutrients multiply <span class="leafPronoun2"></span> speed by <b><span id="leafNMile-3,0" style="font-size: 16px"></span></b>x.`
            },
            {
                req: D(450000),
                get effect() {
                    return D(2.5)
                },
                effString: `<span class="leafName"></span>'s absorption speed is <b><span id="leafNMile-3,1" style="font-size: 16px"></span></b>x faster.`
            },
            {
                req: D(1e7),
                get effect() {
                    return Decimal.max(player.leafeon.absorbed, 1e9).log10().div(9).pow(2)
                },
                effString: `Carbon Milestone 1 uses <span class="leafPronoun2"></span> best nutrients, and Absorbed Energy starting at ${format(1e9)} boosts <span class="leafName"></span>'s speed by <b><span id="leafNMile-3,2" style="font-size: 16px"></span></b>x.`
            },
            {
                req: D(1e9),
                get effect() {
                    let eff = D(1)
                    for (let i = 0; i < LEAF_ELEMENTS.length; i++) {
                        eff = eff.mul(Decimal.max(player.leafeon.elements[i], 1))
                    }
                    return eff.root(player.leafeon.elements.length).div(1e10).add(1).mul(10).dilate(0.8).div(10)
                },
                effString: `The geometric mean of all elements also speed <span class="leafPronoun1"></span> up by <b><span id="leafNMile-3,3" style="font-size: 16px"></span></b>x.`
            },
        ]
    },
    {
        get eff() {
            return leafHugTarget(player.leafeon.elements[4])
        },
        next(x) {
            return leafHugReq(x)
        },
        gainConstant: D(2.5), // how much of the element to gain
        lossConstant: D(10), // how much nutrients to lose
        effString: `Phosphorus lets <span class="leafName"></span> hug <span class="tqName"></span> <b><span id="leafNutrient4Eff" style="font-size: 20px"></span></b> times. (Next: <span id="leafNutrient4Next"></span>)<br>`,
        name: "Phosphorus",
        color: "#a04eff",
        bgcolor: "#351b52",
        milestones: [
            {
                req: leafHugReq(D(1)),
                get effect() {
                    return tmp.leafeon.elementEffs[4].add(1)
                },
                effString: `<span class="tqName"></span> hugs increases <span class="tqPronoun2"></span> temperature by <b><span id="leafNMile-4,0" style="font-size: 16px"></span></b>x.`
            },
            {
                req: leafHugReq(D(6)),
                get effect() {
                    return Decimal.pow(1.1, tmp.leafeon.elementEffs[4])
                },
                effString: `<span class="tqName"></span> hugs boost <span class="tqPronoun2"></span> pats and temperature by <b><span id="leafNMile-4,1" style="font-size: 16px"></span></b>x.`
            },
            {
                req: leafHugReq(D(12)),
                get effect() {
                    return Decimal.pow(1.25, tmp.leafeon.elementEffs[4].sub(9).max(0))
                },
                effString: `<span class="tqName"></span> hugs also increase <span class="leafName"></span>'s absorption speed by <b><span id="leafNMile-4,2" style="font-size: 16px"></span></b>x.`
            },
        ]
    },
]

function getLeafMilestone(elm, num) {
    return Decimal.gte(player.leafeon.bestElements[elm], LEAF_ELEMENTS[elm].milestones[num].req)
}

function getLeafMileEff(elm, num) {
    return tmp.leafeon.elementMilestoneEffs[elm][num]
}

function leafHugReq(x) {
    return smoothPoly(x.sub(1), D(2.5), D(100), false).pow_base(2).mul(1000).ceil()
}

function leafHugTarget(x) {
    x = Decimal.max(x, 0)
    if (x.lt(1000)) { return D(0) }
    return smoothPoly(x.div(1000).log2(), D(2.5), D(100), true).add(1).floor()
}

function setupLeafHTML() {
    let table = '<b><span style="font-size: 20px"><span class="leafName"></span>\'s collected elements:</span></b><br>'
    for (let i = 0; i < LEAF_ELEMENTS.length; i++) {
        table += `<button id="leafElmAll${i}" onclick="leafSelectElm(${i})" class="font" style="color: ${LEAF_ELEMENTS[i].color}; border: 3px solid ${LEAF_ELEMENTS[i].color}; background-color: ${LEAF_ELEMENTS[i].bgcolor};"><span class="leafName"></span> has <b><span id="leafElm${i}" style="font-size: 20px"></span></b>g of ${LEAF_ELEMENTS[i].name}.</button>`
    }
    el("leafNutrients").innerHTML = table

    table = ''
    for (let i = 0; i < LEAF_ELEMENTS.length; i++) {
        table += `
        <div id="leafNutrientTab${i}" class="flex-vertical font" style="margin: 2px; padding: 8px; font-size: 16px; border: 3px solid ${LEAF_ELEMENTS[i].color}; color: ${LEAF_ELEMENTS[i].color}; background-color: ${LEAF_ELEMENTS[i].bgcolor};">
            <b><span style="font-size: 20px">${LEAF_ELEMENTS[i].name}</span></b><br>
            <div id="leafElm${i}Eff" class="font">${LEAF_ELEMENTS[i].effString}</div>
            <button onclick="leafExtractNutrients()" id="leafExtractNutrient${i}" class="font" style="font-size: 16px; border: 3px solid ${LEAF_ELEMENTS[i].color}; color: ${LEAF_ELEMENTS[i].color}; background-color: ${LEAF_ELEMENTS[i].bgcolor};">
                Extract ${LEAF_ELEMENTS[i].name}.<br>
                Conversion: <span id="leafExtrLossConv${i}"></span>g Nutrients -> <span id="leafExtrGainConv${i}"></span>g ${LEAF_ELEMENTS[i].name}<br>
                Rate: <span id="leafExtrLossSpeed${i}"></span>g Nutrients/s -> <span id="leafExtrGainSpeed${i}"></span>g ${LEAF_ELEMENTS[i].name}/s
            </button><br>
            <div id="leafElmMilestones${i}" class="flex-vertical font"></div>
        </div>
        `
    }
    el('leafNutrientTab').innerHTML = table

    table = ""
    for (let i = 0; i < LEAF_ELEMENTS.length; i++) {
        table = ``
        for (let j = 0; j < LEAF_ELEMENTS[i].milestones.length; j++) {
            let req = `Requirement: `
            if (i === 4) {
                req += `${format(leafHugTarget(LEAF_ELEMENTS[i].milestones[j].req))} hugs`
            } else {
                req += `${format(LEAF_ELEMENTS[i].milestones[j].req, 1)}g of ${LEAF_ELEMENTS[i].name}`
            }

            table += `
                <div id="leafElm${i}Milestone${j}" style="text-align: center; margin: 2px; padding: 4px; font-size: 14px; color: ${LEAF_ELEMENTS[i].color}; border: 2px solid ${LEAF_ELEMENTS[i].color}; background-color: ${LEAF_ELEMENTS[i].bgcolor};">
                    <div id="leafElm${i}MileReq${j}">${req}</div>
                    <div id="leafElm${i}MileDesc${j}">${LEAF_ELEMENTS[i].milestones[j].effString}</div>
                </div>
            `
        }
        el(`leafElmMilestones${i}`).innerHTML = table
    }
}

function updateLeafeon_Game() {
    tmp.leafeon.totalEnergyUsage = D(0)

    for (let i = 0; i < LEAF_ELEMENTS.length; i++) {
        tmp.leafeon.elementEffs[i] = LEAF_ELEMENTS[i].eff;
        for (let j = 0; j < LEAF_ELEMENTS[i].milestones.length; j++) {
            tmp.leafeon.elementMilestoneEffs[i][j] = LEAF_ELEMENTS[i].milestones[j].effect
        }
    }

    let i;
    tmp.leafeon.absEngEff = Decimal.max(player.leafeon.absorbed, 0).div(1000).add(1).sqrt().mul(2.41421356237).sub(1.41421356237)

    i = D(1)
    i = i.mul(tmp.leafeon.elementEffs[3])
    i = i.mul(JOLTY_ENG_UPS[3].eff)
    if (getLeafMilestone(3, 0)) { i = i.mul(getLeafMileEff(3, 0)) }
    if (getLeafMilestone(3, 2)) { i = i.mul(getLeafMileEff(3, 2)) }
    tmp.leafeon.totalSpeed = i

    i = D(1)
    i = i.mul(JOLTY_ENG_UPS[2].eff)
    i = i.mul(tmp.leafeon.totalSpeed)
    tmp.leafeon.nutrientGatherSpeed = i

    i = D(2)
    if (getLeafMilestone(0, 0)) { i = i.mul(getLeafMileEff(0, 0)) }
    tmp.leafeon.nConversionGper = i

    i = D(100)
    tmp.leafeon.nConversionJper = i
    
    i = D(10)
    i = i.mul(tmp.leafeon.nutrientGatherSpeed)
    tmp.leafeon.nConversionSpeedJ = i

    // kinda hard-coded but whatever TwT
    i = tmp.leafeon.nConversionSpeedJ.div(tmp.leafeon.nConversionJper).mul(tmp.leafeon.nConversionGper)
    tmp.leafeon.nConversionSpeedG = i
    
    i = D(1)
    if (getLeafMilestone(0, 1)) { i = i.mul(getLeafMileEff(0, 1)) }
    if (getLeafMilestone(2, 1)) { i = i.mul(getLeafMileEff(2, 1)) }
    if (getLeafMilestone(3, 1)) { i = i.mul(getLeafMileEff(3, 1)) }
    tmp.leafeon.overallAbsSpd = i

    i = D(25)
    i = i.mul(tmp.leafeon.overallAbsSpd)
    i = i.mul(tmp.leafeon.totalSpeed)
    tmp.leafeon.absorbJSpeed = i

    i = D(0.5)
    i = i.mul(tmp.leafeon.overallAbsSpd)
    i = i.mul(tmp.leafeon.totalSpeed)
    tmp.leafeon.absorbNutrientLossSpeed = i

    tmp.leafeon.extractGainConvDisp = LEAF_ELEMENTS[player.leafeon.elementSelected].gainConstant
    tmp.leafeon.extractLossConvDisp = LEAF_ELEMENTS[player.leafeon.elementSelected].lossConstant
    if (player.leafeon.state >= 10) {
        tmp.leafeon.extractGainConv = LEAF_ELEMENTS[player.leafeon.state - 10].gainConstant
        tmp.leafeon.extractLossConv = LEAF_ELEMENTS[player.leafeon.state - 10].lossConstant
    } else {
        tmp.leafeon.extractGainConv = D(0)
        tmp.leafeon.extractLossConv = D(0)
    }

    i = D(1)
    i = i.mul(tmp.leafeon.totalSpeed)
    tmp.leafeon.overallExtractSpeed = i
    
    i = tmp.leafeon.extractGainConv
    i = i.mul(tmp.leafeon.overallExtractSpeed)
    tmp.leafeon.extractGainSpeed = i

    i = tmp.leafeon.extractLossConv
    i = i.mul(tmp.leafeon.overallExtractSpeed)
    tmp.leafeon.extractLossSpeed = i

    i = tmp.leafeon.extractGainConvDisp
    i = i.mul(tmp.leafeon.overallExtractSpeed)
    tmp.leafeon.extractGainSpeedDisp = i

    i = tmp.leafeon.extractLossConvDisp
    i = i.mul(tmp.leafeon.overallExtractSpeed)
    tmp.leafeon.extractLossSpeedDisp = i

    if (player.leafeon.state === 1) {
        let ratio = Decimal.div(player.jolteon.energy, tmp.leafeon.nConversionSpeedJ).min(1).mul(otherGameStuffIg.gameDelta)

        player.leafeon.nutrients = Decimal.add(player.leafeon.nutrients, tmp.leafeon.nConversionSpeedJ.div(tmp.leafeon.nConversionJper).mul(tmp.leafeon.nConversionGper).mul(ratio))
        player.jolteon.energy = Decimal.sub(player.jolteon.energy, tmp.leafeon.nConversionSpeedJ.mul(ratio)).max(0)

        tmp.leafeon.totalEnergyUsage = tmp.leafeon.nConversionSpeedJ
    }

    if (player.leafeon.state === 2) {
        let ratio = Decimal.min(
            Decimal.div(player.leafeon.nutrients, tmp.leafeon.absorbNutrientLossSpeed), 
            Decimal.div(player.jolteon.energy, tmp.leafeon.absorbJSpeed)
        ).min(1).mul(otherGameStuffIg.gameDelta)
        
        player.leafeon.absorbed = Decimal.add(player.leafeon.absorbed, tmp.leafeon.absorbJSpeed.mul(ratio))
        player.jolteon.energy = Decimal.sub(player.jolteon.energy, tmp.leafeon.absorbJSpeed.mul(ratio)).max(0)
        player.leafeon.nutrients = Decimal.sub(player.leafeon.nutrients, tmp.leafeon.absorbNutrientLossSpeed.mul(ratio)).max(0)

        tmp.leafeon.totalEnergyUsage = tmp.leafeon.absorbJSpeed
    }

    if (player.leafeon.state >= 10) {
        let ratio = Decimal.div(player.leafeon.nutrients, tmp.leafeon.extractLossSpeed).min(1).mul(otherGameStuffIg.gameDelta)

        player.leafeon.elements[player.leafeon.state - 10] = Decimal.add(player.leafeon.elements[player.leafeon.state - 10], tmp.leafeon.extractGainSpeed.mul(ratio))
        player.leafeon.nutrients = Decimal.sub(player.leafeon.nutrients, tmp.leafeon.extractLossSpeed.mul(ratio)).max(0)
    }

    for (let i = 0; i < LEAF_ELEMENTS.length; i++) {
        player.leafeon.bestElements[i] = Decimal.max(player.leafeon.elements[i], player.leafeon.bestElements[i]);
    }
}

function updateLeafeon_HTML() {
    el("leaf").style.display = Decimal.gte(player.jolteon.upgrades[0], 1) ? "flex" : "none";
    el("leafEngAbs").innerText = format(player.leafeon.absorbed);
    el("absEngAbsEff").innerText = format(tmp.leafeon.absEngEff, 2);
    el("leafAbsorbGet").style["background-color"] = player.leafeon.state === 2 ? "#008010" : "#004704";
    
    // hardcoded lmao
    // uses tmp.leafeon.absorbJSpeed and tmp.leafeon.absorbNutrientLossSpeed variables
    el("leafAbsorbConvG").innerText = format(0.5, 2);
    el("leafAbsorbConvJ").innerText = format(25, 1);
    el("leafAbsorbSpeedG").innerText = format(tmp.leafeon.absorbNutrientLossSpeed, 2);
    el("leafAbsorbSpeedJ").innerText = format(tmp.leafeon.absorbJSpeed, 1);

    el("leafNutrientAmt").innerText = format(player.leafeon.nutrients, 2);
    el("leafNutrientConvG").innerText = format(tmp.leafeon.nConversionGper, 2);
    el("leafNutrientConvJ").innerText = format(tmp.leafeon.nConversionJper, 1);
    el("leafNutrientConvSpeedJ").innerText = format(tmp.leafeon.nConversionSpeedJ, 1);
    el("leafNutrientConvSpeedG").innerText = format(tmp.leafeon.nConversionSpeedG, 1);
    el("leafNutrientGet").style["background-color"] = player.leafeon.state === 1 ? "#008010" : "#004704";

    el("leafNutrientsTab").style.display = Decimal.gte(player.jolteon.upgrades[2], 1) ? "flex" : "none";

    for (let i = 0; i < LEAF_ELEMENTS.length; i++) {
        el("leafElm" + i).innerText = format(player.leafeon.elements[i]);
        el("leafElmAll" + i).style.display = Decimal.gte(player.jolteon.upgrades[2], i + 1) ? "" : "none";

        el(`leafNutrientTab${i}`).style.display = i === player.leafeon.elementSelected ? "flex" : "none";
        if (i === player.leafeon.elementSelected) {
            el(`leafNutrient${i}Eff`).innerText = format(tmp.leafeon.elementEffs[i], i === 4 ? 0 : 2)
            if (i === 4) {
                el(`leafNutrient${i}Next`).innerText = format(LEAF_ELEMENTS[i].next(tmp.leafeon.elementEffs[i].add(1).floor()))
            }
            el(`leafExtractNutrient${i}`).style["background-color"] = colorChange(LEAF_ELEMENTS[i].bgcolor, (player.leafeon.state - 10) === i ? 1.5 : 1.0, 1.0)

            /*
            Extract ${LEAF_ELEMENTS[i].name}.<br>
            Conversion: <span id="leafExtrLossConv${i}"></span>g Nutrients -> <span id="leafExtrGainConv${i}"></span>g ${LEAF_ELEMENTS[i].name}
            Rate: <span id="leafExtrLossSpeed${i}"></span>g Nutrients/s -> <span id="leafExtrGainSpeed${i}"></span>g ${LEAF_ELEMENTS[i].name}/s
            */
            el(`leafExtrLossConv${i}`).innerText = format(tmp.leafeon.extractLossConvDisp, 1)
            el(`leafExtrGainConv${i}`).innerText = format(tmp.leafeon.extractGainConvDisp, 1)
            el(`leafExtrLossSpeed${i}`).innerText = format(tmp.leafeon.extractLossSpeedDisp, 1)
            el(`leafExtrGainSpeed${i}`).innerText = format(tmp.leafeon.extractGainSpeedDisp, 1)

            for (let j = 0; j < LEAF_ELEMENTS[i].milestones.length; j++) {
                el(`leafElm${i}Milestone${j}`).style.display = (j === 0 || getLeafMilestone(i, j - 1))
                    ? "block"
                    : "none"
                if (j === 0 || getLeafMilestone(i, j - 1)) {
                    let req = `Requirement: `
                    if (i === 4) {
                        req += `${format(leafHugTarget(LEAF_ELEMENTS[i].milestones[j].req))} hugs`
                    } else {
                        req += `${format(LEAF_ELEMENTS[i].milestones[j].req, 1)}g of ${LEAF_ELEMENTS[i].name}`
                    }
                    el(`leafElm${i}MileReq${j}`).innerHTML = req
                    el(`leafElm${i}Milestone${j}`).style["background-color"] = colorChange(LEAF_ELEMENTS[i].bgcolor, getLeafMilestone(i, j) ? 1.5 : 1.0, 1.0)
                    el(`leafNMile-${i},${j}`).innerText = format(LEAF_ELEMENTS[i].milestones[j].effect, 2)
                }
            }
        }
    }
}

function leafSelectElm(x) {
    player.leafeon.elementSelected = x
}
function leafExtractNutrients() {
    player.leafeon.state = player.leafeon.state === (player.leafeon.elementSelected + 10) ? 0 : (player.leafeon.elementSelected + 10)
}