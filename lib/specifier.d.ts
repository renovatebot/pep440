import type { Pep440Version, Pep440Constraint } from "./shared";

export const RANGE_PATTERN: string;

/*
   parse function takes a string and returns an object that has the values of both th ebelow interfaces combined
  interface Pep440Constraint {
    operator: string;
    prefix: string;
    version: string;
  }
  * interface Pep440Version{
  public: string;
  base_version: string;
  is_prerelease: boolean;
  is_devrelease: boolean;
  is_postrelease: boolean;
  epoch: number;
  release: number[];
  pre: (string | number)[];
  post: (string | number)[];
  dev: (string | number)[];
  local: string | null;
}
 still I have used interface Pep440Constraint as its return type cause it is being used in the file
 lib/versioning/pep440/range.ts as so L52
  */
export function filter(versions: string[], range: string): string[];
export function maxSatisfying(
  version: string,
  specifier: string,
  options: Pep440Version
): string | null;
export function minSatisfying(
  version: string,
  specifier: string,
  options: Pep440Version
): string | null;
export function parse(ranges: string): Pep440Constraint[]; // have doubts regarding this which need to be discussed
export function satisfies(version: string, specifier: string): boolean;
export function validRange(specifier: string): boolean;
