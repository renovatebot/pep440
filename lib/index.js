
const VERSION_PATTERN = [
    'v?',
    '(?:',
    /* */'(?:(?<epoch>[0-9]+)!)?',                           // epoch
    /* */'(?<release>[0-9]+(?:\\.[0-9]+)*)',                  // release segment
    /* */'(?<pre>',                                          // pre-release
    /*    */'[-_\\.]?',
    /*    */'(?<pre_l>(a|b|c|rc|alpha|beta|pre|preview))',
    /*    */'[-_\\.]?',
    /*    */'(?<pre_n>[0-9]+)?',
    /* */')?',
    /* */'(?<post>',                                         // post release
    /*    */'(?:-(?<post_n1>[0-9]+))',
    /*    */'|',
    /*    */'(?:',
    /*        */'[-_\\.]?',
    /*        */'(?<post_l>post|rev|r)',
    /*        */'[-_\\.]?',
    /*        */'(?<post_n2>[0-9]+)?',
    /*    */')',
    /* */')?',
    /* */'(?<dev>',                                          // dev release
    /*    */'[-_\\.]?',
    /*    */'(?<dev_l>dev)',
    /*    */'[-_\\.]?',
    /*    */'(?<dev_n>[0-9]+)?',
    /* */')?',
    ')',
    '(?:\\+(?<local>[a-z0-9]+(?:[-_\\.][a-z0-9]+)*))?',       // local version
].join('');

module.exports = {
    VERSION_PATTERN,
    valid,
    clean,
    compare,
    explain,
    lt,
    le,
    eq,
    ne,
    ge,
    gt,
}

const validRegex = new RegExp('^' + VERSION_PATTERN + '$', 'i');

function valid(version) {
    return validRegex.test(version) ? version : null;
}

const cleanRegex = new RegExp('^\\s*' + VERSION_PATTERN + '\\s*$', 'i');
function clean(version) {
    return stringify(parse(version, cleanRegex));
}

function lt(version, other) {
    return compare(version, other, (a, b) => a < b);
}

function le(version, other) {
    return compare(version, other, (a, b) => a <= b);
}

function eq(version, other) {
    return compare(version, other, (a, b) => a == b);
}

function ne(version, other) {
    return compare(version, other, (a, b) => a != b);
}

function ge(version, other) {
    return compare(version, other, (a, b) => a >= b);
}

function gt(version, other) {
    return compare(version, other, (a, b) => a > b);
}

function compare(version, other, comparator) {

    const parsedVersion = parse(version, validRegex);
    const parsedOther = parse(other, validRegex);

    const keyVersion = calculateKey(parsedVersion);
    const keyOther = calculateKey(parsedOther);

    const res = pyCompare(keyVersion, keyOther);

    return comparator(res, 0);

}

// this logic is buitin in python, but we need to port it to js
// see https://stackoverflow.com/a/5292332/1438522
function pyCompare(elem, other) {
    if (elem === other) {
        return 0;
    }
    if (Array.isArray(elem) !== Array.isArray(other)) {
        elem = Array.isArray(elem) ? elem : [elem];
        other = Array.isArray(other) ? other : [other];
    }
    if (Array.isArray(elem)) {
        const len = Math.min(elem.length, other.length);
        for (let i = 0; i < len; i++) {
            const res = pyCompare(elem[i], other[i]);
            if (res !== 0) {
                return res;
            }
        }
        return elem.length - other.length;
    }
    if (elem === -Infinity || other === Infinity) {
        return -1;
    }
    if (elem === Infinity || other === -Infinity) {
        return 1;
    }
    return elem < other ? -1 : 1;
}

function parse(version, regex) {

    // Validate the version and parse it into pieces
    match = regex.exec(version);
    if (!match) {
        return null;
    }
    const groups = match.groups;

    // Store the parsed out pieces of the version
    let parsed = {
        epoch: Number(groups.epoch ? groups.epoch : 0),
        release: groups.release.split(".").map(Number),
        pre: normalize_letter_version(
            groups.pre_l,
            groups.pre_n,
        ),
        post: normalize_letter_version(
            groups.post_l,
            groups.post_n1 || groups.post_n2,
        ),
        dev: normalize_letter_version(
            groups.dev_l,
            groups.dev_n,
        ),
        local: parse_local_version(groups.local),
    }

    return parsed;

}

