"use strict";
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function inverseFact(x) {
    if (Decimal.gte(x, "eee18")) {
        return Decimal.log10(x);
    }
    if (Decimal.gte(x, "eee4")) {
        return Decimal.log10(x).div(Decimal.log10(x).log10());
    }
    return Decimal.div(x, 2.5066282746310002).ln().div(Math.E).lambertw().add(1).exp().sub(0.5);
};

function D(x) { return new Decimal(x) }

function lerp(t, s, e, type, p) {
    if (isNaN(t)) {
        throw new Error(`malformed input [LERP]: ${t}, expecting f64`)
    }
    t = clamp(t, 0, 1);
    if (t === 0) {
        return s;
    }
    if (t === 1) {
        return e;
    }
    switch (type) {
        case "QuadIn":
            t = t * t;
            break;
        case "QuadOut":
            t = 1.0 - ((1.0 - t) * (1.0 - t));
            break;
        case "CubeIn":
            t = t * t * t;
            break;
        case "CubeOut":
            t = 1.0 - ((1.0 - t) * (1.0 - t) * (1.0 - t));
            break;
        case "Smooth":
            t = 6 * (t ** 5) - 15 * (t ** 4) + 10 * (t ** 3);
            break;
        case "ExpSCurve":
            t = (Math.tanh(p * Math.tan((t + 1.5 - ((t - 0.5) / 1e9)) * Math.PI)) + 1) / 2;
            break;
        case "Sine":
            t = Math.sin(t * Math.PI / 2) ** 2;
            break;
        case "Expo":
            if (p > 0) {
                t = Math.coth(p / 2) * Math.tanh(p * t / 2);
            } else if (p < 0) {
                t = 1.0 - Math.coth(p / 2) * Math.tanh(p * (1.0 - t) / 2);
            }
            break;
        default:
            break;
    }
    return (s * (1 - t)) + (e * t);
}

function clamp(num, min, max) { // why isn't this built in
    return Math.min(Math.max(num, min), max);
}

const abbSuffixes = ["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","OcDc","NoDc","Vg"];
const letter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const timeList = [
    { name: "pt",  stop: true,  amt: 5.39e-44 },
    { name: "qs",  stop: true,  amt: 1 / 1e30 },
    { name: "rs",  stop: true,  amt: 1 / 1e27 },
    { name: "ys",  stop: true,  amt: 1 / 1e24 },
    { name: "zs",  stop: true,  amt: 1 / 1e21 },
    { name: "as",  stop: true,  amt: 1 / 1e18 },
    { name: "fs",  stop: true,  amt: 1 / 1e15 },
    { name: "ps",  stop: true,  amt: 1 / 1e12 },
    { name: "ns",  stop: true,  amt: 1 / 1e9 },
    { name: "µs",  stop: true,  amt: 1 / 1e6 },
    { name: "ms",  stop: true,  amt: 1 / 1e3 },
    { name: "s",   stop: true,  amt: 1 },
    { name: "m",   stop: false, amt: 60 },
    { name: "h",   stop: false, amt: 3600 },
    { name: "d",   stop: false, amt: 86400 },
    { name: "mo",  stop: false, amt: 2592000 },
    { name: "y",   stop: false, amt: 3.1536e7 },
    { name: "mil", stop: false, amt: 3.1536e10 },
    { name: "uni", stop: false, amt: 4.320432e17 }
];

const abbExp = D(1e66);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function formatLetter(remainingLogNumber, string = ``) {
    if (Decimal.gte(remainingLogNumber, 1e12)) {
        console.error(
            `formatLetter is taking in numbers greater than ee12! This *will* freeze the game!`
        );
        return ``;
    }
    if (Decimal.lt(remainingLogNumber, letter.length)) {
        return `${letter[new Decimal(remainingLogNumber).toNumber()]}${string}`;
    }
    return formatLetter(
        Decimal.div(remainingLogNumber, letter.length).sub(1).floor(),
        `${letter[new Decimal(remainingLogNumber).mod(letter.length).toNumber()]}${string}`
    );
}

