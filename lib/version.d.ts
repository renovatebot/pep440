import type { parsed } from "./shared";

export const VERSION_PATTERN: string;
export function valid(version: string): string | null;
export function clean(version: string): string | null;
export function stringify(version: string): string | null;
export function parse(version: string): parsed | null;
export function explain(version: string): parsed | null;