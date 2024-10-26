import { and, not, or } from "./logic"
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
   * Checks if a value is a `Symbol`
   * @param value - The value to check.
   * @returns `true` if the value is a `Symbol`, `false` otherwise.
   */
export function isSymbol(value: unknown): value is PropertyKey {
  return typeof value === "symbol"
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
   * Convert a `Predicate<unknown>` into a type guard for a type.
   * @typeParam T - The type of the resulting TypeGuard.
   * @param predicate - The `Predicate<unknown>` used to check the type.
   * @returns A `TypeGuard<T>` that checks if an `unknown` value is of type `T`.
   */
export function typeGuard<T>(predicate: types.Predicate<unknown>): types.TypeGuard<T> {
  return (value: unknown): value is T => predicate(value)
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