function format(number, dec = 0, expdec = 3, notation = 0) {
    if (Decimal.lt(number, 0)) return `-${format(Decimal.negate(number), dec, expdec)}`;
    if (Decimal.eq(number, 0)) return (0).toFixed(dec);
    if (Decimal.isNaN(number)) return "NaN";
    if (!Decimal.isFinite(number)) return "Infinity";
    try {
        switch (notation) {
            case 0: // mixed
                if (Decimal.gte(number, 1e8) && Decimal.lt(number, abbExp)) {
                    const abb = Decimal.log10(number).mul(0.33333333336666665).floor();
                    return `${Decimal.div(number, abb.mul(3).pow10()).toNumber().toFixed(expdec)} ${abbSuffixes[abb.toNumber()]}`;
                }
                return format(number, dec, expdec, 1);
            case 1: // sci
                if (Decimal.lt(number, "e-1e8")) {
                    return `e${format(Decimal.log10(number), 0, expdec)}`;
                } else if (Decimal.lt(number, 0.001)) {
                    const exp = Decimal.log10(number).mul(1.00000000001).floor();
                    return `${Decimal.div(number, exp.pow10()).toNumber().toFixed(expdec)}e${format(exp, 0, expdec)}`;
                } else if (Decimal.lt(number, 1e8)) {
                    return numberWithCommas(new Decimal(number).toNumber().toFixed(dec));
                } else if (Decimal.lt(number, 'ee8')) {
                    const exp = Decimal.log10(number).mul(1.00000000001).floor();
                    return `${Decimal.div(number, exp.pow10()).toNumber().toFixed(expdec)}e${format(exp, 0, expdec)}`;
                } else if (Decimal.lt(number, "10^^7")) {
                    return `e${format(Decimal.log10(number), dec, expdec)}`;
                } else {
                    return `F${format(Decimal.slog(number), Math.max(dec, 3), expdec)}`;
                }
            case 2: // letters
                if (Decimal.gte(number, 1e3) && Decimal.lt(number, 'ee8')) {
                    const abb = Decimal.log10(number).mul(0.33333333336666665).floor();
                    return `${Decimal.div(number, abb.mul(3).pow10()).toNumber().toFixed(expdec)} ${formatLetter(abb.sub(1), "")}`;
                }
                return format(number, dec, expdec, 1);
            case 3:
                if (Decimal.gte(number, "10^^7")) {
                    return `IM^${format(Decimal.slog(number).sub(2.0221273333), Math.max(dec, 3), expdec, 0)}`;
                }
                if (Decimal.gte(number, Number.MAX_VALUE)) {
                    if (Decimal.lt(number, "2.8e95173")) {
                        return `${format(Decimal.log10(number).div(308).sub(0.75).pow10(), expdec, expdec, 0)} ᴵᴾ`;
                    } else if (Decimal.lt(number, "e542945439")) {
                        return `${format(Decimal.log10(number).div(308).sub(0.75).div(308).sub(0.7).pow_base(5), expdec, expdec, 0)} ᴱᴾ`;
                    } else if (Decimal.lt(number, "e181502546658")) {
                        return `${format(Decimal.log10(number).div(308).sub(0.75).div(308).sub(0.7).mul(0.6989700043360187).div(4000).sub(1).pow_base(1000), expdec, expdec, 0)} ᴿᴹ`;
                    } else {
                        const rm = Decimal.log10(number).div(308).sub(0.75).div(308).sub(0.7).mul(0.6989700043360187).div(4000).sub(1).mul(3);
                        return `${format(rm.sub(1000).pow(2).mul(rm.sub(100000).max(1).pow(0.2)), expdec, expdec, Decimal.lt(number, "ee148.37336") ? 0 : 3)} ᴵᴹ`;
                    }
                }
                return format(number, dec, expdec, 1);
            case 4:
                return `Rank ${format(Decimal.max(number, 10).div(10).log(2).sqrt().add(1), dec, expdec, 1)}`;
            default:
                throw new Error(`${player.value.settings.notation} is not a valid notation index!`);
        }
    } catch(e) {
        console.warn(
            `There was an error trying to get player.settings.notation! Falling back to Mixed Scientific...\n\nIf you have an object that has an item that uses format() without it being a get or function, this will occurr on load!`
        );
        console.warn(e);
        if (Decimal.lt(number, "e-1e8")) {
            return `e${format(Decimal.log10(number), 0, expdec)}`;
        } else if (Decimal.lt(number, 0.001)) {
            const exp = Decimal.log10(number).mul(1.00000000001).floor();
            return `${Decimal.div(number, exp.pow10()).toNumber().toFixed(expdec)}e${format(exp, 0, expdec)}`;
        } else if (Decimal.lt(number, 1e8)) {
            return numberWithCommas(new Decimal(number).toNumber().toFixed(dec));
        } else if (Decimal.lt(number, abbExp)) {
            const abb = Decimal.log10(number).mul(0.33333333336666665).floor();
            return `${Decimal.div(number, abb.mul(3).pow10()).toNumber().toFixed(expdec)} ${abbSuffixes[abb.toNumber()]}`;
        } else if (Decimal.lt(number, 'ee8')) {
            const exp = Decimal.log10(number).mul(1.00000000001).floor();
            return `${Decimal.div(number, exp.pow10()).toNumber().toFixed(expdec)}e${format(exp, 0, expdec)}`;
        } else if (Decimal.lt(number, "10^^7")) {
            return `e${format(Decimal.log10(number), dec, expdec)}`;
        } else {
            return `F${format(Decimal.slog(number), Math.max(dec, 3), expdec)}`;
        }
    }
};

function formatPerc(number, dec = 3, expdec = 3) {
    if (Decimal.gte(number, 1000)) {
        return `${format(number, dec, expdec)}x`;
    } else {
        return `${format(Decimal.sub(100, Decimal.div(100, number)), dec, expdec)}%`;
    }
};

