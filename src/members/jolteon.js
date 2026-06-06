"use strict";

const JOLTY_ENG_UPS = [
    {
        num: 1,
        cap: D(1),
        cost: D(20),
        desc: "Invite new people!",
        get eff() {
            let i = D(2)
            return i
        },
        get effBase() {
            let i = D(2)
            return i
        },
        effString: `Get <span class="leafName"></span> to join your team, and multiply <span class="tqName"></span> pats by <b><span id="joltUpg0Eff" style="font-size: 16px"></span></b>x.`,
        get show() {
            return Decimal.gte(player.jolteon.bestEnergy, 20)
        }
    },
    {
        num: 2,
        cap: D(Infinity),
        desc: "Encourage your members!",
        get cost() {
            return smoothPoly(D(player.jolteon.upgrades[1]), D(2), D(215.3382790366962)).pow_base(3).mul(50)
        },
        get target() {
            if (Decimal.lt(player.jolteon.energy, 50)) { return D(0) }
            return smoothPoly(Decimal.div(player.jolteon.energy, 50).log(3), D(2), D(215.3382790366962), true)
        },
        get eff() {
            let exp = this.effBase
            let i = Decimal.pow(exp, D(player.jolteon.upgrades[1]))
            return i
        },
        get effBase() {
            let i = D(2)
            if (getLeafMilestone(0, 4)) { i = i.add(getLeafMileEff(0, 4)) }
            return i
        },
        effString: `Multiply <span class="tqName"></span> pats by <b><span id="joltUpg1Eff" style="font-size: 16px"></span></b>x. (Total: <span id="joltUpg1TotalEff"></span>x)`,
        get show() {
            return Decimal.gte(player.jolteon.bestEnergy, 20)
        }
    },
    {
        num: 3,
        cap: D(5),
        desc: "Enrich <span class=\"leafName\"></span>'s soil!",
        get cost() {
            return [D(400), D(5000), D(30000), D(1e5), D(1e6), D(Infinity)][D(player.jolteon.upgrades[2]).toNumber()]
        },
        get eff() {
            let exp = this.effBase
            let i = Decimal.pow(exp, D(player.jolteon.upgrades[2]))
            return i
        },
        get effBase() {
            let i = D(2)
            return i
        },
        effString: `Enable <span class="leafName"></span> to extract various molecules, and make <span class="leafPronoun2"></span> gathering speed <b><span id="joltUpg2Eff" style="font-size: 16px"></span></b>x faster. (Total: <span id="joltUpg2TotalEff"></span>x)`,
        get show() {
            return Decimal.gte(player.jolteon.bestEnergy, 100)
        }
    },
    {
        num: 4,
        cap: D(Infinity),
        desc: 'Hug <span class="leafName"></span>!',
        get cost() {
            return smoothPoly(D(player.jolteon.upgrades[3]), D(2), D(50)).pow_base(4).mul(1000)
        },
        get target() {
            if (Decimal.lt(player.jolteon.energy, 1000)) { return D(0) }
            return smoothPoly(Decimal.div(player.jolteon.energy, 1000).log(4), D(2), D(50), true)
        },
        get eff() {
            let exp = this.effBase
            let i = Decimal.pow(exp, D(player.jolteon.upgrades[3]))
            return i
        },
        get effBase() {
            let i = D(1.5)
            return i
        },
        effString: `Motivate <span class="leafName"></span>, which makes <span class="leafPronoun1"></span> <b><span id="joltUpg3Eff" style="font-size: 16px"></span></b>x faster! (Total: <span id="joltUpg3TotalEff"></span>x)`,
        get show() {
            return getLeafMilestone(1, 0)
        }
    },
]

function setupJoltyHTML() {
    let table = ""
    for (let i = 0; i < JOLTY_ENG_UPS.length; i++) {
        table += `
        <button onclick="buyJoltyUpgrade(${i})" id="joltyUpg${i}" class="font" style="width: 210px; height: 120px; color: #ffee00; font-size: 14px; border: 3px solid #ffee00; background-color: #6e6d20;">
            ${JOLTY_ENG_UPS[i].desc}<span id="joltyUpgDesc${i}"></span><br>
            <span id="joltyUpgEff${i}" style="font-size: 12px;">${JOLTY_ENG_UPS[i].effString}</span><br>
            <span id="joltyUpgCost${i}"></span>
        </button>
        `
    }
    el("joltyUpgs").innerHTML = table
}

