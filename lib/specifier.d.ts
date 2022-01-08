import type { parsed, Range } from "./shared";

export declare const RANGE_PATTERN: string;

/*
   parse function takes a string and returns an object that has the values of both th ebelow interfaces combined
  interface Range {
    operator: string;
    prefix: string;
    version: string;
  }
  * interface parsed{
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
 still I have used interface Range as its return type cause it is being used in the file
 lib/versioning/pep440/range.ts as so L52
  */
export declare function parse(ranges: string): Range[]; // have doubts regarding this which need to be discussed
export declare function filter(versions: string[], range: string): string[];
export declare function satisfies(version: string, specifier: string): boolean;
export declare function validRange(specifier: string): boolean;
export declare function maxSatisfying(
  version: string,
  specifier: string,
  options: parsed
): string | null;
export declare function minSatisfying(
  version: string,
  specifier: string,
  options: parsed
): string | null;
