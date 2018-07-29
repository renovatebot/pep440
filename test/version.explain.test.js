const { explain } = require("../lib/version");

const { INVALID_VERSIONS } = require("./fixture");

describe("explain(version)", () => {
  INVALID_VERSIONS.forEach(version => {
    it("returns null for " + JSON.stringify(version), () => {
      expect(explain(version)).toBe(null);
    });
  });
});

describe("explain(version).public", () => {
  [
    ["1.0", "1.0"],
    ["1.0.dev0", "1.0.dev0"],
    ["1.0.dev6", "1.0.dev6"],
    ["1.0a1", "1.0a1"],
    ["1.0a1.post5", "1.0a1.post5"],
    ["1.0a1.post5.dev6", "1.0a1.post5.dev6"],
    ["1.0rc4", "1.0rc4"],
    ["1.0.post5", "1.0.post5"],
    ["1!1.0", "1!1.0"],
    ["1!1.0.dev6", "1!1.0.dev6"],
    ["1!1.0a1", "1!1.0a1"],
    ["1!1.0a1.post5", "1!1.0a1.post5"],
    ["1!1.0a1.post5.dev6", "1!1.0a1.post5.dev6"],
    ["1!1.0rc4", "1!1.0rc4"],
    ["1!1.0.post5", "1!1.0.post5"],
    ["1.0+deadbeef", "1.0"],
    ["1.0.dev6+deadbeef", "1.0.dev6"],
    ["1.0a1+deadbeef", "1.0a1"],
    ["1.0a1.post5+deadbeef", "1.0a1.post5"],
    ["1.0a1.post5.dev6+deadbeef", "1.0a1.post5.dev6"],
    ["1.0rc4+deadbeef", "1.0rc4"],
    ["1.0.post5+deadbeef", "1.0.post5"],
    ["1!1.0+deadbeef", "1!1.0"],
    ["1!1.0.dev6+deadbeef", "1!1.0.dev6"],
    ["1!1.0a1+deadbeef", "1!1.0a1"],
    ["1!1.0a1.post5+deadbeef", "1!1.0a1.post5"],
    ["1!1.0a1.post5.dev6+deadbeef", "1!1.0a1.post5.dev6"],
    ["1!1.0rc4+deadbeef", "1!1.0rc4"],
    ["1!1.0.post5+deadbeef", "1!1.0.post5"]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).public).toBe(expected);
    });
  });
});

describe("explain(version).base_version", () => {
  [
    ["1.0", "1.0"],
    ["1.0.dev0", "1.0"],
    ["1.0.dev6", "1.0"],
    ["1.0a1", "1.0"],
    ["1.0a1.post5", "1.0"],
    ["1.0a1.post5.dev6", "1.0"],
    ["1.0rc4", "1.0"],
    ["1.0.post5", "1.0"],
    ["1!1.0", "1!1.0"],
    ["1!1.0.dev6", "1!1.0"],
    ["1!1.0a1", "1!1.0"],
    ["1!1.0a1.post5", "1!1.0"],
    ["1!1.0a1.post5.dev6", "1!1.0"],
    ["1!1.0rc4", "1!1.0"],
    ["1!1.0.post5", "1!1.0"],
    ["1.0+deadbeef", "1.0"],
    ["1.0.dev6+deadbeef", "1.0"],
    ["1.0a1+deadbeef", "1.0"],
    ["1.0a1.post5+deadbeef", "1.0"],
    ["1.0a1.post5.dev6+deadbeef", "1.0"],
    ["1.0rc4+deadbeef", "1.0"],
    ["1.0.post5+deadbeef", "1.0"],
    ["1!1.0+deadbeef", "1!1.0"],
    ["1!1.0.dev6+deadbeef", "1!1.0"],
    ["1!1.0a1+deadbeef", "1!1.0"],
    ["1!1.0a1.post5+deadbeef", "1!1.0"],
    ["1!1.0a1.post5.dev6+deadbeef", "1!1.0"],
    ["1!1.0rc4+deadbeef", "1!1.0"],
    ["1!1.0.post5+deadbeef", "1!1.0"]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).base_version).toBe(expected);
    });
  });
});

