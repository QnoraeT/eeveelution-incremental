"use strict";

const JANKO_ENG_UPS = [
    {
        num: 1,
        cap: D(1),
        cost: D(20),
        desc: "Invite new people!",
        get eff() {
            let i = D(2)
            return i
        },
        get upgDesc() {
            return `Get <b><span style="font-size: 16px; color: #00ff00">Art</span></b> to join EVB, and multiply TearonQ pats by <b><span style="font-size: 16px">${format(this.eff, 1)}</span></b>x.`
        },
        get show() {
            return Decimal.gte(player.janko.bestEnergy, 20)
        }
    },
    {
        num: 2,
        cap: D(Infinity),
        desc: "Encourage your members!",
        get cost() {
            return smoothPoly(D(player.janko.upgrades[1]), D(2), D(215.3382790366962)).pow_base(3).mul(50)
        },
        get target() {
            if (Decimal.lt(player.janko.energy, 50)) { return D(0) }
            return smoothPoly(Decimal.div(player.janko.energy, 50).log(3), D(2), D(215.3382790366962), true)
        },
        get eff() {
            let exp = this.effBase
            let i = Decimal.pow(exp, D(player.janko.upgrades[1]))
            return i
        },
        get effBase() {
            let i = D(2)
            if (getArtMilestone(0, 4)) { i = i.add(getArtMileEff(0, 4)) }
            return i
        },
        get upgDesc() {
            return `Multiply TearonQ pats by <b><span style="font-size: 16px">${format(this.effBase, 1)}</span></b>x. (Total: ${format(this.eff)}x)`
        },
        get show() {
            return Decimal.gte(player.janko.bestEnergy, 20)
        }
    },
    {
        num: 3,
        cap: D(5),
        desc: "Enrich Art's soil!",
        get cost() {
            return [D(400), D(5000), D(30000), D(1e5), D(1e6), D(Infinity)][D(player.janko.upgrades[2]).toNumber()]
        },
        get eff() {
            let exp = this.effBase
            let i = Decimal.pow(exp, D(player.janko.upgrades[2]))
            return i
        },
        get effBase() {
            let i = D(2)
            return i
        },
        get upgDesc() {
            return `Enable Art to extract various molecules, and make his nutrient speed <b><span style="font-size: 16px">${format(this.effBase, 1)}</span></b>x faster. (Total: ${format(this.eff)}x)`
        },
        get show() {
            return Decimal.gte(player.janko.bestEnergy, 100)
        }
    },
    {
        num: 4,
        cap: D(Infinity),
        desc: "Hug Art!",
        get cost() {
            return smoothPoly(D(player.janko.upgrades[3]), D(2), D(50)).pow_base(4).mul(1000)
        },
        get target() {
            if (Decimal.lt(player.janko.energy, 1000)) { return D(0) }
            return smoothPoly(Decimal.div(player.janko.energy, 1000).log(4), D(2), D(50), true)
        },
        get eff() {
            let exp = this.effBase
            let i = Decimal.pow(exp, D(player.janko.upgrades[3]))
            return i
        },
        get effBase() {
            let i = D(1.5)
            return i
        },
        get upgDesc() {
            return `Motivate Art, which makes him <b><span style="font-size: 16px">${format(this.effBase, 1)}</span></b>x faster! (Total: ${format(this.eff, 1)}x)`
        },
        get show() {
            return getArtMilestone(1, 0)
        }
    },
]

function setupJankoHTML() {
    let table = ""
    for (let i = 0; i < JANKO_ENG_UPS.length; i++) {
        table += `
        <button onclick="buyJankoUpgrade(${i})" id="jankoUpg${i}" style="width: 160px; height: 120px; font-family: Tinos; color: #ffee00; font-size: 14px; border: 3px solid #ffee00; background-color: #6e6d20;">
            <span id="jankoUpgDesc${i}"></span><br>
            <span id="jankoUpgEff${i}" style="font-size: 12px;"></span><br>
            <span id="jankoUpgCost${i}"></span>
        </button>
        `
    }
    el("jankoUpgs").innerHTML = table
}

