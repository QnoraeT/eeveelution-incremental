"use strict";

const VAPPY_CHALLENGE = [
    {

    }
]

// Rate: +<span id="vappyWaterGen"></span>g of H<sub>2</sub>0/s, -<span id="vappyWaterHydrogenCost"></span>g of Hydrogen/s, -<span id="vappyWaterOxygenCost"></span>g of Oxygen/s, -<span id="vappyWaterEnergyCost"></span>J/s

function setupVaporeonHTML() {

}
// 286 kJ/mol
// kg of water = 55.56 mol
// 15.89 MJ/kg
// 100g (0.1kg)
function updateVaporeon_Game() {
    tmp.vaporeonSpd = D(100)

    tmp.vaporeonWaterGen = D(1)
    tmp.vaporeonWaterGen = tmp.vaporeonWaterGen.mul(tmp.vaporeonSpd)

    tmp.vaporeonHydrogenUsage = D(2)
    tmp.vaporeonHydrogenUsage = tmp.vaporeonHydrogenUsage.mul(tmp.vaporeonSpd)

    tmp.vaporeonOxygenUsage = D(1)
    tmp.vaporeonOxygenUsage = tmp.vaporeonOxygenUsage.mul(tmp.vaporeonSpd)

    tmp.vaporeonEnergyUsage = D(15890)
    tmp.vaporeonEnergyUsage = tmp.vaporeonEnergyUsage.mul(tmp.vaporeonSpd)
}

function updateVaporeon_HTML() {
    el("vaporeon").style.display = Decimal.gte(tmp.tearonqLevel, 40) ? "flex" : "none";

    if (Decimal.gte(tmp.tearonqLevel, 40)) {
        el("vappyWaterAmt").innerText = format(player.vap)
        el("vappyFlowAmt").innerText
        el("vappyFlowGen").innerText
        

        el("vappyWaterGen").innerText = format(tmp.vaporeonWaterGen)
        el("vappyWaterHydrogenCost").innerText = format(tmp.vaporeonHydrogenUsage)
        el("vappyWaterOxygenCost").innerText = format(tmp.vaporeonOxygenUsage)
        el("vappyWaterEnergyCost").innerText = format(tmp.vaporeonEnergyUsage)
    }
}