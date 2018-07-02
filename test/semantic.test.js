

const {
  major,
  minor,
  patch,
  inc,
} = require('../');


describe('major(version)', () => {
  it('returns correct value', () => {
    expect(major('1.2.3')).toBe(1);
  });
  it('handles epoch', () => {
    expect(major('25!1.2.3')).toBe(1);
  });
  it('throws when version invalid', () => {
    expect(() => major('not_version')).toThrowError(TypeError);
  });
});

describe('minor(version)', () => {
  it('returns correct value', () => {
    expect(minor('1.2.3')).toBe(2);
  });
  it('pads zeros', () => {
    expect(minor('1')).toBe(0);
  });
  it('throws when version invalid', () => {
    expect(() => minor('not_version')).toThrowError(TypeError);
  });
});

describe('patch(version)', () => {
  it('returns correct value', () => {
    expect(patch('1.2.3')).toBe(3);
  });
  it('pads zeros', () => {
    expect(patch('1.2')).toBe(0);
  });
  it('throws when version invalid', () => {
    expect(() => patch('not_version')).toThrowError(TypeError);
  });
});

describe('inc(version, release)', () => {
  const testCases = [
    // [ existing version, release type (`major`, `minor`, `patch`), identifier (`a`, `b`, `rc`, etc.), expected result ]

    // Semantic Version numbers only.
    ['0.0.0', 'major', undefined, '1.0.0'],
    ['1.0.0', 'major', undefined, '2.0.0'],
    ['1.0.1', 'major', undefined, '2.0.0'],
    ['1.1.0', 'major', undefined, '2.0.0'],
    ['0.0.0', 'minor', undefined, '0.1.0'],
    ['1.0.0', 'minor', undefined, '1.1.0'],
    ['1.0.1', 'minor', undefined, '1.1.0'],
    ['1.1.0', 'minor', undefined, '1.2.0'],
    ['0.0.0', 'patch', undefined, '0.0.1'],
    ['1.0.0', 'patch', undefined, '1.0.1'],
    ['1.0.1', 'patch', undefined, '1.0.2'],
    ['1.1.0', 'patch', undefined, '1.1.1'],

    // Extra release segments, as allowed by PEP440.
    ['1.1.1.1', 'major', undefined, '2.0.0.0'],
    ['1.1.1.1', 'minor', undefined, '1.2.0.0'],
    ['1.1.1.1', 'patch', undefined, '1.1.2.0'],

    // Without padding, as allowed by PEP440.
    ['1', 'major', undefined, '2'],
    ['1.0', 'major', undefined, '2.0'],
    ['1', 'minor', undefined, '1.1'],
    ['1.0', 'minor', undefined, '1.1'],
    ['1', 'patch', undefined, '1.0.1'],
    ['1.0', 'patch', undefined, '1.0.1'],

    // Pre-release versions.
    ['1.0.0a1', 'major', undefined, '1.0.0'],
    ['1.1.1a1', 'major', undefined, '2.0.0'],
    ['1.1.1rc1', 'major', undefined, '2.0.0'],
    ['1.0.0a1', 'minor', undefined, '1.0.0'],
    ['1.1.1a1', 'minor', undefined, '1.2.0'],
    ['1.1.1rc1', 'minor', undefined, '1.2.0'],
    ['1.0.0a1', 'patch', undefined, '1.0.0'],
    ['1.1.1a1', 'patch', undefined, '1.1.1'],
    ['1.1.1rc1', 'patch', undefined, '1.1.1'],

    // Post-release versions.
    ['1.0.0.post1', 'major', undefined, '2.0.0'],
    ['1.1.1.post1', 'major', undefined, '2.0.0'],
    ['1.0.0.post1', 'minor', undefined, '1.1.0'],
    ['1.1.1.post1', 'minor', undefined, '1.2.0'],
    ['1.0.0.post1', 'patch', undefined, '1.0.1'],
    ['1.1.1.post1', 'patch', undefined, '1.1.2'],

    // Post-releases of pre-release versions.
    ['1.0.0a1.post1', 'major', undefined, '1.0.0'],
    ['1.1.1a1.post1', 'major', undefined, '2.0.0'],
    ['1.1.1rc1.post1', 'major', undefined, '2.0.0'],
    ['1.0.0a1.post1', 'minor', undefined, '1.0.0'],
    ['1.1.1a1.post1', 'minor', undefined, '1.2.0'],
    ['1.1.1rc1.post1', 'minor', undefined, '1.2.0'],
    ['1.0.0a1.post1', 'patch', undefined, '1.0.0'],
    ['1.1.1a1.post1', 'patch', undefined, '1.1.1'],
    ['1.1.1rc1.post1', 'patch', undefined, '1.1.1'],

    // Development-release versions.
    ['1.0.0.dev1', 'major', undefined, '2.0.0'],
    ['1.1.1.dev1', 'major', undefined, '2.0.0'],
    ['1.0.0.dev1', 'minor', undefined, '1.1.0'],
    ['1.1.1.dev1', 'minor', undefined, '1.2.0'],
    ['1.0.0.dev1', 'patch', undefined, '1.0.1'],
    ['1.1.1.dev1', 'patch', undefined, '1.1.2'],

    // Development-releases of pre-release versions.
    ['1.0.0a1.dev1', 'major', undefined, '1.0.0'],
    ['1.1.1a1.dev1', 'major', undefined, '2.0.0'],
    ['1.1.1rc1.dev1', 'major', undefined, '2.0.0'],
    ['1.0.0a1.dev1', 'minor', undefined, '1.0.0'],
    ['1.1.1a1.dev1', 'minor', undefined, '1.2.0'],
    ['1.1.1rc1.dev1', 'minor', undefined, '1.2.0'],
    ['1.0.0a1.dev1', 'patch', undefined, '1.0.0'],
    ['1.1.1a1.dev1', 'patch', undefined, '1.1.1'],
    ['1.1.1rc1.dev1', 'patch', undefined, '1.1.1'],

    // Development-releases of post-release versions.
    ['1.0.0.post1.dev1', 'major', undefined, '2.0.0'],
    ['1.1.1.post1.dev1', 'major', undefined, '2.0.0'],
    ['1.0.0.post1.dev1', 'minor', undefined, '1.1.0'],
    ['1.1.1.post1.dev1', 'minor', undefined, '1.2.0'],
    ['1.0.0.post1.dev1', 'patch', undefined, '1.0.1'],
    ['1.1.1.post1.dev1', 'patch', undefined, '1.1.2'],

    // Development-releases of pre-and-post-release versions.
    ['1.0.0a1.post1.dev1', 'major', undefined, '1.0.0'],
    ['1.1.1a1.post1.dev1', 'major', undefined, '2.0.0'],
    ['1.1.1rc1.post1.dev1', 'major', undefined, '2.0.0'],
    ['1.0.0a1.post1.dev1', 'minor', undefined, '1.0.0'],
    ['1.1.1a1.post1.dev1', 'minor', undefined, '1.2.0'],
    ['1.1.1rc1.post1.dev1', 'minor', undefined, '1.2.0'],
    ['1.0.0a1.post1.dev1', 'patch', undefined, '1.0.0'],
    ['1.1.1a1.post1.dev1', 'patch', undefined, '1.1.1'],
    ['1.1.1rc1.post1.dev1', 'patch', undefined, '1.1.1'],
  ];

  testCases.forEach(testCase =>
    it(`handles incrementing ${testCase[0]} using ${testCase[1]} to ${testCase[3]}`, () =>
    expect(inc(testCase[0], testCase[1], testCase[2])).toBe(testCase[3])));

  testCases.forEach(testCase => {
    const epochTestCase = testCase;
    epochTestCase[0] = `1!${epochTestCase[0]}`;
    epochTestCase[3] = `1!${epochTestCase[3]}`;
    it(`handles incrementing ${epochTestCase[0]} using ${epochTestCase[1]} to ${epochTestCase[3]}`, () =>
    expect(inc(epochTestCase[0], epochTestCase[1], epochTestCase[2])).toBe(epochTestCase[3]));
  });

  const invalidTestCases = [
    // [ existing version, release type, identifier (`a`, `b`, `rc`, etc.), expected result ]

    // Invalid inputs.
    ['not_valid', 'major', undefined, null],
    ['1.0.0', 'invalid_release', undefined, null],
  ];

  invalidTestCases.forEach(testCase =>
    it(`handles incrementing ${testCase[0]} using ${testCase[1]} to ${testCase[3]}`, () =>
    expect(inc(testCase[0], testCase[1], testCase[2])).toBe(testCase[3])));
});
