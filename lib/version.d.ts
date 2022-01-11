import type { Pep440Version } from "./shared";

export const VERSION_PATTERN: string;
export function clean(version: string): string | null;
export function explain(version: string): Pep440Version | null;
export function parse(version: string): Pep440Version | null;
export function stringify(version: string): string | null;
export function valid(version: string): string | null;
