import { or } from "./func"
import { typeGuard } from "./types"

/**
 * A utility type for values that are never `null` or `undefined`.
 * @template T - The type, which is neither `null` nor `undefined`.
 */
export type Explicit<T> = Exclude<T, Nullish>

/**
 * A utility type for values that may be `null`.
 * @template T - The type when it is not `null`.
 */
export type Nullable<T> = T | null

/**
 * A utility type for values that are never `null` (but potentially `undefined`).
 * @template T - The type, which is not `null`.
 */
export type NotNull<T> = Exclude<T, null>

/**
 * A utility type for values that are never `undefined` (but potentially `null`).
 * @template T - The type, which is not `undefined`.
 */
export type NotUndefined<T> = Exclude<T, undefined>

/**
 * Either null or undefined.
 */
export type Nullish = null | undefined

/**
 * A utility type for values that may be `undefined`.
 * @template T - The type when it is not `undefined`.
 */
export type Optional<T> = T | undefined

/**
 * A utility type for values that may be `null` or `undefined`.
 * @template T - The type when it is not `null` or `undefined`.
 */
export type Possible<T> = T | Nullish

/**
 * Ensures that the given value is neither `null` nor `undefined`.
 * Throws an error if the value is `null` or `undefined`.
 * @template T - The type when it is not `null` or `undefined`.
 * @param value - The value to be checked.
 * @returns The non-null non-undefined value.
 * @throws {Error} If the value is null or undefined.
 */
export function insist<T>(value: Possible<T>): T {
  if (isNull(value)) throw new Error("Value must not be null")
  if (isUndefined(value)) throw new Error("Value must not be undefined")
  return value
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
export const isNullish = typeGuard(or(isNull, isUndefined))

/**
 * Checks if a value is undefined.
 *
 * @param value - The value to check.
 * @returns `true` if the value is `undefined`; `false` otherwise.
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}
