const FABI_FEATURE_REQ = [
    D(2),
    D(1e308)
]

function updateFABI() {
    tmp.fabiMemberCost = expPoly(player.fabi.members, D(1), D(2.5), D(25), false).mul(10).add(20)
    tmp.fabiMemberTarget = expPoly(Decimal.sub(player.fabi.members, 20).div(10), D(1), D(2.5), D(25), true)

    tmp.fabiPPS = D(1)
    tmp.fabiPPS = tmp.fabiPPS.mul(Decimal.add(player.fabi.members, 1))

    tmp.fabiLevelBase = D(20)
    tmp.fabiLevel = calcFABILevel(player.fabi.pats, true).floor().max(player.fabi.bestLv)
    tmp.fabiXP = Decimal.sub(player.fabi.pats, calcFABILevel(tmp.fabiLevel)).floor()
    tmp.fabiNextXP = calcFABILevel(tmp.fabiLevel.add(1)).sub(calcFABILevel(tmp.fabiLevel)).ceil()
    player.fabi.bestLv = Decimal.max(player.fabi.bestLv, tmp.fabiLevel)

    if (Decimal.lte(tmp.fabiLevel, FABI_FEATURE_REQ[FABI_FEATURE_REQ.length-1])) {
        for (i in FABI_FEATURE_REQ) {
            if (Decimal.lt(tmp.fabiLevel, FABI_FEATURE_REQ[i]) ) {
                el("fabiLvNext").innerText = format(FABI_FEATURE_REQ[i])
                break;
            }
        }
    }

    el("fabiPat").innerText = format(player.fabi.pats)
    el("fabiLv").innerText = format(tmp.fabiLevel)
    el("fabiXPr").innerText = format(tmp.fabiXP)
    el("fabiMaxXP").innerText = format(tmp.fabiNextXP)
    el("fabiPatAmt").innerHTML = "<b style='font-size: 2.5vw;'>" + format(tmp.fabiPPS) + "</b>" + (tmp.fabiPPS.eq(1) ? " time" : " times")
    el("fabiMem").innerHTML = "<b style='font-size: 2.5vw;'>" + format(player.fabi.members) + "</b>" + (Decimal.eq(player.fabi.members, 1) ? " member" : " members")
    el("fabiMemPatCost").innerText = format(tmp.fabiMemberCost)
    el("getFabiMember").style.display = Decimal.gte(tmp.fabiLevel, 2) ? "" : "none";
    el("fabiMemAll").style.display = Decimal.gte(tmp.fabiLevel, 2) ? "" : "none";
}

function calcFABILevel(x, inv = false) {
    x = D(x)
    if (inv) {
        return expPoly(x.add(0.2).div(tmp.fabiLevelBase).add(1).log2().add(100.5).log(1.01).sub(463.316), 1, 2, 1000, true).add(1)
    } else {
        return expPoly(x.sub(1), 1, 2, 1000, false).add(463.316).pow_base(1.01).sub(100.5).pow_base(2).sub(1).mul(tmp.fabiLevelBase).sub(0.2)
    }
}

function petFABI() {
    player.fabi.pats = Decimal.add(player.fabi.pats, tmp.fabiPPS)
}

function getFABIMember() {
    if (Decimal.gte(player.fabi.pats, tmp.fabiMemberCost)) {
        player.fabi.pats = Decimal.sub(player.fabi.pats, tmp.fabiMemberCost)
        player.fabi.members = Decimal.add(player.fabi.members, 1)
    }
}