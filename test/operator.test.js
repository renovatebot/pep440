import * as operator from '../lib/operator.js';

import { VERSIONS, cross } from './fixture.js';

describe('compare(version, other)', () => {
  // Below we'll generate every possible combination of VERSIONS that
  // should be true/false for the given operator
  [
    ...cross(VERSIONS, (left, i) =>
      cross(VERSIONS.slice(i + 1), (right) => [
        [left, '<', right, true],
        [left, '>=', right, false],
      ]),
    ),

    ...cross(VERSIONS, (left, i) =>
      cross(VERSIONS.slice(i), (right) => [
        [left, '<=', right, true],
        [left, '>', right, false],
      ]),
    ),

    ...cross(VERSIONS, (version) => [
      [version, '==', version, true],
      [version, '!=', version, false],
    ]),

    ...cross(VERSIONS, (left) =>
      cross(
        VERSIONS.filter((right) => right !== left),
        (right) => [
          [left, '!=', right, true],
          [left, '==', right, false],
        ],
      ),
    ),

    ...cross(VERSIONS, (left, i) =>
      cross(VERSIONS.slice(0, i + 1), (right) => [
        [left, '>=', right, true],
        [left, '<', right, false],
      ]),
    ),

    ...cross(VERSIONS, (left, i) =>
      cross(VERSIONS.slice(0, i), (right) => [
        [left, '>', right, true],
        [left, '<=', right, false],
      ]),
    ),
  ].forEach(([left, op, right, expected]) => {
    it(`returns ${expected} for '${left}' ${op} '${right}'`, () => {
      // TODO: fix me?
      // eslint-disable-next-line import-x/namespace
      expect(operator[op](left, right)).toBe(expected);
    });
  });
});

describe('rcompare(version, other)', () => {
  [['1.0', '2.0', 1]].forEach(([left, right, expected]) => {
    it(`returns ${expected} for '${left}' '${right}'`, () => {
      expect(operator.rcompare(left, right)).toBe(expected);
    });
  });
});