function updateJanko() {
    let table, i
    i = D(1000)
    i = i.mul(tmp.artAbsEngEff)
    i = i.mul(ART_ELEMENTS[2].eff)
    if (getArtMilestone(2, 0)) { i = i.mul(getArtMileEff(2, 0)) }
    if (getArtMilestone(2, 2)) { i = i.mul(getArtMileEff(2, 2)) }
    tmp.energyCap = i

    tmp.jankoGenEff = Decimal.eq(player.janko.generators, 0) ? D(0) : Decimal.pow(2, player.janko.generators)
    i = tmp.jankoGenEff.mul(player.tearonq.temperature).div(100)
    i = i.mul(ART_ELEMENTS[1].eff)
    if (getArtMilestone(1, 1)) { i = i.mul(getArtMileEff(1, 1)) }
    tmp.energyGen = i

    player.janko.energy = Decimal.add(player.janko.energy, tmp.energyGen.mul(otherGameStuffIg.gameDelta))
    if (player.janko.energy.gte(tmp.energyCap)) {
        player.janko.excessEnergy = Decimal.add(player.janko.excessEnergy, player.janko.energy.sub(tmp.energyCap))
        player.janko.energy = tmp.energyCap
    }
    player.janko.bestEnergy = Decimal.max(player.janko.bestEnergy, player.janko.energy)

    tmp.jankoGenCost = calcJankoGenCost(player.janko.generators, false)
    tmp.energyOverflowEff = Decimal.max(player.janko.excessEnergy, 0).div(1000).add(1).root(4).mul(10).dilate(1.1).div(10)

    el("janko").style.display = Decimal.gte(tmp.tearonqLevel, 5) ? "flex" : "none";
    el("jankoGen").innerText = format(player.janko.generators, 1)
    el("jankoEng").innerText = format(player.janko.energy, 1)
    el("jankoEngCap").innerText = format(tmp.energyCap, 1)
    el("jankoEngGain").innerText = format(tmp.energyGen, 1)
    el("jankoEngOv").innerText = format(player.janko.excessEnergy, 1)
    el("jankoEngOvEff").innerText = format(tmp.energyOverflowEff, 2)
    el("jankoGenPatCost").innerText = format(tmp.jankoGenCost)
    for (let i = 0; i < JANKO_ENG_UPS.length; i++) {
        el("jankoUpg" + i).style.display = JANKO_ENG_UPS[i].show ? "" : "none";
        if (!JANKO_ENG_UPS[i].show) {
            continue;
        }


        table = Decimal.gte(player.janko.upgrades[i], JANKO_ENG_UPS[i].cap) ? "#ffee00" : Decimal.gte(player.janko.energy, JANKO_ENG_UPS[i].cost) ? "#aa9900" : "#665500"
        el("jankoUpg" + i).style.border = "3px solid " + table

        table = JANKO_ENG_UPS[i].desc
        if (!JANKO_ENG_UPS[i].cap.eq(Infinity)) {
            table += ` (${format(player.janko.upgrades[i])}/${format(JANKO_ENG_UPS[i].cap)})`
        }
        el("jankoUpgDesc" + i).innerText = table
        el("jankoUpgEff" + i).innerHTML = JANKO_ENG_UPS[i].upgDesc
        el("jankoUpgCost" + i).innerText = `Cost: ${format(JANKO_ENG_UPS[i].cost)} J of energy.`
    }
}

function calcJankoGenCost(x, inv = false) {
    x = D(x)
    return inv
        ? smoothPoly(x.div(100).log2(), D(3), D(25), true)
        : smoothPoly(x, D(3), D(25), false).pow_base(2).mul(100)
}

function buyGenerator() {
    if (Decimal.gte(player.tearonq.pats, tmp.jankoGenCost)) {
        player.tearonq.pats = Decimal.sub(player.tearonq.pats, tmp.jankoGenCost)
        player.janko.generators = Decimal.add(player.janko.generators, 1)
    }
}

function buyJankoUpgrade(id) {
    if (Decimal.gte(player.janko.energy, JANKO_ENG_UPS[id].cost) && Decimal.lt(player.janko.upgrades[id], JANKO_ENG_UPS[id].cap)) {
        player.janko.energy = Decimal.sub(player.janko.energy, JANKO_ENG_UPS[id].cost)
        player.janko.upgrades[id] = Decimal.add(player.janko.upgrades[id], 1)
    }
}