import type { SemVer } from "semver";

export function major(input: string | SemVer): number;
export function minor(input: string | SemVer): number;
export function patch(input: string | SemVer): number;
export function inc(input: string | SemVer): string | null;
