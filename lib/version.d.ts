export declare const VERSION_PATTERN: string;
export declare function valid(version: string): string | null;
export declare function clean(version: string): string | null;
export declare function stringify(version: string): string | null;

interface parsed {
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
export declare function parse(version: string): parsed | null;
export declare function explain(version: string): parsed | null;
