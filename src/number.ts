import * as types from "./types"

/**
 * Checks if a value is a `number` that is not `Infinity`, `-Infinity`, or `NaN`.
 * Note that this is the branded type guard version of `isFinite`.
 * @param value - The value to check.
 * @returns `true` if `value` is a `number` which is not `Infinity`, `-Infinity` or `NaN`; `false` otherwise.
 */
export function isFiniteNumber(value: unknown): value is types.Finite {
  return isNumber(value, false, false)
}

/**
 * Checks if a value is positive or negative `Infinity`.
 * @param value - The value to check.
 * @returns `true` if the value is `Infinity` or `-Infinity`, `false` otherwise.
 */
export function isInfinite(value: unknown): value is types.Infinite {
  return isPositiveInfinity(value) || isNegativeInfinity(value)
}

/**
 * Checks if a value is (negative) `-Infinity`.
 * @param value - The value to check.
 * @returns `true` if the value is `-Infinity`, `false` otherwise.
 */
export function isNegativeInfinity(value: unknown): value is types.NegativeInfinity {
  return value === negativeInfinity
}

/**
 * Checks if a value is NaN.
 * @param value - The value to check.
 * @returns `true` if the value is `NaN`, `false` otherwise.
 */
export function isNotANumber(value: unknown): value is types.NotANumber {
  return isNumber(value, true, false) && isNaN(value)
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
 * Checks if a value is positive `Infinity`.
 * @param value - The value to check.
 * @returns `true` if the value is `Infinity`, `false` otherwise.
 */
export function isPositiveInfinity(value: unknown): value is types.PositiveInfinity {
  return value === positiveInfinity
}

// Asserting a branded type.
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const negativeInfinity = -Infinity as types.NegativeInfinity

// Asserting a branded type.
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const notANumber = NaN as types.NotANumber

// Asserting a branded type.
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const positiveInfinity = Infinity as types.PositiveInfinity

