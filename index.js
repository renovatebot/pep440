import { valid, clean, explain, parse } from './lib/version.js';

import { lt, le, eq, ne, ge, gt, compare, rcompare } from './lib/operator.js';

import {
  filter,
  maxSatisfying,
  minSatisfying,
  RANGE_PATTERN,
  satisfies,
  validRange,
} from './lib/specifier.js';

import { major, minor, patch, inc } from './lib/semantic.js';

export {
  // version
  valid,
  clean,
  explain,
  parse,

  // operator
  lt,
  le,
  le as lte,
  eq,
  ne,
  ne as neq,
  ge,
  ge as gte,
  gt,
  compare,
  rcompare,

  // range
  filter,
  maxSatisfying,
  minSatisfying,
  RANGE_PATTERN,
  satisfies,
  validRange,

  // semantic
  major,
  minor,
  patch,
  inc,
};
