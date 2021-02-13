/*
This file is dual licensed under the terms of the Apache License, Version
2.0, and the BSD License. See the LICENSE file in the root of this repository
for complete details.
*/

const { valid, clean } = require("../lib/version");

const { VERSIONS, INVALID_VERSIONS } = require("./fixture");

describe("valid(version)", () => {
  VERSIONS.forEach((version) => {
    it("returns valid for " + JSON.stringify(version), () => {
      expect(valid(version)).toEqual(version);
    });
  });

  INVALID_VERSIONS.forEach((version) => {
    it("returns null for " + JSON.stringify(version), () => {
      expect(valid(version)).toBe(null);
    });
  });
});

describe("clean(version)", () => {
  INVALID_VERSIONS.forEach((version) => {
    it("returns null for " + JSON.stringify(version), () => {
      expect(clean(version)).toBe(null);
    });
  });

  [
    // Various development release incarnations
    ["1.0dev", "1.0.dev0"],
    ["1.0.dev", "1.0.dev0"],
    ["1.0dev1", "1.0.dev1"],
    ["1.0dev", "1.0.dev0"],
    ["1.0-dev", "1.0.dev0"],
    ["1.0-dev1", "1.0.dev1"],
    ["1.0DEV", "1.0.dev0"],
    ["1.0.DEV", "1.0.dev0"],
    ["1.0DEV1", "1.0.dev1"],
    ["1.0DEV", "1.0.dev0"],
    ["1.0.DEV1", "1.0.dev1"],
    ["1.0-DEV", "1.0.dev0"],
    ["1.0-DEV1", "1.0.dev1"],

    // Various alpha incarnations
    ["1.0a", "1.0a0"],
    ["1.0.a", "1.0a0"],
    ["1.0.a1", "1.0a1"],
    ["1.0-a", "1.0a0"],
    ["1.0-a1", "1.0a1"],
    ["1.0alpha", "1.0a0"],
    ["1.0.alpha", "1.0a0"],
    ["1.0.alpha1", "1.0a1"],
    ["1.0-alpha", "1.0a0"],
    ["1.0-alpha1", "1.0a1"],
    ["1.0A", "1.0a0"],
    ["1.0.A", "1.0a0"],
    ["1.0.A1", "1.0a1"],
    ["1.0-A", "1.0a0"],
    ["1.0-A1", "1.0a1"],
    ["1.0ALPHA", "1.0a0"],
    ["1.0.ALPHA", "1.0a0"],
    ["1.0.ALPHA1", "1.0a1"],
    ["1.0-ALPHA", "1.0a0"],
    ["1.0-ALPHA1", "1.0a1"],

    // Various beta incarnations
    ["1.0b", "1.0b0"],
    ["1.0.b", "1.0b0"],
    ["1.0.b1", "1.0b1"],
    ["1.0-b", "1.0b0"],
    ["1.0-b1", "1.0b1"],
    ["1.0beta", "1.0b0"],
    ["1.0.beta", "1.0b0"],
    ["1.0.beta1", "1.0b1"],
    ["1.0-beta", "1.0b0"],
    ["1.0-beta1", "1.0b1"],
    ["1.0B", "1.0b0"],
    ["1.0.B", "1.0b0"],
    ["1.0.B1", "1.0b1"],
    ["1.0-B", "1.0b0"],
    ["1.0-B1", "1.0b1"],
    ["1.0BETA", "1.0b0"],
    ["1.0.BETA", "1.0b0"],
    ["1.0.BETA1", "1.0b1"],
    ["1.0-BETA", "1.0b0"],
    ["1.0-BETA1", "1.0b1"],

    // Various release candidate incarnations
    ["1.0c", "1.0rc0"],
    ["1.0.c", "1.0rc0"],
    ["1.0.c1", "1.0rc1"],
    ["1.0-c", "1.0rc0"],
    ["1.0-c1", "1.0rc1"],
    ["1.0rc", "1.0rc0"],
    ["1.0.rc", "1.0rc0"],
    ["1.0.rc1", "1.0rc1"],
    ["1.0-rc", "1.0rc0"],
    ["1.0-rc1", "1.0rc1"],
    ["1.0C", "1.0rc0"],
    ["1.0.C", "1.0rc0"],
    ["1.0.C1", "1.0rc1"],
    ["1.0-C", "1.0rc0"],
    ["1.0-C1", "1.0rc1"],
    ["1.0RC", "1.0rc0"],
    ["1.0.RC", "1.0rc0"],
    ["1.0.RC1", "1.0rc1"],
    ["1.0-RC", "1.0rc0"],
    ["1.0-RC1", "1.0rc1"],

    // Various post release incarnations
    ["1.0post", "1.0.post0"],
    ["1.0.post", "1.0.post0"],
    ["1.0post1", "1.0.post1"],
    ["1.0post", "1.0.post0"],
    ["1.0-post", "1.0.post0"],
    ["1.0-post1", "1.0.post1"],
    ["1.0POST", "1.0.post0"],
    ["1.0.POST", "1.0.post0"],
    ["1.0POST1", "1.0.post1"],
    ["1.0POST", "1.0.post0"],
    ["1.0r", "1.0.post0"],
    ["1.0rev", "1.0.post0"],
    ["1.0.POST1", "1.0.post1"],
    ["1.0.r1", "1.0.post1"],
    ["1.0.rev1", "1.0.post1"],
    ["1.0-POST", "1.0.post0"],
    ["1.0-POST1", "1.0.post1"],
    ["1.0-5", "1.0.post5"],
    ["1.0-r5", "1.0.post5"],
    ["1.0-rev5", "1.0.post5"],

    // Local version case insensitivity
    ["1.0+AbC", "1.0+abc"],

    // Integer Normalization
    ["1.01", "1.1"],
    ["1.0a05", "1.0a5"],
    ["1.0b07", "1.0b7"],
    ["1.0c056", "1.0rc56"],
    ["1.0rc09", "1.0rc9"],
    ["1.0.post000", "1.0.post0"],
    ["1.1.dev09000", "1.1.dev9000"],
    ["00!1.2", "1.2"],
    ["0100!0.0", "100!0.0"],

    // Various other normalizations
    ["v1.0", "1.0"],
    ["   v1.0\t\n", "1.0"],
    ["1.0c1", "1.0rc1"],
  ].forEach((tuple) => {
    const [version, normalized] = tuple;
    it(`normalizes ${JSON.stringify(version)} to ${JSON.stringify(
      normalized
    )}`, () => {
      expect(clean(version)).toEqual(normalized);
    });
  });
});
