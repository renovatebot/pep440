import type {
  OperatorFunctionType,
  parsed,
  SemanticFunctionType,
  VersionFunctionType,
} from "./lib/shared";

export function valid(fn: VersionFunctionType): string | null;
export function clean(fn: VersionFunctionType): string | null;
export function explain(fn: VersionFunctionType): parsed | null;

//operator
export function compare(fn: OperatorFunctionType): number;
export function rcompare(fn: OperatorFunctionType): number;
export function gt(fn: OperatorFunctionType): boolean;
export function eq(fn: OperatorFunctionType): boolean;
export function lt(fn: OperatorFunctionType): boolean;
export function ge(fn: OperatorFunctionType): boolean;
export function nq(fn: OperatorFunctionType): boolean;
export function gte(fn: OperatorFunctionType): boolean;
export function neq(fn: OperatorFunctionType): boolean;
export function le(fn: OperatorFunctionType): boolean;
export function lte(fn: OperatorFunctionType): boolean;
export function arbitrary(fn: OperatorFunctionType): boolean;

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
export function major(fn: SemanticFunctionType): number;
export function minor(fn: SemanticFunctionType): number;
export function patch(fn: SemanticFunctionType): number;
export function inc(fn: SemanticFunctionType): string | null;