function stringify(parsed) {
    if (!parsed) {
        return null;
    }
    let { epoch, release, pre, post, dev, local } = parsed;
    parts = []

    // Epoch
    if (epoch != 0) {
        parts.push(`${epoch}!`)
    }
    // Release segment
    parts.push(release.join('.'))

    // Pre-release
    if (pre) {
        parts.push(pre.join(''))
    }
    // Post-release
    if (post) {
        parts.push('.' + post.join(''))
    }
    // Development release
    if (dev) {
        parts.push('.' + dev.join(''))
    }
    // Local version segment
    if (local) {
        parts.push(`+${local}`)
    }
    return parts.join('')
}

function normalize_letter_version(letter, number) {
    if (letter) {
        // We consider there to be an implicit 0 in a pre-release if there is
        // not a numeral associated with it.
        if (!number) {
            number = 0
        }
        // We normalize any letters to their lower case form
        letter = letter.toLowerCase()

        // We consider some words to be alternate spellings of other words and
        // in those cases we want to normalize the spellings to our preferred
        // spelling.
        if (letter == "alpha") {
            letter = "a"
        } else if (letter == "beta") {
            letter = "b"
        } else if (["c", "pre", "preview"].includes(letter)) {
            letter = "rc"
        } else if (["rev", "r"].includes(letter)) {
            letter = "post"
        }
        return [letter, Number(number)]
    }
    if (!letter && number) {
        // We assume if we are given a number, but we are not given a letter
        // then this is using the implicit post release syntax (e.g. 1.0-1)
        letter = "post"

        return [letter, Number(number)]
    }
    return null;
}

function parse_local_version(local) {
    /*
    Takes a string like abc.1.twelve and turns it into("abc", 1, "twelve").
    */
    if (local) {
        return local.split(/[\._-]/).map(function (part) {
            return isNaN(part) ? part.toLowerCase() : Number(part);
        });
    }
    return null;
}

function calculateKey({ epoch, release, pre, post, dev, local }) {

    // When we compare a release version, we want to compare it with all of the
    // trailing zeros removed. So we'll use a reverse the list, drop all the now
    // leading zeros until we come to something non zero, then take the rest
    // re-reverse it back into the correct order and make it a tuple and use
    // that for our sorting key.
    release = release.concat();
    release.reverse();
    while (release.length && release[0] === 0) {
        release.shift();
    }
    release.reverse();

    // We need to "trick" the sorting algorithm to put 1.0.dev0 before 1.0a0.
    // We'll do this by abusing the pre segment, but we _only_ want to do this
    // if there is !a pre or a post segment. If we have one of those then
    // the normal sorting rules will handle this case correctly.
    if (!pre && !post && dev)
        pre = -Infinity
    // Versions without a pre-release (except as noted above) should sort after
    // those with one.
    else if (!pre)
        pre = Infinity

    // Versions without a post segment should sort before those with one.
    if (!post)
        post = -Infinity

    // Versions without a development segment should sort after those with one.
    if (!dev)
        dev = Infinity

    if (!local) {
        // Versions without a local segment should sort before those with one.
        local = -Infinity
    } else {
        // Versions with a local segment need that segment parsed to implement
        // the sorting rules in PEP440.
        // - Alpha numeric segments sort before numeric segments
        // - Alpha numeric segments sort lexicographically
        // - Numeric segments sort numerically
        // - Shorter versions sort before longer versions when the prefixes
        //   match exactly
        local = local.map(i => isNaN(i) ? [-Infinity, i] : [i, ""]);
    }

    return [epoch, release, pre, post, dev, local];
}

function explain(version) {
    const parsed = parse(version, validRegex);
    if (!parsed) {
        return parsed;
    }
    const { epoch, release, pre, post, dev, local } = parsed;

    let base_version = '';
    if (epoch !== 0) {
        base_version += epoch + "!";
    }
    base_version += release.join(".");

    const is_prerelease = Boolean(dev || pre);
    const is_devrelease = Boolean(dev);
    const is_postrelease = Boolean(post);

    // return

    return {
        epoch,
        release,
        pre,
        post: post ? post[1] : post,
        dev: dev ? dev[1] : dev,
        local: local ? local.join(".") : local,
        public: stringify(parsed).split("+", 1)[0],
        base_version,
        is_prerelease,
        is_devrelease,
        is_postrelease,
    };
}
