import { parsed } from "./lib/shared";
import type { SemVer } from "semver";
import type { RANGE_PATTERN } from "./lib/specifier";

export type { RANGE_PATTERN };
export function valid(version: string): string | null;
export function clean(version: string): string | null;
export function explain(version: string): parsed | null;

//operator
export function compare(version: string, other: string): number;
export function rcompare(version: string, other: string): number;
export function gt(version: string, other: string): boolean;
export function eq(version: string, other: string): boolean;
export function lt(version: string, other: string): boolean;
export function ge(version: string, other: string): boolean;
export function nq(version: string, other: string): boolean;
export function gte(version: string, other: string): boolean;
export function neq(version: string, other: string): boolean;
export function le(version: string, other: string): boolean;
export function lte(version: string, other: string): boolean;
export function arbitrary(version: string, other: string): boolean;

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
export function major(input: string | SemVer): number;
export function minor(input: string | SemVer): number;
export function patch(input: string | SemVer): number;
export function inc(input: string | SemVer): string | null;