describe("explain(version).epoch", () => {
  [
    ["1.0", 0],
    ["1.0.dev0", 0],
    ["1.0.dev6", 0],
    ["1.0a1", 0],
    ["1.0a1.post5", 0],
    ["1.0a1.post5.dev6", 0],
    ["1.0rc4", 0],
    ["1.0.post5", 0],
    ["1!1.0", 1],
    ["1!1.0.dev6", 1],
    ["1!1.0a1", 1],
    ["1!1.0a1.post5", 1],
    ["1!1.0a1.post5.dev6", 1],
    ["1!1.0rc4", 1],
    ["1!1.0.post5", 1],
    ["1.0+deadbeef", 0],
    ["1.0.dev6+deadbeef", 0],
    ["1.0a1+deadbeef", 0],
    ["1.0a1.post5+deadbeef", 0],
    ["1.0a1.post5.dev6+deadbeef", 0],
    ["1.0rc4+deadbeef", 0],
    ["1.0.post5+deadbeef", 0],
    ["1!1.0+deadbeef", 1],
    ["1!1.0.dev6+deadbeef", 1],
    ["1!1.0a1+deadbeef", 1],
    ["1!1.0a1.post5+deadbeef", 1],
    ["1!1.0a1.post5.dev6+deadbeef", 1],
    ["1!1.0rc4+deadbeef", 1],
    ["1!1.0.post5+deadbeef", 1]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).epoch).toBe(expected);
    });
  });
});

describe("explain(version).release", () => {
  [
    ["1.0", [1, 0]],
    ["1.0.dev0", [1, 0]],
    ["1.0.dev6", [1, 0]],
    ["1.0a1", [1, 0]],
    ["1.0a1.post5", [1, 0]],
    ["1.0a1.post5.dev6", [1, 0]],
    ["1.0rc4", [1, 0]],
    ["1.0.post5", [1, 0]],
    ["1!1.0", [1, 0]],
    ["1!1.0.dev6", [1, 0]],
    ["1!1.0a1", [1, 0]],
    ["1!1.0a1.post5", [1, 0]],
    ["1!1.0a1.post5.dev6", [1, 0]],
    ["1!1.0rc4", [1, 0]],
    ["1!1.0.post5", [1, 0]],
    ["1.0+deadbeef", [1, 0]],
    ["1.0.dev6+deadbeef", [1, 0]],
    ["1.0a1+deadbeef", [1, 0]],
    ["1.0a1.post5+deadbeef", [1, 0]],
    ["1.0a1.post5.dev6+deadbeef", [1, 0]],
    ["1.0rc4+deadbeef", [1, 0]],
    ["1.0.post5+deadbeef", [1, 0]],
    ["1!1.0+deadbeef", [1, 0]],
    ["1!1.0.dev6+deadbeef", [1, 0]],
    ["1!1.0a1+deadbeef", [1, 0]],
    ["1!1.0a1.post5+deadbeef", [1, 0]],
    ["1!1.0a1.post5.dev6+deadbeef", [1, 0]],
    ["1!1.0rc4+deadbeef", [1, 0]],
    ["1!1.0.post5+deadbeef", [1, 0]]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).release).toEqual(expected);
    });
  });
});

