import { isArrayOf } from "./arrays"
import { and, not, or, some } from "./logic"
import { isNumber } from "./number"
import * as types from "./types"

/**
 * Checks if a value is a `true` or `false`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a boolean; `false` otherwise.
 */
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false
}

/**
 * Checks if two values are equal via the `===` operator.
 *
 * @typeParam T - The type of the values being compared.
 * @param a - The first value.
 * @param b - The second value.
 * @returns `true` if the values are equal, `false` otherwise.
 */
export function isEquality<T>(a: T, b: T): boolean {
  return a === b
}

/**
 * Checks if a value is not `Nullish`.
 * @typeParam T - The type when it is not `null` or `undefined`.
 * @param value - The value to check.
 * @returns `false` if the value is `null` or `undefined`; `true` otherwise.
 */
export function isExplicit<T>(value: types.Possible<T>): value is types.Explicit<T> {
  return !isNullish(value)
}

/**
   * Checks if a value is null.
   *
   * @param value - The value to check.
   * @returns `true` if the value is `null`; `false` otherwise.
   */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
   * Checks if a potentially null or undefined value is actually null or undefined.
   *
   * @param value - The potentially null or undefined value to check.
   * @returns `true` if the value is `null` or `undefined`; `false` otherwise.
   */
export const isNullish = typeGuard<types.Nullish>(or(isNull, isUndefined))

/**
   * Checks if the given `Bag<T>` is an array of `T`.
   * Note that an empty array, or an array of one element, or an array of `undefined`
   * are all still considered plural.
   *
   * @param value The `Bag<T>` to check.
   * @returns `true` if the value is an `Array<T>`, `false` if it is a single `T` or `undefined`.
   */
export function isPlural<T>(value: types.Bag<T>): value is T[] {
  // Undefined is not an array so we don't need to check it explicitly here.
  return Array.isArray(value)
}

/**
   * Checks if a value is a PropertyKey (i.e.: a `string`, `number`, or `Symbol`).
   * @param value - The value to check.
   * @returns `true` if the value is a `string`, `number`, or `Symbol`, `false` otherwise.
   */
export function isPropertyKey(value: unknown): value is PropertyKey {
  return some(isString, isNumber, isSymbol)(value)
}

/**
   * Checks if the given `Bag<T>` is a single `T`.
   *
   * @param value The `Bag<T>` to check.
   * @returns `true` if the value is a single `T`, `false` if it is an `Array<T>` or `undefined`.
   */
export function isSingular<T>(value: types.Bag<T>): value is types.Defined<T> {
  if (isPlural(value)) return false
  if (isUndefined(value)) return false
  return true
}

/**
   * Checks if a value matches a type or a non-empty array of that type.
   * @typeParam T - The type to check.
   * @param value - The value to check.
   * @param typeGuard - A function to check individual values.
   * @returns `true` the value is of the specified type or a non-empty array of that type; `false` otherwise.
   */
export function isSome<T>(value: unknown, typeGuard: types.TypeGuard<T>): value is types.Some<T> {
  if (isArrayOf(value, typeGuard, false)) return true
  if (typeGuard(value)) return true
  return false
}

/**
   * Checks if the given object is a string.
   *
   * @param value - The object to be checked.
   * @returns `true` if the object is a string, `false` otherwise.
   */
export function isString(value: unknown): value is string {
  return typeof value === "string"
}

/**
   * Checks if a value is a `Symbol`
   * @param value - The value to check.
   * @returns `true` if the value is a `Symbol`, `false` otherwise.
   */
export function isSymbol(value: unknown): value is PropertyKey {
  return typeof value === "symbol"
}

/**
   * Checks if a value is undefined.
   *
   * @param value - The value to check.
   * @returns `true` if the value is `undefined`; `false` otherwise.
   */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

/**
   * Confirms that an `unknown` value is `unknown`.
   * Really only useful for widening other compound type guards.
   *
   * @param value - The value to check.
   * @returns Always `true`, since the input `value` is defined as `unknown`.
   */
export function isUnknown(value: unknown): value is unknown {
  return true
}

/**
   * Create a `TypeGuard` that excludes values of another type.
   * @typeParam T - The base type of the resulting `TypeGuard`.
   * @typeParam X - The type to exclude.
   * @param base - A `TypeGuard` that allows either the base type or excluded type.
   * @returns A narrower `TypeGuard` that only allows the base type.
   */
export function narrow<T, X>(
  base: types.TypeGuard<T | X>,
  excluded: types.TypeGuard<X>
): types.TypeGuard<Exclude<T | X, X>> {
  return typeGuard(and(not(excluded), base))
}

/**
   * Converts undefined to null, or returns the original value.
   *
   * @param value - The value to convert.
   * @returns `null` if the value is `undefined`, or the original value otherwise.
   */
export function nullify<T>(value: types.Possible<T>): types.Nullable<T> {
  if (isUndefined(value)) return null
  return value
}

/**
   * Convert a `Predicate<unknown>` into a type guard for a type.
   * @typeParam T - The type of the resulting TypeGuard.
   * @param predicate - The `Predicate<unknown>` used to check the type.
   * @returns A `TypeGuard<T>` that checks if an `unknown` value is of type `T`.
   */
export function typeGuard<T>(predicate: types.Predicate<unknown>): types.TypeGuard<T> {
  return (value: unknown): value is T => predicate(value)
}

/**
   * Converts null to undefined, or returns the original value.
   *
   * @param value - The value to convert.
   * @returns `undefined` if the value is `null`, or the original value otherwise.
   */
export function undefine<T>(value: types.Possible<T>): types.Optional<T> {
  if (isNull(value)) return undefined
  return value
}

/**
   * Create a `TypeGuard` that includes values of another type.
   * @typeParam T - The type of the base `TypeGuard`.
   * @typeParam I - The type to include.
   * @param base - A `TypeGuard` that allows the base type.
   * @returns A wider `TypeGuard` that allows the base type or the included type.
   */
export function widen<T, I>(base: types.TypeGuard<T>, included: types.TypeGuard<I>): types.TypeGuard<T | I> {
  return typeGuard(or(included, base))
}
