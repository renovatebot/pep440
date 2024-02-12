const { cross } = require('./fixture');

const {
  parse,
  validRange,
  satisfies,
  maxSatisfying,
  minSatisfying,
  filter,
} = require('../lib/specifier');

const SPECIFIERS = [
  '~=2.0',
  '==2.1.*',
  '==2.1.0.3',
  '!=2.2.*',
  '!=2.2.0.5',
  '<=5',
  '>=7.9a1',
  '<1.0.dev1',
  '>2.0.post1',
  '===lolwat',
];

const INVALID_SPECIFIERS = [
  // Operator-less specifier
  '2.0',

  // Invalid operator
  '=>2.0',

  // Version-less specifier
  '==',

  // Local segment on operators which don't support them
  '~=1.0+5',
  '>=1.0+deadbeef',
  '<=1.0+abc123',
  '>1.0+watwat',
  '<1.0+1.0',

  // Prefix matching on operators which don't support them
  // "~=1.0.*",
  '>=1.0.*',
  '<=1.0.*',
  '>1.0.*',
  '<1.0.*',

  // Combination of local and prefix matching on operators which do
  // support one or the other
  '==1.0.*+5',
  '!=1.0.*+deadbeef',

  // Prefix matching cannot be used inside of a local version
  '==1.0+5.*',
  '!=1.0+deadbeef.*',

  // Prefix matching must appear at the end
  '==1.0.*.5',

  // Compatible operator requires 2 digits in the release operator
  '~=1',

  // Cannot use a prefix matching after a .devN version
  '==1.0.dev1.*',
  '!=1.0.dev1.*',
];

describe('parse(range)', () => {
  SPECIFIERS.forEach((range) => {
    it('returns parsed for ' + JSON.stringify(range), () => {
      expect(parse(range)).not.toBeNull();
      expect(validRange(range)).toBe(true);
    });
  });
  INVALID_SPECIFIERS.forEach((range) => {
    it('returns null for ' + JSON.stringify(range), () => {
      expect(parse(range)).toBeNull();
      expect(validRange(range)).toBe(false);
    });
  });

  [
    // Various development release incarnations
    '1.0dev',
    '1.0.dev',
    '1.0dev1',
    '1.0dev',
    '1.0-dev',
    '1.0-dev1',
    '1.0DEV',
    '1.0.DEV',
    '1.0DEV1',
    '1.0DEV',
    '1.0.DEV1',
    '1.0-DEV',
    '1.0-DEV1',

    // Various alpha incarnations
    '1.0a',
    '1.0.a',
    '1.0.a1',
    '1.0-a',
    '1.0-a1',
    '1.0alpha',
    '1.0.alpha',
    '1.0.alpha1',
    '1.0-alpha',
    '1.0-alpha1',
    '1.0A',
    '1.0.A',
    '1.0.A1',
    '1.0-A',
    '1.0-A1',
    '1.0ALPHA',
    '1.0.ALPHA',
    '1.0.ALPHA1',
    '1.0-ALPHA',
    '1.0-ALPHA1',

    // Various beta incarnations
    '1.0b',
    '1.0.b',
    '1.0.b1',
    '1.0-b',
    '1.0-b1',
    '1.0beta',
    '1.0.beta',
    '1.0.beta1',
    '1.0-beta',
    '1.0-beta1',
    '1.0B',
    '1.0.B',
    '1.0.B1',
    '1.0-B',
    '1.0-B1',
    '1.0BETA',
    '1.0.BETA',
    '1.0.BETA1',
    '1.0-BETA',
    '1.0-BETA1',

    // Various release candidate incarnations
    '1.0c',
    '1.0.c',
    '1.0.c1',
    '1.0-c',
    '1.0-c1',
    '1.0rc',
    '1.0.rc',
    '1.0.rc1',
    '1.0-rc',
    '1.0-rc1',
    '1.0C',
    '1.0.C',
    '1.0.C1',
    '1.0-C',
    '1.0-C1',
    '1.0RC',
    '1.0.RC',
    '1.0.RC1',
    '1.0-RC',
    '1.0-RC1',

    // Various post release incarnations
    '1.0post',
    '1.0.post',
    '1.0post1',
    '1.0post',
    '1.0-post',
    '1.0-post1',
    '1.0POST',
    '1.0.POST',
    '1.0POST1',
    '1.0POST',
    '1.0.POST1',
    '1.0-POST',
    '1.0-POST1',
    '1.0-5',

    // Local version case insensitivity
    '1.0+AbC',

    // Integer Normalization
    '1.01',
    '1.0a05',
    '1.0b07',
    '1.0c056',
    '1.0rc09',
    '1.0.post000',
    '1.1.dev09000',
    '00!1.2',
    '0100!0.0',

    // Various other normalizations
    'v1.0',
    '  \r \f \v v1.0\t\n',
  ].forEach((version) => {
    it('normalizes ' + JSON.stringify(version), () => {
      const ops = ['==', '!='];
      if (!version.includes('+')) {
        ops.push('~=', '<=', '>=', '<', '>');
      }
      ops.forEach((op) => {
        expect(parse(op + version)).not.toBeNull();
      });
    });
  });
});

