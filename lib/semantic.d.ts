import type { SemanticFunctionType } from "./shared";

export function major(fn: SemanticFunctionType): number;
export function minor(fn: SemanticFunctionType): number;
export function patch(fn: SemanticFunctionType): number;
export function inc(fn: SemanticFunctionType): string | null;
