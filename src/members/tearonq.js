"use strict";
const TEARONQ_FEATURE_REQ = [
    D(2),
    D(5),
    D(1e308)
]

function updateTearonq() {
    tmp.tearonqMemberCost = smoothExp(D(1.05), smoothPoly(D(player.tearonq.members), D(1.2), D(200), false), false).mul(10).add(20)
    tmp.tearonqMemberTarget = smoothPoly(smoothExp(D(1.05), Decimal.sub(player.tearonq.pats, 20).div(10), true), D(1.2), D(200), true)

    player.tearonq.friendship = Decimal.max(player.tearonq.totalPats, 0).add(1024).log2().log10().mul(10).dilate(2).mul(12)
    player.tearonq.temperature = Decimal.pow(0.99, otherGameStuffIg.gameDelta).mul(player.tearonq.temperature)
    tmp.tearonqEffectiveTemp = player.tearonq.temperature.add(37)

    tmp.tearonqPPS = D(1)
    tmp.tearonqPPS = tmp.tearonqPPS.mul(Decimal.add(player.tearonq.members, 1))
    tmp.tearonqPPS = tmp.tearonqPPS.mul(tmp.energyOverflowEff)
    if (Decimal.gte(player.janko.upgrades[0], 1)) { tmp.tearonqPPS = tmp.tearonqPPS.mul(JANKO_ENG_UPS[0].eff) }
    if (Decimal.gte(player.janko.upgrades[1], 1)) { tmp.tearonqPPS = tmp.tearonqPPS.mul(JANKO_ENG_UPS[1].eff) }
    tmp.tearonqPPS = tmp.tearonqPPS.mul(ART_ELEMENTS[0].eff)

    tmp.tearonqLevelBase = D(19)
    tmp.tearonqLevel = calcTearonqLevel(player.tearonq.totalPats, true).floor().max(player.tearonq.bestLv)
    tmp.tearonqXP = Decimal.sub(player.tearonq.totalPats, calcTearonqLevel(tmp.tearonqLevel)).floor().max(0)
    tmp.tearonqNextXP = calcTearonqLevel(tmp.tearonqLevel.add(1)).sub(calcTearonqLevel(tmp.tearonqLevel)).ceil()
    player.tearonq.bestLv = Decimal.max(player.tearonq.bestLv, tmp.tearonqLevel)

    if (Decimal.lte(tmp.tearonqLevel, TEARONQ_FEATURE_REQ[TEARONQ_FEATURE_REQ.length-1])) {
        for (let i in TEARONQ_FEATURE_REQ) {
            if (Decimal.lt(tmp.tearonqLevel, TEARONQ_FEATURE_REQ[i]) ) {
                el("tearonqLvNext").innerText = format(TEARONQ_FEATURE_REQ[i])
                break;
            }
        }
    }

    el("tearonqPat").innerText = format(player.tearonq.pats)
    el("tearonqLv").innerText = format(tmp.tearonqLevel)
    el("tearonqXPr").innerText = format(tmp.tearonqXP)
    el("tearonqMaxXP").innerText = format(tmp.tearonqNextXP)
    el("tearonqTemp").innerText = format(tmp.tearonqEffectiveTemp, 1)
    el("tearonqFren").innerText = format(player.tearonq.friendship)
    el("tearonqPatAmt").innerHTML = "<b style='font-size: 20px;'>" + format(tmp.tearonqPPS) + "</b>" + (tmp.tearonqPPS.eq(1) ? " time" : " times")
    el("tearonqMem").innerHTML = "<b style='font-size: 20px;'>" + format(player.tearonq.members) + "</b>" + (Decimal.eq(player.tearonq.members, 1) ? " member" : " members")
    el("tearonqMemPatCost").innerText = format(tmp.tearonqMemberCost)
    el("getTearonqMember").style.display = Decimal.gte(tmp.tearonqLevel, 2) ? "" : "none";
    el("tearonqMemAll").style.display = Decimal.gte(tmp.tearonqLevel, 2) ? "" : "none";
    el("tearonqTempAll").style.display = Decimal.gte(tmp.tearonqLevel, 5) ? "" : "none";
    el("tearonqFrenAll").style.display = Decimal.gte(tmp.tearonqLevel, 999) ? "" : "none";
    el("uPetTQ").innerText = pronouns(player.tearonq.gender)[1]
    el("uTempTQ").innerText = pronouns(player.tearonq.gender)[0] === "they" ? `${capitalizeFirstLetter(pronouns(player.tearonq.gender)[0])} are` : `${capitalizeFirstLetter(pronouns(player.tearonq.gender)[0])} is`
    el("uFrenTQ").innerText = pronouns(player.tearonq.gender)[0] === "they" ? `${capitalizeFirstLetter(pronouns(player.tearonq.gender)[0])} have` : `${capitalizeFirstLetter(pronouns(player.tearonq.gender)[0])} has`
}

function calcTearonqLevel(x, inv = false) {
    x = D(x)
    return inv
        ? smoothPoly(smoothExp(D(1.01), x.add(1).div(tmp.tearonqLevelBase).add(1).log2(), true), D(2), D(1000), true).add(1)
        : smoothExp(D(1.01), smoothPoly(x.sub(1), D(2), D(1000), false), false).pow_base(2).sub(1).mul(tmp.tearonqLevelBase).sub(1)
}

function petTearonq() {
    player.tearonq.pats = Decimal.add(player.tearonq.pats, tmp.tearonqPPS)
    player.tearonq.totalPats = Decimal.add(player.tearonq.totalPats, tmp.tearonqPPS)
    player.tearonq.temperature = Decimal.max(player.tearonq.temperature, 0).add(1).mul(4).root(3).dilate(1.25).pow10().add(tmp.tearonqPPS).log10().dilate(0.8).pow(3).div(4).sub(1)
}

function getTearonqMember() {
    if (Decimal.gte(player.tearonq.pats, tmp.tearonqMemberCost)) {
        player.tearonq.pats = Decimal.sub(player.tearonq.pats, tmp.tearonqMemberCost)
        player.tearonq.members = Decimal.add(player.tearonq.members, 1)
    }
}