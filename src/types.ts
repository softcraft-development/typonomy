import type { Predicate } from "./func"
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
  return isString(value) || isNumber(value, true) || isSymbol(value)
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
 * Convert a `Predicate<unknown>` into a type guard for a type.
 * @type T - The type of the resulting TypeGuard.
 * @param predicate - The `Predicate<unknown>` used to check the type.
 * @returns A `TypeGuard<T>` that checks if an `unknown` value is of type `T`.
 */
export function typeGuard<T>(predicate: Predicate<unknown>): TypeGuard<T> {
  return (value: unknown): value is T => predicate(value)
}
