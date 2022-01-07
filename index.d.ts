import {
  OperatorFunctionType,
  parsed,
  SemanticFunctionType,
  VersionFunctionType,
} from "./lib/shared";

export declare function valid(fn: VersionFunctionType): string | null;
export declare function clean(fn: VersionFunctionType): string | null;
export declare function explain(fn: VersionFunctionType): parsed | null;

//operator
export declare function compare(fn: OperatorFunctionType): number;
export declare function rcompare(fn: OperatorFunctionType): number;
export declare function gt(fn: OperatorFunctionType): boolean;
export declare function eq(fn: OperatorFunctionType): boolean;
export declare function lt(fn: OperatorFunctionType): boolean;
export declare function ge(fn: OperatorFunctionType): boolean;
export declare function nq(fn: OperatorFunctionType): boolean;
export declare function gte(fn: OperatorFunctionType): boolean;
export declare function neq(fn: OperatorFunctionType): boolean;
export declare function le(fn: OperatorFunctionType): boolean;
export declare function lte(fn: OperatorFunctionType): boolean;
export declare function arbitrary(fn: OperatorFunctionType): boolean;

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
export declare function major(fn: SemanticFunctionType): number;
export declare function minor(fn: SemanticFunctionType): number;
export declare function patch(fn: SemanticFunctionType): number;
export declare function inc(fn: SemanticFunctionType): string | null;