describe("explain(version).local", () => {
  [
    ["1.0", null],
    ["1.0.dev0", null],
    ["1.0.dev6", null],
    ["1.0a1", null],
    ["1.0a1.post5", null],
    ["1.0a1.post5.dev6", null],
    ["1.0rc4", null],
    ["1.0.post5", null],
    ["1!1.0", null],
    ["1!1.0.dev6", null],
    ["1!1.0a1", null],
    ["1!1.0a1.post5", null],
    ["1!1.0a1.post5.dev6", null],
    ["1!1.0rc4", null],
    ["1!1.0.post5", null],
    ["1.0+deadbeef", "deadbeef"],
    ["1.0.dev6+deadbeef", "deadbeef"],
    ["1.0a1+deadbeef", "deadbeef"],
    ["1.0a1.post5+deadbeef", "deadbeef"],
    ["1.0a1.post5.dev6+deadbeef", "deadbeef"],
    ["1.0rc4+deadbeef", "deadbeef"],
    ["1.0.post5+deadbeef", "deadbeef"],
    ["1!1.0+deadbeef", "deadbeef"],
    ["1!1.0.dev6+deadbeef", "deadbeef"],
    ["1!1.0a1+deadbeef", "deadbeef"],
    ["1!1.0a1.post5+deadbeef", "deadbeef"],
    ["1!1.0a1.post5.dev6+deadbeef", "deadbeef"],
    ["1!1.0rc4+deadbeef", "deadbeef"],
    ["1!1.0.post5+deadbeef", "deadbeef"]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).local).toBe(expected);
    });
  });
});

describe("explain(version).pre", () => {
  [
    ["1.0", null],
    ["1.0.dev0", null],
    ["1.0.dev6", null],
    ["1.0a1", ["a", 1]],
    ["1.0a1.post5", ["a", 1]],
    ["1.0a1.post5.dev6", ["a", 1]],
    ["1.0rc4", ["rc", 4]],
    ["1.0.post5", null],
    ["1!1.0", null],
    ["1!1.0.dev6", null],
    ["1!1.0a1", ["a", 1]],
    ["1!1.0a1.post5", ["a", 1]],
    ["1!1.0a1.post5.dev6", ["a", 1]],
    ["1!1.0rc4", ["rc", 4]],
    ["1!1.0.post5", null],
    ["1.0+deadbeef", null],
    ["1.0.dev6+deadbeef", null],
    ["1.0a1+deadbeef", ["a", 1]],
    ["1.0a1.post5+deadbeef", ["a", 1]],
    ["1.0a1.post5.dev6+deadbeef", ["a", 1]],
    ["1.0rc4+deadbeef", ["rc", 4]],
    ["1.0.post5+deadbeef", null],
    ["1!1.0+deadbeef", null],
    ["1!1.0.dev6+deadbeef", null],
    ["1!1.0a1+deadbeef", ["a", 1]],
    ["1!1.0a1.post5+deadbeef", ["a", 1]],
    ["1!1.0a1.post5.dev6+deadbeef", ["a", 1]],
    ["1!1.0rc4+deadbeef", ["rc", 4]],
    ["1!1.0.post5+deadbeef", null]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).pre).toEqual(expected);
    });
  });
});

describe("explain(version).is_prerelease", () => {
  [
    ["1.0.dev0", true],
    ["1.0.dev1", true],
    ["1.0a1.dev1", true],
    ["1.0b1.dev1", true],
    ["1.0c1.dev1", true],
    ["1.0rc1.dev1", true],
    ["1.0a1", true],
    ["1.0b1", true],
    ["1.0c1", true],
    ["1.0rc1", true],
    ["1.0a1.post1.dev1", true],
    ["1.0b1.post1.dev1", true],
    ["1.0c1.post1.dev1", true],
    ["1.0rc1.post1.dev1", true],
    ["1.0a1.post1", true],
    ["1.0b1.post1", true],
    ["1.0c1.post1", true],
    ["1.0rc1.post1", true],
    ["1.0", false],
    ["1.0+dev", false],
    ["1.0.post1", false],
    ["1.0.post1+dev", false]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).is_prerelease).toBe(expected);
    });
  });
});