describe('parse(range).length', () => {
  [
    ['', 0],
    ['==2.0', 1],
    ['>=2.0', 1],
    ['>=2.0,<3', 2],
    ['>=2.0,<3,==2.4', 3],
  ].forEach(([range, length]) => {
    it('returns should be ' + length + ' for ' + JSON.stringify(range), () => {
      expect(parse(range)).toHaveLength(length);
    });
  });
});

describe('satisfies(version, specifier)', () => {
  [
    ...[
      // Test the equality operation
      ['2.0', '==2'],
      ['2.0', '==2.0'],
      ['2.0', '==2.0.0'],
      ['2.0+deadbeef', '==2'],
      ['2.0+deadbeef', '==2.0'],
      ['2.0+deadbeef', '==2.0.0'],
      ['2.0+deadbeef', '==2+deadbeef'],
      ['2.0+deadbeef', '==2.0+deadbeef'],
      ['2.0+deadbeef', '==2.0.0+deadbeef'],
      ['2.0+deadbeef.0', '==2.0.0+deadbeef.00'],

      // Test the equality operation with a prefix
      ['2.dev1', '==2.*'],
      ['2a1', '==2.*'],
      ['2a1.post1', '==2.*'],
      ['2b1', '==2.*'],
      ['2b1.dev1', '==2.*'],
      ['2c1', '==2.*'],
      ['2c1.post1.dev1', '==2.*'],
      ['2rc1', '==2.*'],
      ['2', '==2.*'],
      ['2.0', '==2.*'],
      ['2.0.0', '==2.*'],
      ['2.0.post1', '==2.0.post1.*'],
      ['2.0.post1.dev1', '==2.0.post1.*'],
      ['2.1+local.version', '==2.1.*'],

      // Test the in-equality operation
      ['2.1', '!=2'],
      ['2.1', '!=2.0'],
      ['2.0.1', '!=2'],
      ['2.0.1', '!=2.0'],
      ['2.0.1', '!=2.0.0'],
      ['2.0', '!=2.0+deadbeef'],

      // Test the in-equality operation with a prefix
      ['2.0', '!=3.*'],
      ['2.1', '!=2.0.*'],

      // Test the greater than equal operation
      ['2.0', '>=2'],
      ['2.0', '>=2.0'],
      ['2.0', '>=2.0.0'],
      ['2.0.post1', '>=2'],
      ['2.0.post1.dev1', '>=2'],
      ['3', '>=2'],

      // Test the less than equal operation
      ['2.0', '<=2'],
      ['2.0', '<=2.0'],
      ['2.0', '<=2.0.0'],
      ['2.0.dev1', '<=2'],
      ['2.0a1', '<=2'],
      ['2.0a1.dev1', '<=2'],
      ['2.0b1', '<=2'],
      ['2.0b1.post1', '<=2'],
      ['2.0c1', '<=2'],
      ['2.0c1.post1.dev1', '<=2'],
      ['2.0rc1', '<=2'],
      ['1', '<=2'],

      // Test the greater than operation
      ['3', '>2'],
      ['2.1', '>2.0'],
      ['2.0.1', '>2'],
      ['2.1.post1', '>2'],
      ['2.1+local.version', '>2'],

      // Test the less than operation
      ['1', '<2'],
      ['2.0', '<2.1'],
      ['2.0.dev0', '<2.1'],

      // Test the compatibility operation
      ['1', '~=1.0'],
      ['1.0.1', '~=1.0'],
      ['1.1', '~=1.0'],
      ['1.9999999', '~=1.0'],

      // Test that epochs are handled sanely
      ['2!1.0', '~=2!1.0'],
      ['2!1.0', '==2!1.*'],
      ['2!1.0', '==2!1.0'],
      ['2!1.0', '!=1.0'],
      ['1.0', '!=2!1.0'],
      ['1.0', '<=2!0.1'],
      ['2!1.0', '>=2.0'],
      ['1.0', '<2!0.1'],
      ['2!1.0', '>2.0'],
      ['3', '!=3.1.*'],
      ['3.10', '!=3.1.*'],
      ['3.10.0', '!=3.1.*'],
      ['3.10', '==3.10.*'],
      ['3.10.0', '==3.10.*'],
      ['0.1.dev123+deadbeef', '==0.1.dev123+deadbeef'],

      // Test some normalization rules
      ['2.0.5', '>2.0dev'],
    ].map(([version, spec]) => [version, spec, true]),
    ...[
      // Test the equality operation
      ['2.1', '==2'],
      ['2.1', '==2.0'],
      ['2.1', '==2.0.0'],
      ['2.0', '==2.0+deadbeef'],

      // Test the equality operation with a prefix
      ['2.0', '==3.*'],
      ['2.1', '==2.0.*'],

      // Test the in-equality operation
      ['2.0', '!=2'],
      ['2.0', '!=2.0'],
      ['2.0', '!=2.0.0'],
      ['2.0+deadbeef', '!=2'],
      ['2.0+deadbeef', '!=2.0'],
      ['2.0+deadbeef', '!=2.0.0'],
      ['2.0+deadbeef', '!=2+deadbeef'],
      ['2.0+deadbeef', '!=2.0+deadbeef'],
      ['2.0+deadbeef', '!=2.0.0+deadbeef'],
      ['2.0+deadbeef.0', '!=2.0.0+deadbeef.00'],

      // Test the in-equality operation with a prefix
      ['2.dev1', '!=2.*'],
      ['2a1', '!=2.*'],
      ['2a1.post1', '!=2.*'],
      ['2b1', '!=2.*'],
      ['2b1.dev1', '!=2.*'],
      ['2c1', '!=2.*'],
      ['2c1.post1.dev1', '!=2.*'],
      ['2rc1', '!=2.*'],
      ['2', '!=2.*'],
      ['2.0', '!=2.*'],
      ['2.0.0', '!=2.*'],
      ['2.0.post1', '!=2.0.post1.*'],
      ['2.0.post1.dev1', '!=2.0.post1.*'],

      // Test the greater than equal operation
      ['2.0.dev1', '>=2'],
      ['2.0a1', '>=2'],
      ['2.0a1.dev1', '>=2'],
      ['2.0b1', '>=2'],
      ['2.0b1.post1', '>=2'],
      ['2.0c1', '>=2'],
      ['2.0c1.post1.dev1', '>=2'],
      ['2.0rc1', '>=2'],
      ['1', '>=2'],

      // Test the less than equal operation
      ['2.0.post1', '<=2'],
      ['2.0.post1.dev1', '<=2'],
      ['3', '<=2'],

      // Test the greater than operation
      ['1', '>2'],
      ['2.0.dev1', '>2'],
      ['2.0a1', '>2'],
      ['2.0a1.post1', '>2'],
      ['2.0b1', '>2'],
      ['2.0b1.dev1', '>2'],
      ['2.0c1', '>2'],
      ['2.0c1.post1.dev1', '>2'],
      ['2.0rc1', '>2'],
      ['2.0', '>2'],
      ['2.0.post1', '>2'],
      ['2.0.post1.dev1', '>2'],
      ['2.0+local.version', '>2'],

      // Test the less than operation
      ['2.0.dev1', '<2'],
      ['2.0a1', '<2'],
      ['2.0a1.post1', '<2'],
      ['2.0b1', '<2'],
      ['2.0b2.dev1', '<2'],
      ['2.0c1', '<2'],
      ['2.0c1.post1.dev1', '<2'],
      ['2.0rc1', '<2'],
      ['2.0', '<2'],
      ['2.post1', '<2'],
      ['2.post1.dev1', '<2'],
      ['3', '<2'],
      ['3', '==3.1.*'],
      ['3.10', '==3.1.*'],
      ['3.10.0', '==3.1.*'],
      ['3.10.0', '!=3.10.*'],

      // Test the compatibility operation
      ['2.0', '~=1.0'],
      ['1.1.0', '~=1.0.0'],
      ['1.1.post1', '~=1.0.0'],
      ['0.1.dev123+deadbeef', '~=0.1.dev123+deadbeef'],

      // Test that epochs are handled sanely
      ['1.0', '~=2!1.0'],
      ['2!1.0', '~=1.0'],
      ['2!1.0', '==1.0'],
      ['1.0', '==2!1.0'],
      ['2!1.0', '==1.*'],
      ['1.0', '==2!1.*'],
      ['2!1.0', '!=2!1.0'],
    ].map(([version, spec]) => [version, spec, false]),

    ...[
      // Test identity comparison by itself
      ['lolwat', '===lolwat', true],
      ['Lolwat', '===lolwat', true],
      ['1.0', '===1.0', true],
      ['nope', '===lolwat', false],
      ['1.0.0', '===1.0', false],
      ['1.0.dev0', '===1.0.dev0', true],
    ],
  ].forEach(([version, spec, expected]) => {
    it(`returns ${expected} for ${JSON.stringify(
      version,
    )} satisfies ${JSON.stringify(spec)}`, () => {
      expect(satisfies(version, spec, { prereleases: true })).toBe(expected);
    });
  });
});

