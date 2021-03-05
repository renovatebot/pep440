const { major, minor, patch, inc } = require("..");

describe("major(version)", () => {
  it("returns correct value", () => {
    expect(major("1.2.3")).toBe(1);
  });
  it("handles epoch", () => {
    expect(major("25!1.2.3")).toBe(1);
  });
  it("throws when version invalid", () => {
    expect(() => major("not_version")).toThrowError(TypeError);
  });
});

describe("minor(version)", () => {
  it("returns correct value", () => {
    expect(minor("1.2.3")).toBe(2);
  });
  it("pads zeros", () => {
    expect(minor("1")).toBe(0);
  });
  it("throws when version invalid", () => {
    expect(() => minor("not_version")).toThrowError(TypeError);
  });
});

describe("patch(version)", () => {
  it("returns correct value", () => {
    expect(patch("1.2.3")).toBe(3);
  });
  it("pads zeros", () => {
    expect(patch("1.2")).toBe(0);
  });
  it("throws when version invalid", () => {
    expect(() => patch("not_version")).toThrowError(TypeError);
  });
});

describe("inc(version, release)", () => {
  const testCases = [
    // [ existing version, release type (`major`, `minor`, `patch`), identifier (`a`, `b`, or `rc`.), expected result ]

    // Semantic Version numbers only.
    ["0.0.0", "major", undefined, "1.0.0"],
    ["1.0.0", "major", undefined, "2.0.0"],
    ["1.0.1", "major", undefined, "2.0.0"],
    ["1.1.0", "major", undefined, "2.0.0"],

    ["0.0.0", "minor", undefined, "0.1.0"],
    ["1.0.0", "minor", undefined, "1.1.0"],
    ["1.0.1", "minor", undefined, "1.1.0"],
    ["1.1.0", "minor", undefined, "1.2.0"],

    ["0.0.0", "patch", undefined, "0.0.1"],
    ["1.0.0", "patch", undefined, "1.0.1"],
    ["1.0.1", "patch", undefined, "1.0.2"],
    ["1.1.0", "patch", undefined, "1.1.1"],

    ["0.0.0", "premajor", undefined, "1.0.0a0"],
    ["1.0.0", "premajor", undefined, "2.0.0a0"],
    ["1.0.1", "premajor", undefined, "2.0.0a0"],
    ["1.1.0", "premajor", undefined, "2.0.0a0"],

    ["0.0.0", "preminor", undefined, "0.1.0a0"],
    ["1.0.0", "preminor", undefined, "1.1.0a0"],
    ["1.0.1", "preminor", undefined, "1.1.0a0"],
    ["1.1.0", "preminor", undefined, "1.2.0a0"],

    ["0.0.0", "prepatch", undefined, "0.0.1a0"],
    ["1.0.0", "prepatch", undefined, "1.0.1a0"],
    ["1.0.1", "prepatch", undefined, "1.0.2a0"],
    ["1.1.0", "prepatch", undefined, "1.1.1a0"],

    ["0.0.0", "prerelease", undefined, "0.0.1a0"],
    ["1.0.0", "prerelease", undefined, "1.0.1a0"],
    ["1.0.1", "prerelease", undefined, "1.0.2a0"],
    ["1.1.0", "prerelease", undefined, "1.1.1a0"],

    ["0.0.0", "major", `b`, "1.0.0"],
    ["0.0.0", "minor", `b`, "0.1.0"],
    ["0.0.0", "patch", `b`, "0.0.1"],
    ["0.0.0", "premajor", `b`, "1.0.0b0"],
    ["0.0.0", "preminor", `b`, "0.1.0b0"],
    ["0.0.0", "prepatch", `b`, "0.0.1b0"],
    ["0.0.0", "prerelease", `b`, "0.0.1b0"],

    // Extra release segments, as allowed by PEP440.
    ["1.1.1.1", "major", undefined, "2.0.0.0"],
    ["1.1.1.1", "minor", undefined, "1.2.0.0"],
    ["1.1.1.1", "patch", undefined, "1.1.2.0"],
    ["1.1.1.1", "premajor", undefined, "2.0.0.0a0"],
    ["1.1.1.1", "preminor", undefined, "1.2.0.0a0"],
    ["1.1.1.1", "prepatch", undefined, "1.1.2.0a0"],
    ["1.1.1.1", "prerelease", undefined, "1.1.2.0a0"],

    // Without padding, as allowed by PEP440.
    ["1", "major", undefined, "2"],
    ["1.0", "major", undefined, "2.0"],

    ["1", "minor", undefined, "1.1"],
    ["1.0", "minor", undefined, "1.1"],

    ["1", "patch", undefined, "1.0.1"],
    ["1.0", "patch", undefined, "1.0.1"],

    ["1", "premajor", undefined, "2a0"],
    ["1.0", "premajor", undefined, "2.0a0"],

    ["1", "preminor", undefined, "1.1a0"],
    ["1.0", "preminor", undefined, "1.1a0"],

    ["1", "prepatch", undefined, "1.0.1a0"],
    ["1.0", "prepatch", undefined, "1.0.1a0"],

    ["1", "prerelease", undefined, "1.0.1a0"],
    ["1.0", "prerelease", undefined, "1.0.1a0"],

    // Pre-release versions.
    ["1.0.0a0", "major", undefined, "1.0.0"],
    ["1.1.1a0", "major", undefined, "2.0.0"],
    ["1.1.1rc0", "major", undefined, "2.0.0"],

    ["1.0.0a0", "minor", undefined, "1.0.0"],
    ["1.1.1a0", "minor", undefined, "1.2.0"],
    ["1.1.1rc0", "minor", undefined, "1.2.0"],

    ["1.0.0a0", "patch", undefined, "1.0.0"],
    ["1.1.1a0", "patch", undefined, "1.1.1"],
    ["1.1.1rc0", "patch", undefined, "1.1.1"],

    ["1.0.0a0", "premajor", undefined, "2.0.0a0"],
    ["1.1.1a0", "premajor", undefined, "2.0.0a0"],
    ["1.1.1rc0", "premajor", undefined, "2.0.0a0"],

    ["1.0.0a0", "preminor", undefined, "1.1.0a0"],
    ["1.1.1a0", "preminor", undefined, "1.2.0a0"],
    ["1.1.1rc0", "preminor", undefined, "1.2.0a0"],

    ["1.0.0a0", "prepatch", undefined, "1.0.1a0"],
    ["1.1.1a0", "prepatch", undefined, "1.1.2a0"],
    ["1.1.1rc0", "prepatch", undefined, "1.1.2a0"],

    ["1.0.0a0", "prerelease", undefined, "1.0.0a1"],
    ["1.0.0a1", "prerelease", undefined, "1.0.0a2"],
    ["1.0.0b0", "prerelease", undefined, "1.0.0b1"],
    ["1.0.0rc0", "prerelease", undefined, "1.0.0rc1"],

    ["1.0.0a0", "premajor", `b`, "2.0.0b0"],
    ["1.0.0a0", "preminor", `b`, "1.1.0b0"],
    ["1.0.0a0", "prepatch", `b`, "1.0.1b0"],
    ["1.0.0a0", "prerelease", `b`, "1.0.0b0"],

    ["1.0.0b0", "prerelease", `b`, "1.0.0b1"],

    // Post-release versions.
    ["1.0.0.post1", "major", undefined, "2.0.0"],
    ["1.1.1.post1", "major", undefined, "2.0.0"],

    ["1.0.0.post1", "minor", undefined, "1.1.0"],
    ["1.1.1.post1", "minor", undefined, "1.2.0"],

    ["1.0.0.post1", "patch", undefined, "1.0.1"],
    ["1.1.1.post1", "patch", undefined, "1.1.2"],

    ["1.0.0.post1", "premajor", undefined, "2.0.0a0"],
    ["1.1.1.post1", "premajor", undefined, "2.0.0a0"],

    ["1.0.0.post1", "preminor", undefined, "1.1.0a0"],
    ["1.1.1.post1", "preminor", undefined, "1.2.0a0"],

    ["1.0.0.post1", "prepatch", undefined, "1.0.1a0"],
    ["1.1.1.post1", "prepatch", undefined, "1.1.2a0"],

    ["1.0.0.post1", "prerelease", undefined, "1.0.1a0"],
    ["1.1.1.post1", "prerelease", undefined, "1.1.2a0"],

    // Post-releases of pre-release versions.
    ["1.0.0a0.post1", "major", undefined, "1.0.0"],
    ["1.1.1a0.post1", "major", undefined, "2.0.0"],
    ["1.1.1rc0.post1", "major", undefined, "2.0.0"],

    ["1.0.0a0.post1", "minor", undefined, "1.0.0"],
    ["1.1.1a0.post1", "minor", undefined, "1.2.0"],
    ["1.1.1rc0.post1", "minor", undefined, "1.2.0"],

    ["1.0.0a0.post1", "patch", undefined, "1.0.0"],
    ["1.1.1a0.post1", "patch", undefined, "1.1.1"],
    ["1.1.1rc0.post1", "patch", undefined, "1.1.1"],

    ["1.0.0a0.post1", "premajor", undefined, "2.0.0a0"],
    ["1.1.1a0.post1", "premajor", undefined, "2.0.0a0"],
    ["1.1.1rc0.post1", "premajor", undefined, "2.0.0a0"],

    ["1.0.0a0.post1", "preminor", undefined, "1.1.0a0"],
    ["1.1.1a0.post1", "preminor", undefined, "1.2.0a0"],
    ["1.1.1rc0.post1", "preminor", undefined, "1.2.0a0"],

    ["1.0.0a0.post1", "prepatch", undefined, "1.0.1a0"],
    ["1.1.1a0.post1", "prepatch", undefined, "1.1.2a0"],
    ["1.1.1rc0.post1", "prepatch", undefined, "1.1.2a0"],

    ["1.0.0a0.post1", "prerelease", undefined, "1.0.0a1"],
    ["1.0.0b0.post1", "prerelease", undefined, "1.0.0b1"],
    ["1.0.0rc0.post1", "prerelease", undefined, "1.0.0rc1"],

    // Development-release versions.
    ["1.0.0.dev1", "major", undefined, "2.0.0"],
    ["1.1.1.dev1", "major", undefined, "2.0.0"],

    ["1.0.0.dev1", "minor", undefined, "1.1.0"],
    ["1.1.1.dev1", "minor", undefined, "1.2.0"],

    ["1.0.0.dev1", "patch", undefined, "1.0.1"],
    ["1.1.1.dev1", "patch", undefined, "1.1.2"],

    ["1.0.0.dev1", "premajor", undefined, "2.0.0a0"],
    ["1.1.1.dev1", "premajor", undefined, "2.0.0a0"],

    ["1.0.0.dev1", "preminor", undefined, "1.1.0a0"],
    ["1.1.1.dev1", "preminor", undefined, "1.2.0a0"],

    ["1.0.0.dev1", "prepatch", undefined, "1.0.1a0"],
    ["1.1.1.dev1", "prepatch", undefined, "1.1.2a0"],

    ["1.0.0.dev1", "prerelease", undefined, "1.0.1a0"],
    ["1.1.1.dev1", "prerelease", undefined, "1.1.2a0"],

    // Development-releases of pre-release versions.
    ["1.0.0a0.dev1", "major", undefined, "1.0.0"],
    ["1.1.1a0.dev1", "major", undefined, "2.0.0"],
    ["1.1.1rc0.dev1", "major", undefined, "2.0.0"],

    ["1.0.0a0.dev1", "minor", undefined, "1.0.0"],
    ["1.1.1a0.dev1", "minor", undefined, "1.2.0"],
    ["1.1.1rc0.dev1", "minor", undefined, "1.2.0"],

    ["1.0.0a0.dev1", "patch", undefined, "1.0.0"],
    ["1.1.1a0.dev1", "patch", undefined, "1.1.1"],
    ["1.1.1rc0.dev1", "patch", undefined, "1.1.1"],

    ["1.0.0a0.dev1", "premajor", undefined, "2.0.0a0"],
    ["1.1.1a0.dev1", "premajor", undefined, "2.0.0a0"],
    ["1.1.1rc0.dev1", "premajor", undefined, "2.0.0a0"],

    ["1.0.0a0.dev1", "preminor", undefined, "1.1.0a0"],
    ["1.1.1a0.dev1", "preminor", undefined, "1.2.0a0"],
    ["1.1.1rc0.dev1", "preminor", undefined, "1.2.0a0"],

    ["1.0.0a0.dev1", "prepatch", undefined, "1.0.1a0"],
    ["1.1.1a0.dev1", "prepatch", undefined, "1.1.2a0"],
    ["1.1.1rc0.dev1", "prepatch", undefined, "1.1.2a0"],

    ["1.0.0a0.dev1", "prerelease", undefined, "1.0.0a1"],
    ["1.0.0rc0.dev1", "prerelease", undefined, "1.0.0rc1"],

    // Development-releases of post-release versions.
    ["1.0.0.post1.dev1", "major", undefined, "2.0.0"],
    ["1.1.1.post1.dev1", "major", undefined, "2.0.0"],

    ["1.0.0.post1.dev1", "minor", undefined, "1.1.0"],
    ["1.1.1.post1.dev1", "minor", undefined, "1.2.0"],

    ["1.0.0.post1.dev1", "patch", undefined, "1.0.1"],
    ["1.1.1.post1.dev1", "patch", undefined, "1.1.2"],

    ["1.0.0.post1.dev1", "premajor", undefined, "2.0.0a0"],
    ["1.1.1.post1.dev1", "premajor", undefined, "2.0.0a0"],

    ["1.0.0.post1.dev1", "preminor", undefined, "1.1.0a0"],
    ["1.1.1.post1.dev1", "preminor", undefined, "1.2.0a0"],

    ["1.0.0.post1.dev1", "prepatch", undefined, "1.0.1a0"],
    ["1.1.1.post1.dev1", "prepatch", undefined, "1.1.2a0"],

    ["1.0.0.post1.dev1", "prerelease", undefined, "1.0.1a0"],

    // Development-releases of pre-and-post-release versions.
    ["1.0.0a0.post1.dev1", "major", undefined, "1.0.0"],
    ["1.1.1a0.post1.dev1", "major", undefined, "2.0.0"],
    ["1.1.1rc0.post1.dev1", "major", undefined, "2.0.0"],

    ["1.0.0a0.post1.dev1", "minor", undefined, "1.0.0"],
    ["1.1.1a0.post1.dev1", "minor", undefined, "1.2.0"],
    ["1.1.1rc0.post1.dev1", "minor", undefined, "1.2.0"],

    ["1.0.0a0.post1.dev1", "patch", undefined, "1.0.0"],
    ["1.1.1a0.post1.dev1", "patch", undefined, "1.1.1"],
    ["1.1.1rc0.post1.dev1", "patch", undefined, "1.1.1"],

    ["1.0.0a0.post1.dev1", "premajor", undefined, "2.0.0a0"],
    ["1.1.1a0.post1.dev1", "premajor", undefined, "2.0.0a0"],
    ["1.1.1rc0.post1.dev1", "premajor", undefined, "2.0.0a0"],

    ["1.0.0a0.post1.dev1", "preminor", undefined, "1.1.0a0"],
    ["1.1.1a0.post1.dev1", "preminor", undefined, "1.2.0a0"],
    ["1.1.1rc0.post1.dev1", "preminor", undefined, "1.2.0a0"],

    ["1.0.0a0.post1.dev1", "prepatch", undefined, "1.0.1a0"],
    ["1.1.1a0.post1.dev1", "prepatch", undefined, "1.1.2a0"],
    ["1.1.1rc0.post1.dev1", "prepatch", undefined, "1.1.2a0"],

    ["1.0.0a0.post1.dev1", "prerelease", undefined, "1.0.0a1"],
    ["1.0.0b0.post1.dev1", "prerelease", undefined, "1.0.0b1"],
    ["1.0.0rc0.post1.dev1", "prerelease", undefined, "1.0.0rc1"],
  ];

  testCases.forEach((testCase) =>
    it(`handles incrementing ${testCase[0]} using ${testCase[1]} to ${testCase[3]}`, () =>
      expect(inc(testCase[0], testCase[1], testCase[2])).toBe(testCase[3]))
  );

  testCases.forEach((testCase) => {
    const epochTestCase = testCase;
    epochTestCase[0] = `1!${epochTestCase[0]}`;
    epochTestCase[3] = `1!${epochTestCase[3]}`;
    it(`handles incrementing ${epochTestCase[0]} using ${epochTestCase[1]} to ${epochTestCase[3]}`, () =>
      expect(inc(epochTestCase[0], epochTestCase[1], epochTestCase[2])).toBe(
        epochTestCase[3]
      ));
  });

  // Invalid inputs.
  const invalidCases = [
    ["not_valid", "major", undefined, null],
    ["1.0.0", "invalid_release", undefined, null],

    [`0.0.0`, `premajor`, `foo`, null],
    [`0.0.0`, `premajor`, 1, null],
    [`1.0.0a0`, `premajor`, `bar`, null],
  ];

  invalidCases.forEach((testCase) =>
    it(`handles incrementing ${testCase[0]} using ${testCase[1]} to ${testCase[3]}`, () =>
      expect(inc(testCase[0], testCase[1], testCase[2])).toBe(testCase[3]))
  );
});
