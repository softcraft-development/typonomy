import { or } from "./logic"
import { typeGuard } from "./typeGuards"
import * as types from "./types"

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
   * Checks if a value is undefined.
   *
   * @param value - The value to check.
   * @returns `true` if the value is `undefined`; `false` otherwise.
   */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
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
   * Converts null to undefined, or returns the original value.
   *
   * @param value - The value to convert.
   * @returns `undefined` if the value is `null`, or the original value otherwise.
   */
export function undefine<T>(value: types.Possible<T>): types.Optional<T> {
  if (isNull(value)) return undefined
  return value
}
