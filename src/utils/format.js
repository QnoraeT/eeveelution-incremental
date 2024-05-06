"use strict";

const abbSuffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc",
                    "UDc", "DDc", "TDc", "QaDc", "QiDc", "SxDc", "SpDc", "OcDc", "NoDc", "Vg"];


const timeList = [
    { name: "pt",  stop: true,  amt: 5.39e-44    },
    { name: "qs",  stop: true,  amt: 1 / 1e30    },
    { name: "rs",  stop: true,  amt: 1 / 1e27    },
    { name: "ys",  stop: true,  amt: 1 / 1e24    },
    { name: "zs",  stop: true,  amt: 1 / 1e21    },
    { name: "as",  stop: true,  amt: 1 / 1e18    },
    { name: "fs",  stop: true,  amt: 1 / 1e15    },
    { name: "ps",  stop: true,  amt: 1 / 1e12    },
    { name: "ns",  stop: true,  amt: 1 / 1e9     },
    { name: "µs",  stop: true,  amt: 1 / 1e6     },
    { name: "ms",  stop: true,  amt: 1 / 1e3     },
    { name: "s",   stop: true,  amt: 1           },
    { name: "m",   stop: false, amt: 60          },
    { name: "h",   stop: false, amt: 3600        },
    { name: "d",   stop: false, amt: 86400       },
    { name: "mo",  stop: false, amt: 2592000     },
    { name: "y",   stop: false, amt: 3.1536e7    },
    { name: "mil", stop: false, amt: 3.1536e10   },
    { name: "uni", stop: false, amt: 4.320432e17 },
];

const abbExp = 1e66;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function format(number, dec = 0, expdec = 3) {
    let n = new Decimal(number);
    if (n.lt(0)) return "-" + format(n.negate(), dec, expdec);
    if (n.eq(0)) return (0).toFixed(dec);
    if (Number.isNaN(n.mag)) return "NaN";
    if (!Number.isFinite(n.mag)) return "Infinity";
    if (n.lt(0.001)) {
        return "1 / " + format(n.recip(), dec, expdec);
    } else if (n.lt(1e6)) {
        return numberWithCommas(n.toNumber().toFixed(dec));
    } else if (n.lt(abbExp)) {
        let abb = n.log10().mul(0.33333333336666665).floor();
        return n.div(abb.mul(3).pow10()).toNumber().toFixed(expdec) + " " + abbSuffixes[abb];
    } else if (n.lt("e1e6")) {
        let exp = n.log10().mul(1.0000000001).floor();
        return n.div(exp.pow10()).toNumber().toFixed(expdec) + "e" + format(exp, 0, expdec);
    } else if (n.lt("10^^7")) {
        return "e" + format(n.log10(), dec, expdec);
    } else {
        return "F" + format(n.slog(10), dec, expdec);
    }
}

function formatPerc(number, dec = 3, expdec = 3) {
    let n = new Decimal(number);
    if (n.gte(1000)) {
        return format(n, dec, expdec) + "x";
    } else {
        return format(Decimal.sub(100, Decimal.div(100, n)), dec, expdec) + "%";
    }
}

function formatTime(number, dec = 0, expdec = 3, limit = 2) {
    let n = new Decimal(number);
    if (n.lt(0)) return "-" + formatTime(n.negate(), dec, expdec);
    if (n.eq(0)) return (0).toFixed(dec);
    if (Number.isNaN(n.mag)) return "I don't know?";
    if (!Number.isFinite(n.mag)) return "Forever";
    let lim = 0;
    let str = "";
    let end = false;
    for (let i = timeList.length - 1; i >= 0; i--) {
        if (lim >= limit) {
            break;
        }
        if (n.gte(timeList[i].amt)) {
            end = lim + 1 >= limit || timeList[i].stop;
            str = str + " " + format(n.div(timeList[i].amt).sub(end ? 0 : 0.5), end ? dec : 0, expdec) + " " + timeList[i].name;
            n = n.sub(n.div(timeList[i].amt).floor().mul(timeList[i].amt));
            lim++;
            if (timeList[i].stop) {
                break;
            }
        } else {
            if (i === 0) {
                return (str + " " + format(n, dec, expdec) + " s").slice(1);
            }
        }
    }
    return str.slice(1);
}
