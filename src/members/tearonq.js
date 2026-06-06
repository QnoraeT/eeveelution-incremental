"use strict";
const TEARONQ_FEATURE_REQ = [
    D(2),
    D(5),
    D(40),
    D(50),
    D(1e308)
]

function updateTearonQ_Game() {
    tmp.tearonq.MemberCost = smoothExp(D(1.05), smoothPoly(D(player.tearonq.members), D(1.2), D(200), false), false).mul(10).add(20)
    tmp.tearonq.MemberTarget = smoothPoly(smoothExp(D(1.05), Decimal.sub(player.tearonq.pats, 20).div(10), true), D(1.2), D(200), true)

    player.tearonq.friendship = Decimal.max(player.tearonq.totalPats, 0).add(1024).log2().log10().mul(10).dilate(2).mul(12)
    player.tearonq.highTemp = Decimal.max(player.tearonq.highTemp, player.tearonq.temperature)
    player.tearonq.temperature = Decimal.pow(0.99, otherGameStuffIg.gameDelta).mul(player.tearonq.temperature)
    tmp.tearonq.effectiveTemp = player.tearonq.temperature.add(37)

    tmp.tearonq.pps = D(1)

    let pow = D(1)
    if (Decimal.gte(player.leafeon.elements[1], LEAF_ELEMENTS[1].milestones[2].req)) { pow = pow.mul(LEAF_ELEMENTS[1].milestones[2].effect) }
    tmp.tearonq.pps = tmp.tearonq.pps.mul(Decimal.add(player.tearonq.members, 1).pow(pow))

    tmp.tearonq.pps = tmp.tearonq.pps.mul(tmp.jolteon.energyOverflowEff)
    if (Decimal.gte(player.jolteon.upgrades[0], 1)) { tmp.tearonq.pps = tmp.tearonq.pps.mul(JOLTY_ENG_UPS[0].eff) }
    if (Decimal.gte(player.jolteon.upgrades[1], 1)) { tmp.tearonq.pps = tmp.tearonq.pps.mul(JOLTY_ENG_UPS[1].eff) }
    tmp.tearonq.pps = tmp.tearonq.pps.mul(tmp.leafeon.elementEffs[0])
    if (Decimal.gte(player.leafeon.elements[0], LEAF_ELEMENTS[0].milestones[2].req)) { tmp.tearonq.pps = tmp.tearonq.pps.mul(LEAF_ELEMENTS[0].milestones[2].effect) }
    if (Decimal.gte(player.leafeon.elements[0], LEAF_ELEMENTS[0].milestones[3].req)) { tmp.tearonq.pps = tmp.tearonq.pps.mul(LEAF_ELEMENTS[0].milestones[3].effect) }
    if (Decimal.gte(player.leafeon.elements[4], LEAF_ELEMENTS[4].milestones[1].req)) { tmp.tearonq.pps = tmp.tearonq.pps.mul(LEAF_ELEMENTS[4].milestones[1].effect) }

    tmp.tearonq.levelBase = D(19)
    tmp.tearonq.level = calcTearonqLevel(player.tearonq.totalPats, true).floor().max(player.tearonq.bestLv)
    tmp.tearonq.xp = Decimal.sub(player.tearonq.totalPats, calcTearonqLevel(tmp.tearonq.level)).floor().max(0)
    tmp.tearonq.nextXP = calcTearonqLevel(tmp.tearonq.level.add(1)).sub(calcTearonqLevel(tmp.tearonq.level)).ceil()
    player.tearonq.bestLv = Decimal.max(player.tearonq.bestLv, tmp.tearonq.level)

    if (Decimal.lte(tmp.tearonq.level, TEARONQ_FEATURE_REQ[TEARONQ_FEATURE_REQ.length-1])) {
        for (let i in TEARONQ_FEATURE_REQ) {
            if (Decimal.lt(tmp.tearonq.level, TEARONQ_FEATURE_REQ[i]) ) {
                el("tearonqLvNext").innerText = format(TEARONQ_FEATURE_REQ[i])
                break;
            }
        }
    }
}

function updateTearonQ_HTML() {
    el("tearonqPat").innerText = format(player.tearonq.pats)
    el("tearonqLv").innerText = format(tmp.tearonq.level)
    el("tearonqXPr").innerText = format(tmp.tearonq.xp)
    el("tearonqMaxXP").innerText = format(tmp.tearonq.nextXP)
    el("tearonqTemp").innerText = format(tmp.tearonq.effectiveTemp, 1)
    el("tearonqFren").innerText = format(player.tearonq.friendship)
    el("tearonqPatAmt").innerHTML = "<b style='font-size: 20px;'>" + format(tmp.tearonq.pps) + "</b>" + (tmp.tearonq.pps.eq(1) ? " time" : " times")
    el("tearonqMem").innerHTML = "<b style='font-size: 20px;'>" + format(player.tearonq.members) + "</b>" + (Decimal.eq(player.tearonq.members, 1) ? " member" : " members")
    el("tearonqMemPatCost").innerText = format(tmp.tearonq.MemberCost)
    el("getTearonqMember").style.display = Decimal.gte(tmp.tearonq.level, 2) ? "" : "none";
    el("tearonqMemAll").style.display = Decimal.gte(tmp.tearonq.level, 2) ? "" : "none";
    el("tearonqTempAll").style.display = Decimal.gte(tmp.tearonq.level, 5) ? "" : "none";
    el("tearonqFrenAll").style.display = Decimal.gte(tmp.tearonq.level, 999) ? "" : "none";
}

function calcTearonqLevel(x, inv = false) {
    x = D(x)
    return inv
        ? smoothPoly(smoothExp(D(1.01), x.add(1).div(tmp.tearonq.levelBase).add(1).log2(), true), D(2), D(1000), true).add(1)
        : smoothExp(D(1.01), smoothPoly(x.sub(1), D(2), D(1000), false), false).pow_base(2).sub(1).mul(tmp.tearonq.levelBase).sub(1)
}

function petTearonq() {
    player.tearonq.pats = Decimal.add(player.tearonq.pats, tmp.tearonq.pps)
    player.tearonq.totalPats = Decimal.add(player.tearonq.totalPats, tmp.tearonq.pps)
    let tempGain = tmp.tearonq.pps
    if (Decimal.gte(player.leafeon.elements[1], LEAF_ELEMENTS[1].milestones[3].req)) { tempGain = tempGain.mul(LEAF_ELEMENTS[1].milestones[3].effect) }
    if (Decimal.gte(player.leafeon.elements[4], LEAF_ELEMENTS[4].milestones[0].req)) { tempGain = tempGain.mul(LEAF_ELEMENTS[4].milestones[0].effect) }
    if (Decimal.gte(player.leafeon.elements[4], LEAF_ELEMENTS[4].milestones[1].req)) { tempGain = tempGain.mul(LEAF_ELEMENTS[4].milestones[1].effect) }
    player.tearonq.temperature = Decimal.max(player.tearonq.temperature, 0).add(1).mul(4).root(3).dilate(1.25).pow10().add(tempGain).log10().dilate(0.8).pow(3).div(4).sub(1)
}

function getTearonqMember() {
    if (Decimal.gte(player.tearonq.pats, tmp.tearonq.MemberCost)) {
        player.tearonq.pats = Decimal.sub(player.tearonq.pats, tmp.tearonq.MemberCost)
        player.tearonq.members = Decimal.add(player.tearonq.members, 1)
    }
}