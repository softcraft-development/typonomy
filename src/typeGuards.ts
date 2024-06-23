import { and, not, or, some } from "./logic"
import type { Explicit, Nullish, Possible, Predicate, TypeGuard } from "./types"

/**
 * Ensures that the given value is neither `null` nor `undefined`.
 * Throws an error if the value is `null` or `undefined`.
 * @template T - The type when it is not `null` or `undefined`.
 * @param value - The value to be checked.
 * @returns The non-null non-undefined value.
 * @throws If the value is null or undefined.
 */
export function insist<T>(value: Possible<T>): T {
  if (isNull(value)) throw new Error("Value must not be null")
  if (isUndefined(value)) throw new Error("Value must not be undefined")
  return value
}

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
 * @template T - The type of the values being compared.
 * @param a - The first value.
 * @param b - The second value.
 * @returns `true` if the values are equal, `false` otherwise.
 */
export function isEquality<T>(a: T, b: T): boolean {
  return a === b
}

/**
 * Checks if an object has no properties or elements.
 * @param value - The object or array to check.
 * @returns Returns `true` if value is an object with no properties, `false` otherwise.
 */
export function isEmptyObject(value: unknown): value is {} {
  if (!isObject(value)) return false
  return Object.keys(value).length === 0
}

/**
 * Checks if a value is not `Nullish`.
 * @template T - The type when it is not `null` or `undefined`.
 * @param value - The value to check.
 * @returns `false` if the value is `null` or `undefined`; `true` otherwise.
 */
export function isExplicit<T>(value: Possible<T>): value is Explicit<T> {
  return !isNullish(value)
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
export const isNullish = typeGuard<Nullish>(or(isNull, isUndefined))

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
 * Checks if a value is a non-`Array` non-`null` `object`.
 *
 * @param value - The value to check.
 * @returns `false` if the value is an `Array` or `null`; `true` if the value is an object; `false` otherwise.
 */
export function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null && !Array.isArray(value)
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
 * Checks if the given object is a string.
 *
 * @param obj - The object to be checked.
 * @returns `true` if the object is a string, `false` otherwise.
 */
export function isString(obj: unknown): obj is string {
  return typeof obj === "string"
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
 * @template T - The base type of the resulting `TypeGuard`.
 * @template X - The type to exclude.
 * @param base - A `TypeGuard` that allows either the base type or excluded type.
 * @returns A narrower `TypeGuard` that only allows the base type.
 */
export function narrow<T, X>(base: TypeGuard<T | X>, excluded: TypeGuard<X>): TypeGuard<Exclude<T | X, X>> {
  return typeGuard(and(not(excluded), base))
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