function updateJolteon_Game() {
    tmp.jolteon.totalEnergyUsage = D(0)
    tmp.jolteon.totalEnergyUsage = tmp.jolteon.totalEnergyUsage.add(tmp.leafeon.totalEnergyUsage)

    let i
    i = D(1000)
    i = i.mul(tmp.leafeon.absEngEff)
    i = i.mul(tmp.leafeon.elementEffs[2])
    if (getLeafMilestone(2, 0)) { i = i.mul(getLeafMileEff(2, 0)) }
    if (getLeafMilestone(2, 2)) { i = i.mul(getLeafMileEff(2, 2)) }
    tmp.jolteon.energyCap = i

    tmp.jolteon.genEff = Decimal.eq(player.jolteon.generators, 0) ? D(0) : Decimal.pow(2, player.jolteon.generators)
    i = tmp.jolteon.genEff.mul(player.tearonq.temperature).div(100)
    i = i.mul(tmp.leafeon.elementEffs[1])
    if (getLeafMilestone(1, 1)) { i = i.mul(getLeafMileEff(1, 1)) }
    tmp.jolteon.energyGen = i

    player.jolteon.energy = Decimal.add(player.jolteon.energy, tmp.jolteon.energyGen.mul(otherGameStuffIg.gameDelta))
    if (player.jolteon.energy.gte(tmp.jolteon.energyCap)) {
        player.jolteon.excessEnergy = Decimal.add(player.jolteon.excessEnergy, player.jolteon.energy.sub(tmp.jolteon.energyCap))
        player.jolteon.energy = tmp.jolteon.energyCap
    }
    player.jolteon.bestEnergy = Decimal.max(player.jolteon.bestEnergy, player.jolteon.energy)

    tmp.jolteon.genCost = calcJoltyGenCost(player.jolteon.generators, false)
    tmp.jolteon.energyOverflowEff = Decimal.max(player.jolteon.excessEnergy, 0).div(1000).add(1).root(4).mul(10).dilate(1.1).div(10)
}

function updateJolteon_HTML() {
    let table
    el("jolty").style.display = Decimal.gte(tmp.tearonq.level, 5) ? "flex" : "none";
    el("joltyGen").innerText = format(player.jolteon.generators)
    el("joltyEng").innerText = format(player.jolteon.energy, 2)
    el("joltyEngCap").innerText = format(tmp.jolteon.energyCap)
    el("joltyEngGain").innerText = tmp.jolteon.totalEnergyUsage.neq(0)
        ? `${format(tmp.jolteon.energyGen, 2)} - ${format(tmp.jolteon.totalEnergyUsage, 2)} = ${format(tmp.jolteon.energyGen.sub(tmp.jolteon.totalEnergyUsage), 2)}`
        : format(tmp.jolteon.energyGen, 2)
    el("joltyEngOv").innerText = format(player.jolteon.excessEnergy)
    el("joltyEngOvEff").innerText = format(tmp.jolteon.energyOverflowEff, 2)
    el("joltyGenPatCost").innerText = format(tmp.jolteon.genCost)
    for (let i = 0; i < JOLTY_ENG_UPS.length; i++) {
        el("joltyUpg" + i).style.display = JOLTY_ENG_UPS[i].show ? "" : "none";
        if (!JOLTY_ENG_UPS[i].show) {
            continue;
        }

        table = Decimal.gte(player.jolteon.upgrades[i], JOLTY_ENG_UPS[i].cap) ? "#ffee00" : Decimal.gte(player.jolteon.energy, JOLTY_ENG_UPS[i].cost) ? "#aa9900" : "#665500"
        el("joltyUpg" + i).style.border = "3px solid " + table

        table = ``
        if (!JOLTY_ENG_UPS[i].cap.eq(Infinity)) {
            table += ` (${format(player.jolteon.upgrades[i])}/${format(JOLTY_ENG_UPS[i].cap)})`
        }
        el("joltyUpgDesc" + i).innerText = table
        el(`joltUpg${i}Eff`).innerText = format(JOLTY_ENG_UPS[i].effBase, 1)
        if (i !== 0) {
            el(`joltUpg${i}TotalEff`).innerText = format(JOLTY_ENG_UPS[i].eff, 1)
        }

        // el("joltyUpgEff" + i).innerHTML = JOLTY_ENG_UPS[i].upgDesc
        el("joltyUpgCost" + i).innerText = `Cost: ${format(JOLTY_ENG_UPS[i].cost)} J of energy.`
    }
}

function calcJoltyGenCost(x, inv = false) {
    x = D(x)
    return inv
        ? smoothPoly(x.div(100).log2(), D(3), D(25), true)
        : smoothPoly(x, D(3), D(25), false).pow_base(2).mul(100)
}

function buyGenerator() {
    if (Decimal.gte(player.tearonq.pats, tmp.jolteon.genCost)) {
        player.tearonq.pats = Decimal.sub(player.tearonq.pats, tmp.jolteon.genCost)
        player.jolteon.generators = Decimal.add(player.jolteon.generators, 1)
    }
}

function buyJoltyUpgrade(id) {
    if (Decimal.gte(player.jolteon.energy, JOLTY_ENG_UPS[id].cost) && Decimal.lt(player.jolteon.upgrades[id], JOLTY_ENG_UPS[id].cap)) {
        player.jolteon.energy = Decimal.sub(player.jolteon.energy, JOLTY_ENG_UPS[id].cost)
        player.jolteon.upgrades[id] = Decimal.add(player.jolteon.upgrades[id], 1)
    }
}