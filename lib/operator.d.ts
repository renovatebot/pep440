import type { OperatorFunctionType } from "./shared";

export function compare(fn: OperatorFunctionType): number;
export function rcompare(fn: OperatorFunctionType): number;
export function gt(fn: OperatorFunctionType): boolean;
export function eq(fn: OperatorFunctionType): boolean;
export function lt(fn: OperatorFunctionType): boolean;
export function ge(fn: OperatorFunctionType): boolean;
export function nq(fn: OperatorFunctionType): boolean;
export function le(fn: OperatorFunctionType): boolean;
export function arbitrary(fn: OperatorFunctionType): boolean;
