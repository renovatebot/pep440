

const {
    valid,
    clean,
    explain
} = require('./lib/version');

const {
    lt,
    le,
    eq,
    ne,
    ge,
    gt,
    compare,
    rcompare,
} = require('./lib/operator');

const range = require('./lib/range');

module.exports = {
    // version
    valid,
    clean,
    explain,

    // operator
    lt,
    le,
    lte: le,
    eq,
    ne,
    neq: ne,
    ge,
    gte: ge,
    gt,
    compare,
    rcompare,
    
    // range
    satisfies,
};