describe('satisfies([versions], specifier, {prereleases})', () => {
  cross(
    [
      ['>=1.0', '2.0.dev1', false],
      ['>=2.0.dev1', '2.0a1', true],
      ['==2.0.*', '2.0a1.dev1', false],
      ['==2.0a1.*', '2.0a1.dev1', true],
      ['<=2.0', '1.0.dev1', false],
      ['<=2.0.dev1', '1.0a1', true],
    ],
    ([spec, version, result]) => [
      [spec, version, undefined, result],
      [spec, version, !result, !result],
    ],
  ).forEach(([spec, version, prereleases, expected]) => {
    it(`returns ${expected} for ${JSON.stringify(
      version,
    )} satisfies ${JSON.stringify(
      spec,
    )} when prereleases=${prereleases}`, () => {
      expect(satisfies(version, spec, { prereleases })).toBe(expected);
    });
  });
});

describe('filter([versions], specifier, {prereleases})', () => {
  [
    // General test of the filter method
    ['', undefined, ['1.0', '2.0a1'], ['1.0']],
    ['>=1.0.dev1', undefined, ['1.0', '2.0a1'], ['1.0', '2.0a1']],
    ['', undefined, ['1.0a1'], ['1.0a1']],
    ['', undefined, ['1.0', '2.0'], ['1.0', '2.0']],
    ['', undefined, ['2.0dog', '1.0'], ['1.0']],

    // Test overriding with the prereleases parameter on filter
    ['', false, ['1.0a1'], []],
    ['>=1.0.dev1', false, ['1.0', '2.0a1'], ['1.0']],
    ['', true, ['1.0', '2.0a1'], ['1.0', '2.0a1']],

    // Test overriding with the overall specifier
    ['', true, ['1.0', '2.0a1'], ['1.0', '2.0a1']],
    ['', false, ['1.0', '2.0a1'], ['1.0']],
    ['>=1.0.dev1', true, ['1.0', '2.0a1'], ['1.0', '2.0a1']],
    ['>=1.0.dev1', false, ['1.0', '2.0a1'], ['1.0']],
    ['', true, ['1.0a1'], ['1.0a1']],
    ['', false, ['1.0a1'], []],

    // Those are not of the original python implimentation
    // but were required for full coverage
    ['wrong range', false, ['1.0'], []],
  ].forEach(([spec, prereleases, versions, expected]) => {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(
      versions,
    )} filter ${JSON.stringify(spec)} when prereleases=${prereleases}`, () => {
      const args = [versions, spec, { prereleases }];
      const filtered = filter(...args);
      expect(filtered).toEqual(expected);
      expect(minSatisfying(...args)).toEqual(filtered[0] || null);
      expect(maxSatisfying(...args)).toEqual(
        filtered[filtered.length - 1] || null,
      );
    });
  });
});

it('filter works without options', () => {
  expect(filter([], '')).toEqual([]);
});
