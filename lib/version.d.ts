import type { VersionFunctionType, parsed } from "./shared";

export declare const VERSION_PATTERN: string;
export declare function valid(fn: VersionFunctionType): string | null;
export declare function clean(fn: VersionFunctionType): string | null;
export declare function stringify(fn: VersionFunctionType): string | null;
export declare function parse(fn: VersionFunctionType): parsed | null;
export declare function explain(fn: VersionFunctionType): parsed | null;
