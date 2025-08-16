"use strict";

// ! DO NOT USE SCALE WHEN POWSCALE = 1 OR STR = 0, IT WILL BREAKKK
function scale(num, type, inverse = false, start, str, powScale) {
    if (Decimal.lte(num, start)) {
        return new Decimal(num);
    }
    str = Decimal.pow(powScale, str);
    let result;
    switch (type) {
        // Divide
        case -1:
        case -1.1:
        case "L":
        case "L1":
            result = inverse
                ? Decimal.pow(num, 2)
                        .add(Decimal.sub(str, 1).mul(start).mul(num).mul(4))
                        .sub(Decimal.sub(str, 1).mul(Decimal.pow(start, 2)).mul(4))
                        .add(Decimal.sub(str, 1).mul(start).mul(2))
                        .add(num)
                        .div(2)
                        .div(str)
                : Decimal.mul(str, num).add(
                        Decimal.mul(start, Decimal.sub(1, str)).mul(
                            Decimal.sub(2, Decimal.div(start, num))
                        )
                    );
            break;
        // Polynomial
        case 0:
        case 0.1:
        case "P":
        case "P1":
            result = inverse
                ? Decimal.sub(num, start).mul(str).div(start).add(1).root(str).mul(start)
                : Decimal.div(num, start).pow(str).sub(1).mul(start).div(str).add(start);
            break;
        case 0.2: // alemaninc
        case "P2":
            result = inverse
                ? Decimal.div(num, start).root(str).sub(1).mul(str).add(1).mul(start)
                : Decimal.div(num, start).sub(1).div(str).add(1).pow(str).mul(start);
            break;
        // Exponential
        case 1:
        case 1.1:
        case "E":
        case "E1":
            result = inverse
                ? Decimal.min(num, Decimal.div(num, start).log(str).add(1).mul(start))
                : Decimal.max(num, Decimal.pow(str, Decimal.div(num, start).sub(1)).mul(start));
            break;
        case 1.2:
        case "E2":
            result = inverse
                ? Decimal.mul(num, str).mul(str.ln()).div(start).lambertw().mul(start).div(str.ln())
                : Decimal.pow(str, Decimal.div(num, start).sub(1)).mul(num);
            break;
        case 1.3: // alemaninc
        case "E3":
            result = inverse // poly exponential scaling
                ? Decimal.div(num, start).ln().mul(str.sub(1)).add(1).root(str.sub(1)).mul(start)
                : Decimal.div(num, start).pow(str.sub(1)).sub(1).div(str.sub(1)).exp().mul(start);
            break;
        // Semi-exponential
        case 2:
        case 2.1:
        case "SE":
        case "SE1":
            result = inverse // steep scaling
                ? Decimal.pow(start, Decimal.sub(num, start).mul(str).add(start).log(start).root(str))
                : Decimal.pow(start, Decimal.log(num, start).pow(str)).sub(start).div(str).add(start);
            break;
        case 2.2:
        case "SE2": // very shallow scaling
            result = inverse
                ? Decimal.pow(start, Decimal.log(num, start).sub(1).mul(str).add(1).root(str))
                : Decimal.pow(start, Decimal.log(num, start).pow(str).sub(1).div(str).add(1));
            break;
        // convergent
        case 3: // alemaninc
        case 3.1:
        case "C":
        case "C1":
            result = inverse
                ? str.mul(num).add(Decimal.pow(start, 2)).sub(Decimal.mul(start, num).mul(2)).div(str.sub(num))
                : str.mul(num).sub(Decimal.pow(start, 2)).div(Decimal.sub(str, Decimal.mul(start, 2)).add(num));
            break;
        default:
            throw new Error(`Scaling type ${type} doesn't exist`);
    }
    NaNCheck(result);
    return result;
};

// dumb i thought it would look ok tho
Decimal.prototype.clone = function() {
    return this;
}

Decimal.prototype.dilate = function(power) {
    if (this.lt(1)) { this.clone() }
    return this.clone().log10().pow(power).pow10();
}

function D(x) { return new Decimal(x); }

function pad(num, length) {
    while (num.length < length) {
        num = "0" + num;
    }
    return num;
}

function colorChange(color, val, sat) { // #ABCDEF format only
    if (color[0] === "#") { color = color.slice(1); }
    color = parseInt(color, 16);
    let r = ((color >> 16) % 256) / 256;
    let g = ((color >> 8) % 256) / 256;
    let b = (color % 256) / 256;
    r = 1 - ((1 - r) * sat);
    g = 1 - ((1 - g) * sat);
    b = 1 - ((1 - b) * sat);
    r = Math.min(255, r * val * 256);
    g = Math.min(255, g * val * 256);
    b = Math.min(255, b * val * 256);
    return "#" + pad(Math.floor(r).toString(16), 2)
        + pad(Math.floor(g).toString(16), 2)
        + pad(Math.floor(b).toString(16), 2);
}