describe("explain(version).dev", () => {
  [
    ["1.0", null],
    ["1.0.dev0", 0],
    ["1.0.dev6", 6],
    ["1.0a1", null],
    ["1.0a1.post5", null],
    ["1.0a1.post5.dev6", 6],
    ["1.0rc4", null],
    ["1.0.post5", null],
    ["1!1.0", null],
    ["1!1.0.dev6", 6],
    ["1!1.0a1", null],
    ["1!1.0a1.post5", null],
    ["1!1.0a1.post5.dev6", 6],
    ["1!1.0rc4", null],
    ["1!1.0.post5", null],
    ["1.0+deadbeef", null],
    ["1.0.dev6+deadbeef", 6],
    ["1.0a1+deadbeef", null],
    ["1.0a1.post5+deadbeef", null],
    ["1.0a1.post5.dev6+deadbeef", 6],
    ["1.0rc4+deadbeef", null],
    ["1.0.post5+deadbeef", null],
    ["1!1.0+deadbeef", null],
    ["1!1.0.dev6+deadbeef", 6],
    ["1!1.0a1+deadbeef", null],
    ["1!1.0a1.post5+deadbeef", null],
    ["1!1.0a1.post5.dev6+deadbeef", 6],
    ["1!1.0rc4+deadbeef", null],
    ["1!1.0.post5+deadbeef", null]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).dev).toBe(expected);
    });
  });
});

describe("explain(version).is_devrelease", () => {
  [
    ["1.0", false],
    ["1.0.dev0", true],
    ["1.0.dev6", true],
    ["1.0a1", false],
    ["1.0a1.post5", false],
    ["1.0a1.post5.dev6", true],
    ["1.0rc4", false],
    ["1.0.post5", false],
    ["1!1.0", false],
    ["1!1.0.dev6", true],
    ["1!1.0a1", false],
    ["1!1.0a1.post5", false],
    ["1!1.0a1.post5.dev6", true],
    ["1!1.0rc4", false],
    ["1!1.0.post5", false],
    ["1.0+deadbeef", false],
    ["1.0.dev6+deadbeef", true],
    ["1.0a1+deadbeef", false],
    ["1.0a1.post5+deadbeef", false],
    ["1.0a1.post5.dev6+deadbeef", true],
    ["1.0rc4+deadbeef", false],
    ["1.0.post5+deadbeef", false],
    ["1!1.0+deadbeef", false],
    ["1!1.0.dev6+deadbeef", true],
    ["1!1.0a1+deadbeef", false],
    ["1!1.0a1.post5+deadbeef", false],
    ["1!1.0a1.post5.dev6+deadbeef", true],
    ["1!1.0rc4+deadbeef", false],
    ["1!1.0.post5+deadbeef", false]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).is_devrelease).toBe(expected);
    });
  });
});

describe("explain(version).post", () => {
  [
    ["1.0", null],
    ["1.0.dev0", null],
    ["1.0.dev6", null],
    ["1.0a1", null],
    ["1.0a1.post5", 5],
    ["1.0a1.post5.dev6", 5],
    ["1.0rc4", null],
    ["1.0.post5", 5],
    ["1!1.0", null],
    ["1!1.0.dev6", null],
    ["1!1.0a1", null],
    ["1!1.0a1.post5", 5],
    ["1!1.0a1.post5.dev6", 5],
    ["1!1.0rc4", null],
    ["1!1.0.post5", 5],
    ["1.0+deadbeef", null],
    ["1.0.dev6+deadbeef", null],
    ["1.0a1+deadbeef", null],
    ["1.0a1.post5+deadbeef", 5],
    ["1.0a1.post5.dev6+deadbeef", 5],
    ["1.0rc4+deadbeef", null],
    ["1.0.post5+deadbeef", 5],
    ["1!1.0+deadbeef", null],
    ["1!1.0.dev6+deadbeef", null],
    ["1!1.0a1+deadbeef", null],
    ["1!1.0a1.post5+deadbeef", 5],
    ["1!1.0a1.post5.dev6+deadbeef", 5],
    ["1!1.0rc4+deadbeef", null],
    ["1!1.0.post5+deadbeef", 5]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).post).toBe(expected);
    });
  });
});

describe("explain(version).is_postrelease", () => {
  [
    ["1.0.dev1", false],
    ["1.0", false],
    ["1.0+foo", false],
    ["1.0.post1.dev1", true],
    ["1.0.post1", true]
  ].forEach(([version, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      version
    )}`, () => {
      expect(explain(version).is_postrelease).toBe(expected);
    });
  });
});
