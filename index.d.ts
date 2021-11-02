export type CanonPreSuffix = 'a' | 'b' | 'rc'
export type CanonPostSuffix = 'post'

export type PreSuffix =
  | CanonPreSuffix
  | 'c'
  | 'alpha'
  | 'beta'
  | 'pre'
  | 'preview'
export type PostSuffix = CanonPostSuffix | 'rev' | 'r'

export type CanonSuffix = CanonPreSuffix | CanonPostSuffix
export type Suffix = PreSuffix | PostSuffix

export interface Version {
  epoch: number
  release: number[]
  pre: [CanonSuffix, number] | null
  post: number | null
  dev: number | null
  local: string | null
  /** Part without the +local frogment */
  public: string
  /** Just release and epoch */
  base_version: string
  is_prerelease: boolean
  is_devrelease: boolean
  is_postrelease: boolean
}

// version
export function valid(version: string): string | null
export function clean(version: string): string
export function explain(version: string): Version

// operator
export function lt(version: string, other: string): boolean
export function le(version: string, other: string): boolean
export const lte = le
export function eq(version: string, other: string): boolean
export function ne(version: string, other: string): boolean
export const neq = ne
export function ge(version: string, other: string): boolean
export const gte = ge
export function gt(version: string, other: string): boolean
export function compare(version: string, other: string): -1 | 0 | 1
export function rcompare(version: string, other: string): -1 | 0 | 1

// range
export interface SatisfiesOptions {
  explained?: Version
  version?: string
}
export function satisfies(
  version: string,
  specifier: string,
  options?: SatisfiesOptions,
): boolean
export function maxSatisfying(
  versions: string[],
  range: string,
  options?: SatisfiesOptions,
): string
export function minSatisfying(
  versions: string[],
  range: string,
  options?: SatisfiesOptions,
): string
export function validRange(specifier: string): boolean

// semantic
type IsPre = 'pre' | ''
export type Release =
  | `${IsPre}major`
  | `${IsPre}minor`
  | `${IsPre}patch`
  | 'prerelease'
export function major(input: string)
export function minor(input: string)
export function patch(input: string)
export function inc(
  input: string,
  release,
  preReleaseIdentifier: PreSuffix,
): string | null