function mixColor(color, nextColor, type, time) {
    if (color[0] === "#") { color = color.slice(1); }
    color = parseInt(color, 16)
    if (nextColor[0] === "#") { nextColor = nextColor.slice(1); }
    nextColor = parseInt(nextColor, 16);
    let r = ((color >> 16) % 256) / 256;
    let g = ((color >> 8) % 256) / 256;
    let b = (color % 256) / 256;
    let lr = ((nextColor >> 16) % 256) / 256;
    let lg = ((nextColor >> 8) % 256) / 256;
    let lb = (nextColor % 256) / 256;
    r = lerp(time, r, lr, type) * 256;
    g = lerp(time, g, lg, type) * 256;
    b = lerp(time, b, lb, type) * 256;
    return "#" + pad(Math.floor(r).toString(16), 2)
        + pad(Math.floor(g).toString(16), 2)
        + pad(Math.floor(b).toString(16), 2);
}

function gRC(time, val, sat) {
    let r = 0;
    let g = 0;
    let b = 0;
    let t = time % 1;
    let s = Math.floor(time) % 6;
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
    r = 1 - ((1 - r) * sat);
    g = 1 - ((1 - g) * sat);
    b = 1 - ((1 - b) * sat);
    r = r * val * 255;
    g = g * val * 255;
    b = b * val * 255;
    return "#" + pad(Math.round(r).toString(16), 2)
        + pad(Math.round(g).toString(16), 2)
        + pad(Math.round(b).toString(16), 2);
}

function clamp(num, min, max) { // why isn't this built in
    return Math.min(Math.max(num, min), max);
}

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

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function intRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 
 * @param {Decimal} x the value before the quadratic polynomial
 * @param {Decimal} a ax^2
 * @param {Decimal} b + bx
 * @param {Decimal} c + c
 * @returns {Decimal}
 */
function inverseQuad(x, a, b, c) {
    return a.eq(0)
            ? x.sub(c).div(b)
            : x.sub(c).mul(a).mul(4).add(b.pow(2)).sqrt().sub(b).div(a.mul(2))
}

/**
 * uses newton's method to find the inverse (the one wolfram alpha gave me behaved poorly due to floating point errors above 1e10+)
 * @param {Decimal} x the value before the cubic polynomial
 * @param {Decimal} a ax^3 
 * @param {Decimal} b + bx^2
 * @param {Decimal} c + cx
 * @param {Decimal} d + d
 * @returns {Decimal}
 */
function inverseCube(x, a, b, c, d, tol = 1e-10) { // inverse of ax^3+bx^2+cx+d
    x = new Decimal(x);
    a = new Decimal(a);
    b = new Decimal(b);
    c = new Decimal(c);
    d = new Decimal(d);
    let res = x.cbrt();
    let r;

    // newton's method 
    for (var i = 0; i < 100; ++i) {
        r = res.sub(res.pow(3).mul(a).add(res.pow(2).mul(b)).add(res.mul(c)).add(d).sub(x).div(res.pow(2).mul(a).mul(3).add(res.mul(b).mul(2)).add(c)));
        if (res.sub(r).abs().lt(tol)) {
            return r;
        }
        res = r;
    }
    console.warn(`inverseCube couldn't finish converging! (Final value: ${format(res)})`);
    return res;
}

/**
 * This function returns an approximation to the inverse factorial.
 * Examples: x = 5040, will return 6.99724 (close to 7)
 * @param {Decimal} x 
 * @returns {Decimal}
 */
function inverseFact(x) {
    x = new Decimal(x);
    if (x.layer > 2) return x.log10();
    if (x.layer > 1 && x.mag >= 10000) return x.log10().div(x.log10().log10());
    return x.div(c.dsqrt2pi).ln().div(Math.E).lambertw().add(1).exp().sub(0.5);
}

/**
 * This solves the product
 * Product of n=0 to x of a+bn
 * inverse is with respect to x
 * @param {Decimal} x 
 * @param {Decimal} a 
 * @param {Decimal} b 
 * @returns {Decimal}
 */
function linearIncreaseMulti(x, a, b) { // i cannot find a good inverse for this
    x = new Decimal(x);
    a = new Decimal(a);
    b = new Decimal(b);

    return b.pow(x.add(1)).mul(a.div(b).add(x).factorial()).div(a.div(b).factorial()).div(b);
}

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

function sumHarmonicSeries(x) {
    x = D(x)
    return x.ln().add(0.5772156649015329).add(Decimal.div(0.5, x)).sub(Decimal.div(1, (x.pow(2).mul(12)))).add(Decimal.div(1, (x.pow(4).mul(120))))
}

/**
 * ((x + start) ^ poly / (poly * start ^ (poly - 1))) - start / poly
 * @param {Decimal} x 
 * @param {Decimal} poly 
 * @param {Decimal} start 
 * @param {Boolean} inverse
 * @returns {Decimal}
 */
function smoothPoly(x, poly, start, inverse) {
    return inverse
    ? x.add(start.div(poly)).mul(poly.mul(start.pow(poly.sub(1)))).root(poly).sub(start)
    : x.add(start).pow(poly).div(poly.mul(start.pow(poly.sub(1)))).sub(start.div(poly))
}

function smoothExp(exp, x, inv) {
    return inv
        ? x.mul(exp.ln()).add(1).log(exp)
        : Decimal.pow(exp, x).sub(1).div(exp.ln())
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}