function formatTime(number, dec = 0, expdec = 3, limit = 2) {
    if (Decimal.lt(number, 0)) return `-${formatTime(Decimal.negate(number), dec, expdec)}`;
    if (Decimal.eq(number, 0)) return `${(0).toFixed(dec)}s`;
    if (Decimal.isNaN(number)) return "NaN";
    if (!Decimal.isFinite(number)) return "Never";
    let lim = 0;
    let str = "";
    let end = false;
    let prevNumber;
    for (let i = timeList.length - 1; i >= 0; i--) {
        if (lim >= limit) {
            break;
        }
        if (Decimal.gte(number, timeList[i].amt)) {
            end = lim + 1 >= limit || timeList[i].stop;
            prevNumber = Decimal.div(number, timeList[i].amt);
            str = `${str} ${format(prevNumber.sub(end ? 0 : 0.5), end ? dec : 0, expdec)}${timeList[i].name}`;
            number = Decimal.sub(number, prevNumber.floor().mul(timeList[i].amt));
            lim++;
            if (timeList[i].stop || prevNumber.gte(1e8)) {
                break;
            }
        } else {
            if (i === 0) {
                return `${str} ${format(number, dec, expdec)}s`.slice(1);
            }
        }
    }
    return str.slice(1);
};

function checkNaN(x, err) {
    if (Decimal.isNaN(x)) {
        throw new Error(`Error: ${err}`)
    }
}

function cheatDilateBoost(x, inv) {
    checkNaN(x, `cheatDilateBoost detected a NaN outside of itself!`)
    if (!player.cheats.dilate) {
        return x
    }
    let result = Decimal.add(x, 1)
    for (let i = 0; i < player.cheats.dilateStage; i++) {
        result = result.log10().add(1)
    }
    result = inv
        ? result.root(player.cheats.dilateValue)
        : result.pow(player.cheats.dilateValue)
    for (let i = 0; i < player.cheats.dilateStage; i++) {
        result = result.sub(1).pow10()
    }
    result = result.sub(1)
    checkNaN(x, `cheatDilateBoost detected a NaN inside of itself!`)
    return result
}

function colorChange(color, val, sat) {
    // #ABCDEF format only
    if (color[0] === "#") {
        color = color.slice(1);
    }
    const colorInt = parseInt(color, 16);
    let r = ((colorInt >> 16) % 256) / 256;
    let g = ((colorInt >> 8) % 256) / 256;
    let b = (colorInt % 256) / 256;
    r = 1 - (1 - r) * sat;
    g = 1 - (1 - g) * sat;
    b = 1 - (1 - b) * sat;
    r = Math.min(255, r * val * 256);
    g = Math.min(255, g * val * 256);
    b = Math.min(255, b * val * 256);
    return (
        "#" +
        Math.floor(r).toString(16).padStart(2, "0") +
        Math.floor(g).toString(16).padStart(2, "0") +
        Math.floor(b).toString(16).padStart(2, "0")
    );
};

function mixColor(color, nextColor, type, time) {
    if (color[0] === "#") {
        color = color.slice(1);
    }
    const colorInt = parseInt(color, 16);
    if (nextColor[0] === "#") {
        nextColor = nextColor.slice(1);
    }
    const nextColorInt = parseInt(nextColor, 16);
    let r = ((colorInt >> 16) % 256) / 256;
    let g = ((colorInt >> 8) % 256) / 256;
    let b = (colorInt % 256) / 256;
    const lr = ((nextColorInt >> 16) % 256) / 256;
    const lg = ((nextColorInt >> 8) % 256) / 256;
    const lb = (nextColorInt % 256) / 256;
    r = lerp(time, r, lr, type) * 256;
    g = lerp(time, g, lg, type) * 256;
    b = lerp(time, b, lb, type) * 256;
    return (
        "#" +
        Math.floor(r).toString(16).padStart(2, "0") +
        Math.floor(g).toString(16).padStart(2, "0") +
        Math.floor(b).toString(16).padStart(2, "0")
    );
};

function gRC(time, val, sat) {
    const s = Math.floor(time) % 6;
    const t = time % 1;
    let r = 0;
    let g = 0;
    let b = 0;
    switch (s) {
        case 0:
            r = 1;
            g = t;
            break;
        case 1:
            r = 1 - t;
            g = 1;
            break;
        case 2:
            g = 1;
            b = t;
            break;
        case 3:
            g = 1 - t;
            b = 1;
            break;
        case 4:
            b = 1;
            r = t;
            break;
        case 5:
            b = 1 - t;
            r = 1;
            break;
        default:
            throw new Error("Wtf!! Why is there an invalid number?  [" + s + "]");
    }
    r = 1 - (1 - r) * sat;
    g = 1 - (1 - g) * sat;
    b = 1 - (1 - b) * sat;
    r = r * val * 255;
    g = g * val * 255;
    b = b * val * 255;
    return (
        "#" +
        Math.round(r).toString(16).padStart(2, "0") +
        Math.round(g).toString(16).padStart(2, "0") +
        Math.round(b).toString(16).padStart(2, "0")
    );
};