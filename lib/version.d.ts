import type { VersionFunctionType, parsed } from "./shared";

export const VERSION_PATTERN: string;
export function valid(fn: VersionFunctionType): string | null;
export function clean(fn: VersionFunctionType): string | null;
export function stringify(fn: VersionFunctionType): string | null;
export function parse(fn: VersionFunctionType): parsed | null;
export function explain(fn: VersionFunctionType): parsed | null;
