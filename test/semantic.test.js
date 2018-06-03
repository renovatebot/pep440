

const {
  major,
  minor,
  patch,
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
