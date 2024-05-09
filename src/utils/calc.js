"use strict";

const c = {
    d0:          Decimal.dZero,
    em4:         Decimal.fromComponents_noNormalize(1, 0, 0.0001),
    em2:         Decimal.fromComponents_noNormalize(1, 0, 0.01),
    d0_015:      Decimal.fromComponents_noNormalize(1, 0, 0.015),
    d0_02:       Decimal.fromComponents_noNormalize(1, 0, 0.02),
    dlog1_05:    Decimal.fromComponents_noNormalize(1, 0, Math.log10(1.05)), // 0.021189
    d0_022:      Decimal.fromComponents_noNormalize(1, 0, 0.022),
    d0_025:      Decimal.fromComponents_noNormalize(1, 0, 0.025),
    d0_03:       Decimal.fromComponents_noNormalize(1, 0, 0.03),
    d0_04:       Decimal.fromComponents_noNormalize(1, 0, 0.04),
    d0_05:       Decimal.fromComponents_noNormalize(1, 0, 0.05),
    d0_1:        Decimal.fromComponents_noNormalize(1, 0, 0.1),
    d0_15:       Decimal.fromComponents_noNormalize(1, 0, 0.15),
    d0_2:        Decimal.fromComponents_noNormalize(1, 0, 0.2),
    d0_25:       Decimal.fromComponents_noNormalize(1, 0, 0.25), 
    d0_252:      Decimal.fromComponents_noNormalize(1, 0, 0.252), 
    d0_255:      Decimal.fromComponents_noNormalize(1, 0, 0.255), 
    d0_26:       Decimal.fromComponents_noNormalize(1, 0, 0.26), 
    d0_275:      Decimal.fromComponents_noNormalize(1, 0, 0.275), 
    d0_3:        Decimal.fromComponents_noNormalize(1, 0, 0.3),
    d1div3:      Decimal.fromComponents_noNormalize(1, 0, 1/3), // 0.333333
    d0_35:       Decimal.fromComponents_noNormalize(1, 0, 0.35), 
    d0_4:        Decimal.fromComponents_noNormalize(1, 0, 0.4),
    d5div12:     Decimal.fromComponents_noNormalize(1, 0, 5/12), // 0.416667
    d0_5:        Decimal.fromComponents_noNormalize(1, 0, 0.5),
    d0_55:       Decimal.fromComponents_noNormalize(1, 0, 0.55), 
    dGamma:      Decimal.fromComponents_noNormalize(1, 0, 0.5772156649015329),
    d0_6:        Decimal.fromComponents_noNormalize(1, 0, 0.6),
    d2div3:      Decimal.fromComponents_noNormalize(1, 0, 2/3), // 0.666667
    d0_75:       Decimal.fromComponents_noNormalize(1, 0, 0.75),
    d0_788107:   Decimal.fromComponents_noNormalize(1, 0, 0.788107009300619),
    d0_8:        Decimal.fromComponents_noNormalize(1, 0, 0.8),
    d0_85:       Decimal.fromComponents_noNormalize(1, 0, 0.85),
    d0_875:      Decimal.fromComponents_noNormalize(1, 0, 0.875),
    d0_9:        Decimal.fromComponents_noNormalize(1, 0, 0.9),
    d0_95:       Decimal.fromComponents_noNormalize(1, 0, 0.95),
    d0_975:      Decimal.fromComponents_noNormalize(1, 0, 0.975),
    d1:          Decimal.dOne,
    d1_0004:     Decimal.fromComponents_noNormalize(1, 0, 1.0004),
    d1_0005:     Decimal.fromComponents_noNormalize(1, 0, 1.0005),
    d1_0009:     Decimal.fromComponents_noNormalize(1, 0, 1.0009),
    d1_001:      Decimal.fromComponents_noNormalize(1, 0, 1.001),
    d1_01:       Decimal.fromComponents_noNormalize(1, 0, 1.01),
    d1_02:       Decimal.fromComponents_noNormalize(1, 0, 1.02),
    d1_025:      Decimal.fromComponents_noNormalize(1, 0, 1.025),
    d1_05:       Decimal.fromComponents_noNormalize(1, 0, 1.05),
    d1_075:      Decimal.fromComponents_noNormalize(1, 0, 1.075),
    d1_1:        Decimal.fromComponents_noNormalize(1, 0, 1.1),
    d10div9:     Decimal.fromComponents_noNormalize(1, 0, 10/9), // 1.111111
    d1_125:      Decimal.fromComponents_noNormalize(1, 0, 1.125),
    d8div7:      Decimal.fromComponents_noNormalize(1, 0, 8/7), // 1.142857
    d1_2:        Decimal.fromComponents_noNormalize(1, 0, 1.2),
    d1_25:       Decimal.fromComponents_noNormalize(1, 0, 1.25),
    dcbrt2:      Decimal.fromComponents_noNormalize(1, 0, Math.cbrt(2)), // 1.259921
    d1_3:        Decimal.fromComponents_noNormalize(1, 0, 1.3),
    d4div3:      Decimal.fromComponents_noNormalize(1, 0, 4/3), // 1.333333
    d1_5:        Decimal.fromComponents_noNormalize(1, 0, 1.5),
    d1_55:       Decimal.fromComponents_noNormalize(1, 0, 1.55),
    d5div3:      Decimal.fromComponents_noNormalize(1, 0, 5/3), // 1.666667
    d2:          Decimal.dTwo,
    dln10:       Decimal.fromComponents_noNormalize(1, 0, Math.log(10)), // 2.302585
    d2_5:        Decimal.fromComponents_noNormalize(1, 0, 2.5),
    dsqrt2pi:    Decimal.fromComponents_noNormalize(1, 0, Math.sqrt(2 * Math.PI)), // 2.506628
    de:          Decimal.fromComponents_noNormalize(1, 0, Math.E), // 2.718281
    d3:          Decimal.fromComponents_noNormalize(1, 0, 3),
    d4:          Decimal.fromComponents_noNormalize(1, 0, 4),
    d5:          Decimal.fromComponents_noNormalize(1, 0, 5),
    d6:          Decimal.fromComponents_noNormalize(1, 0, 6),
    d7:          Decimal.fromComponents_noNormalize(1, 0, 7),
    d8:          Decimal.fromComponents_noNormalize(1, 0, 8),
    d8_5:        Decimal.fromComponents_noNormalize(1, 0, 8.5),
    d9:          Decimal.fromComponents_noNormalize(1, 0, 9),
    d10:         Decimal.fromComponents_noNormalize(1, 0, 10),
    d11:         Decimal.fromComponents_noNormalize(1, 0, 11),
    d12:         Decimal.fromComponents_noNormalize(1, 0, 12),
    d13:         Decimal.fromComponents_noNormalize(1, 0, 13),
    d14:         Decimal.fromComponents_noNormalize(1, 0, 14),
    d15:         Decimal.fromComponents_noNormalize(1, 0, 15),
    d15_5:       Decimal.fromComponents_noNormalize(1, 0, 15.5),
    d16:         Decimal.fromComponents_noNormalize(1, 0, 16),
    d18:         Decimal.fromComponents_noNormalize(1, 0, 18),
    d20:         Decimal.fromComponents_noNormalize(1, 0, 20),
    d25:         Decimal.fromComponents_noNormalize(1, 0, 25),
    d30:         Decimal.fromComponents_noNormalize(1, 0, 30),
    d31:         Decimal.fromComponents_noNormalize(1, 0, 31),
    d32:         Decimal.fromComponents_noNormalize(1, 0, 32),
    d33:         Decimal.fromComponents_noNormalize(1, 0, 33),
    d40:         Decimal.fromComponents_noNormalize(1, 0, 40),
    d50:         Decimal.fromComponents_noNormalize(1, 0, 50),
    d55:         Decimal.fromComponents_noNormalize(1, 0, 55),
    d60:         Decimal.fromComponents_noNormalize(1, 0, 60),
    d75:         Decimal.fromComponents_noNormalize(1, 0, 75),
    e2:          Decimal.fromComponents_noNormalize(1, 0, 100),
    d150:        Decimal.fromComponents_noNormalize(1, 0, 150),
    d200:        Decimal.fromComponents_noNormalize(1, 0, 200),
    d250:        Decimal.fromComponents_noNormalize(1, 0, 250),
    d300:        Decimal.fromComponents_noNormalize(1, 0, 300),
    logMaxNum:   Decimal.fromComponents_noNormalize(1, 0, Math.log10(2) * 1024), // 308.254716
    d400:        Decimal.fromComponents_noNormalize(1, 0, 400),
    d500:        Decimal.fromComponents_noNormalize(1, 0, 500),
    e3:          Decimal.fromComponents_noNormalize(1, 0, 1000),
    d1200:       Decimal.fromComponents_noNormalize(1, 0, 1200),
    d2500:       Decimal.fromComponents_noNormalize(1, 0, 2500),
    d8500:       Decimal.fromComponents_noNormalize(1, 0, 8500),
    e4:          Decimal.fromComponents_noNormalize(1, 0, 10000),
    d5e4:        Decimal.fromComponents_noNormalize(1, 0, 50000),
    e5:          Decimal.fromComponents_noNormalize(1, 0, 100000),
    e6:          Decimal.fromComponents_noNormalize(1, 0, 1000000),
    e7:          Decimal.fromComponents_noNormalize(1, 0, 10000000),
    d2e7:        Decimal.fromComponents_noNormalize(1, 0, 20000000),
    e8:          Decimal.fromComponents_noNormalize(1, 0, 100000000), 
    d3e8:        Decimal.fromComponents_noNormalize(1, 0, 300000000), 
    e9:          Decimal.fromComponents_noNormalize(1, 0, 1000000000), 
    e10:         Decimal.fromComponents_noNormalize(1, 0, 10000000000), 
    d2e11:       Decimal.fromComponents_noNormalize(1, 0, 200000000000), 
    e12:         Decimal.fromComponents_noNormalize(1, 0, 1000000000000), 
    e13:         Decimal.fromComponents_noNormalize(1, 0, 10000000000000), 
    e15:         Decimal.fromComponents_noNormalize(1, 0, 1000000000000000), 
    maxSafe:     Decimal.fromComponents_noNormalize(1, 0, 9007199254740991), // e15.954589770191003
    e16:         Decimal.fromComponents_noNormalize(1, 1, 16),
    e17:         Decimal.fromComponents_noNormalize(1, 1, 17),
    e18:         Decimal.fromComponents_noNormalize(1, 1, 18),
    e20:         Decimal.fromComponents_noNormalize(1, 1, 20),
    e24:         Decimal.fromComponents_noNormalize(1, 1, 24),
    e25:         Decimal.fromComponents_noNormalize(1, 1, 25),
    e30:         Decimal.fromComponents_noNormalize(1, 1, 30),
    e33:         Decimal.fromComponents_noNormalize(1, 1, 33),
    e35:         Decimal.fromComponents_noNormalize(1, 1, 35),
    e50:         Decimal.fromComponents_noNormalize(1, 1, 50),
    e55:         Decimal.fromComponents_noNormalize(1, 1, 55),
    e60:         Decimal.fromComponents_noNormalize(1, 1, 60),
    e80:         Decimal.fromComponents_noNormalize(1, 1, 80),
    e85:         Decimal.fromComponents_noNormalize(1, 1, 85),
    e90:         Decimal.fromComponents_noNormalize(1, 1, 90),
    e100:        Decimal.fromComponents_noNormalize(1, 1, 100),
    e140:        Decimal.fromComponents_noNormalize(1, 1, 140),
    e200:        Decimal.fromComponents_noNormalize(1, 1, 200),
    e260:        Decimal.fromComponents_noNormalize(1, 1, 260),
    maxNum:      Decimal.fromComponents_noNormalize(1, 1, Math.log10(2) * 1024), // 1.797e308 - e308.254716
    trueInf:     Decimal.dInf
}

