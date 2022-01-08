import type { SemVer } from "semver";
export interface parsed {
  public: string;
  base_version: string;
  is_prerelease: boolean;
  is_devrelease: boolean;
  is_postrelease: boolean;
  epoch: number;
  release: number[];
  pre: (string | number)[];
  post: (string | number)[];
  dev: (string | number)[];
  local: string | null;
}
export interface Range {
  operator: string;
  prefix: string;
  version: string;
}
export type VersionFunctionType = (version: string) => string | null;
export type SemanticFunctionType = (input: string | SemVer) => number;
export type OperatorFunctionType = (version: string, other: string) => number;
