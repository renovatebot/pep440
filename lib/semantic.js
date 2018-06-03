const { explain } = require('./version');

// those notation are borrowed from semver
module.exports = {
    major,
    minor,
    patch,
};

function major(input) {
    const version = explain(input);
    if (!version) {
        throw new TypeError('Invalid Version: ' + input);
    }
    return version.release[0];
};

function minor(input) {
    const version = explain(input);
    if (!version) {
        throw new TypeError('Invalid Version: ' + input);
    }
    if (version.release.length < 2) {
        return 0;
    }
    return version.release[1];
};

function patch(input) {
    const version = explain(input);
    if (!version) {
        throw new TypeError('Invalid Version: ' + input);
    }
    if (version.release.length < 3) {
        return 0;
    }
    return version.release[2];
};

