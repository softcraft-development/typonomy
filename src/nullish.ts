import { and, not, or } from "./func"

/**
 * A utility type for values that may never be undefined.
 * @template T - The type when it is not undefined.
 */
export type Defined<T> = Exclude<T, undefined>

/**
* A utility type for values that may never be null nor undefined.
* @template T - The type which may never be null nor undefined.
*/
export type Definite<T> = Exclude<T, Nullish>

/**
 * A utility type for values that may be null.
 * @template T - The type when it is not null.
 */
export type Nullable<T> = T | null

/**
 * Either null or undefined.
 */
export type Nullish = null | undefined

/**
 * A utility type for values that may be undefined.
 * @template T - The type when it is not undefined.
 */
export type Optional<T> = T | undefined

/**
 * A utility type for values that may null or undefined.
 * @template T - The type when it is not Nullish.
 */
export type Possible<T> = T | Nullish

/**
 * A utility type for values that may not be null.
 * @template T - The type when it is not null.
 */
export type Substantial<T> = Exclude<T, null>

/**
 * Ensures that the given value is not null or undefined.
 * If the value is null or undefined, an error is thrown.
 * @param value - The value to be checked.
 * @returns The non-null non-undefined value.
 * @throws {Error} If the value is null or undefined.
 */
export function insist<T>(value: T | null | undefined): T {
  if (value === null) throw new Error("Value must not be null")
  if (value === undefined) throw new Error("Value must not be undefined")
  return value
}

/**
 * Checks if a potentially undefined value is actually not undefined.
 *
 * @param value - The potentially undefined value to check.
 * @returns A boolean indicating whether the value is not undefined.
 */
export function isDefined<T>(value: Optional<T>): value is Defined<T> {
  return not(isUndefined)(value)
}

/**
 * Checks if a potentially null or undefined value is actually neither null nor undefined.
 *
 * @param value - The potentially null or undefined value to check.
 * @returns A boolean indicating whether the value is neither null nor undefined.
 */
export function isDefinite<T>(value: Possible<T>): value is Definite<T> {
  return and(not(isNull), not(isUndefined))(value)
}

/**
 * Checks if a value is null.
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is null.
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * Checks if a potentially null or undefined value is actually not undefined.
 *
 * @param value - The potentially null or undefined value to check.
 * @returns A boolean indicating whether the value is not undefined.
 */
export function isNullable<T>(value: Possible<T>): value is Nullable<T> {
  return not(isUndefined)(value)
}

/**
 * Checks if a potentially null or undefined value is actually null or undefined.
 *
 * @param value - The potentially null or undefined value to check.
 * @returns A boolean indicating whether the value is null or undefined.
 */
export function isNullish<T>(value: Possible<T>): value is Nullish {
  return or(isNull, isUndefined)(value)
}

/**
 * Checks if a potentially null or undefined value is actually not null.
 *
 * @param value - The potentially null or undefined value to check.
 * @returns A boolean indicating whether the value is not null.
 */
export function isOptional<T>(value: Possible<T>): value is Optional<T> {
  return not(isNull)(value)
}

/**
 * Checks if a potentially null value is actually not null.
 *
 * @param value - The potentially null value to check.
 * @returns A boolean indicating whether the value is not null.
 */
export function isSubstantial<T>(value: Nullable<T>): value is Substantial<T> {
  return not(isNull)(value)
}

/**
 * Checks if a value is undefined.
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is undefined.
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}
