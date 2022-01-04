import {SemVer} from "semver";
export declare function  major(input: string | SemVer): number;
export declare function  minor(input: string | SemVer): number;
export declare function  patch(input: string | SemVer): number;
export declare function  inc(input: string | SemVer): string | null;
