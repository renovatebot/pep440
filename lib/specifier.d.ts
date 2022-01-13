import type { Pep440Version, Pep440Constraint } from "./shared";

export const RANGE_PATTERN: string;

export function filter(versions: string[], range: string): string[];
export function maxSatisfying(
  versions: string[],
  specifier: string,
  options: Pep440Version
): string | null;
export function minSatisfying(
  versions: string[],
  specifier: string,
  options: Pep440Version
): string | null;
export function parse(ranges: string): Pep440Constraint[]; // have doubts regarding this which need to be discussed
export function satisfies(version: string, specifier: string): boolean;
export function validRange(specifier: string): boolean;
