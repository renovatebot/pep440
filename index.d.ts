import { SemVer } from "semver";
interface parsed {
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
export declare function valid(version: string): string | null;
export declare function clean(version: string): string | null;
export declare function explain(version: string): parsed | null;

//operator
export declare function compare(version: string, other: string): number;
export declare function rcompare(version: string, other: string): number;
export declare function gt(version: string, other: string): boolean;
export declare function eq(version: string, other: string): boolean;
export declare function lt(version: string, other: string): boolean;
export declare function ge(version: string, other: string): boolean;
export declare function nq(version: string, other: string): boolean;
export declare function gte(version: string, other: string): boolean;
export declare function neq(version: string, other: string): boolean;
export declare function le(version: string, other: string): boolean;
export declare function lte(version: string, other: string): boolean;
export declare function arbitrary(version: string, other: string): boolean;

//range
export function satisfies(version: string, specifier: string): boolean;
export function validRange(specifier: string): boolean;
export function maxSatisfying(
  version: string,
  specifier: string,
  options: parsed
): string | null;
export function minSatisfying(
  version: string,
  specifier: string,
  options: parsed
): string | null;

//semantic
export declare function major(input: string | SemVer): number;
export declare function minor(input: string | SemVer): number;
export declare function patch(input: string | SemVer): number;
export declare function inc(input: string | SemVer): string | null;
