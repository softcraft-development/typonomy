import { and, any, not, or, type Predicate } from "./func"
import { isString } from "./strings"

/**
 * A function that checks if a value satisfies a specific type.
 */
export type TypeGuard<T> = (value: unknown) => value is T

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
 * Checks if a value is positive of negative `Infinity`.
 * @param value - The value to check.
 * @returns `true` if the value is `Infinity` or `-Infinity`, `false` otherwise.
 */
export function isInfinite(value: unknown): boolean {
  return value === Infinity || value === -Infinity
}

/**
 * Checks if a value is a number.
 *
 * @param value - The value to check.
 * @param nanAllowed - Whether `NaN` considered a valid number. Defaults to `false`.
 * @param infiniteAllowed - Whether `Infinity` or `-Infinity` are considered a valid numbers. Defaults to `false`.
 * @returns `true` if the value is a number (including `NaN`, `Infinity`, or `-Infinity` when allowed),
 *   `false` otherwise.
 */
export function isNumber(value: unknown, nanAllowed = false, infiniteAllowed = false): value is number {
  if (typeof value !== "number") return false
  if (isNaN(value)) return nanAllowed
  if (isInfinite(value)) return infiniteAllowed
  return true
}

/**
 * Checks if a value is a PropertyKey (i.e.: a `string`, `number`, or `Symbol`).
 * @param value - The value to check.
 * @returns `true` if the value is a `string`, `number`, or `Symbol`, `false` otherwise.
 */
export function isPropertyKey(value: unknown): value is PropertyKey {
  return any(isString, isNumber, isSymbol)(value)
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
 * Create a `TypeGuard` that excludes values of another type.
 * @template T - The base type of the resulting `TypeGuard`.
 * @template X - The type to exclude.
 * @param base - A `TypeGuard` that allows either the base type or excluded type.
 * @returns A narrower `TypeGuard` that only allows the base type.
 */
export function narrow<T, X>(base: TypeGuard<T | X>, excluded: TypeGuard<X>): TypeGuard<Exclude<T | X, X>> {
  return typeGuard(and(not(excluded), base))
}

/**
 * Create a `TypeGuard` that includes values of another type.
 * @template T - The type of the base `TypeGuard`.
 * @template I - The type to include.
 * @param base - A `TypeGuard` that allows the base type.
 * @returns A wider `TypeGuard` that allows the base type or the included type.
 */
export function widen<T, I>(base: TypeGuard<T>, included: TypeGuard<I>): TypeGuard<T | I> {
  return typeGuard(or(included, base))
}

/**
 * Convert a `Predicate<unknown>` into a type guard for a type.
 * @type T - The type of the resulting TypeGuard.
 * @param predicate - The `Predicate<unknown>` used to check the type.
 * @returns A `TypeGuard<T>` that checks if an `unknown` value is of type `T`.
 */
export function typeGuard<T>(predicate: Predicate<unknown>): TypeGuard<T> {
  return (value: unknown): value is T => predicate(value)
}