const DEFAULT_SCALE = [
    { pow: c.d2,  type: 0, },
    { pow: c.d3,  type: 0, },
    { pow: c.d4,  type: 1, },
    { pow: c.d4,  type: 0, },
    { pow: c.d5,  type: 1, },
    { pow: c.d6,  type: 2, },
    { pow: c.d15, type: 0, },
    { pow: c.d75, type: 0, },
    { pow: c.e2,  type: 1, },
    { pow: c.d60, type: 2, }
]

function doAllScaling(x, scalList, inv) {
    let sta, pow, sType, base, index
    x = D(x);
    for (let i = 0; i < scalList.length; i++) {
        index = inv ? i : scalList.length - i - 1;
        sta = scalList[index].start;
        pow = scalList[index].strength;
        sType = scalList[index].type;
        base = scalList[index].bp;
        
        x = scale(x, sType, inv, sta, pow, base);
    }
    return x;
}

/**
 * @param {Decimal} num the input
 * @param {any} type what type of scaling/softcap should be used
 * @param {boolean} inverse if there should be an inverse for it
 * @param {Decimal} start when the scale/softcap starts
 * @param {Decimal} str the overall strength of the scaling/softcap (1.0 = 100%, 0.5 = 50%) taken as a power of powScale
 * @param {Decimal} powScale inital value of the scaling/softcap that gets acted upon by str
 * @returns {Decimal}
 */
