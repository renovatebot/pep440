import { compare, eq, ge, gt, le, lt, ne, rcompare } from './lib/operator.js';

import { inc, major, minor, patch } from './lib/semantic.js';

import {
  RANGE_PATTERN,
  filter,
  maxSatisfying,
  minSatisfying,
  satisfies,
  validRange,
} from './lib/specifier.js';
import { clean, explain, parse, valid } from './lib/version.js';

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