function scale(num, type, inverse = false, start, str, powScale) {
    if (num.lte(start)) { return num; }
    str = Decimal.pow(powScale, str);
    switch (type) {
        // Polynomial
        case 0:
        case 0.1:
        case "P":
        case "P1":
            return inverse
                    ? num.sub(start).mul(str).div(start).add(1).root(str).mul(start)
                    : num.div(start).pow(str).sub(1).mul(start).div(str).add(start)
        case 0.2: // alemaninc
        case "P2":
            return inverse
                    ? num.div(start).root(str).sub(1).mul(str).add(1).mul(start)
                    : num.div(start).sub(1).div(str).add(1).pow(str).mul(start)
        // Exponential
        case 1:
        case 1.1:
        case "E":
        case "E1":
            return inverse 
                    ? Decimal.min(num, num.div(start).log(str).add(1).mul(start))
                    : Decimal.max(num, Decimal.pow(str, num.div(start).sub(1)).mul(start))
        case 1.2:
        case "E2":
            return inverse
                    ? num.mul(str).mul(str.ln()).div(start).lambertw().mul(start).div(str.ln())
                    : Decimal.pow(str, num.div(start).sub(1)).mul(num)
        case 1.3: // alemaninc
        case "E3":
            return inverse // poly exponential scaling
                    ? num.div(start).ln().mul(str.sub(1)).add(1).root(str.sub(1)).mul(start)
                    : num.div(start).pow(str.sub(1)).sub(1).div(str.sub(1)).exp().mul(start)
        // Semi-exponential
        case 2: 
        case 2.1:
        case "SE":
        case "SE1":
            return inverse // steep scaling
                    ? Decimal.pow(start, num.sub(start).mul(str).add(start).log(start).root(str))
                    : Decimal.pow(start, num.log(start).pow(str)).sub(start).div(str).add(start)
        case 2.2:
        case "SE2": // very shallow scaling
            return inverse
                    ? Decimal.pow(start, num.log(start).sub(1).mul(str).add(1).root(str))
                    : Decimal.pow(start, num.log(start).pow(str).sub(1).div(str).add(1))
        // convergent
        case 3: // alemaninc
        case 3.1:
        case "C":
        case "C1":
            return inverse
                    ? str.mul(num).add(start.pow(2)).sub(start.mul(num).mul(2)).div(str.sub(num))
                    : str.mul(num).sub(start.pow(2)).div(p.sub(start.mul(2)).add(num));
        default:
            throw new Error(`Scaling type ${type} doesn't exist`);
    }
}

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