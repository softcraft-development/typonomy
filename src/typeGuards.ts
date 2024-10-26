import { negativeInfinity, positiveInfinity } from "./constants"
import { and, not, or, some } from "./logic"
import { isRecordOf } from "./objects"
import type { AssertMessageFactory } from "./types"
import * as types from "./types"

export const defaultAssertion = "the expected type"

export class AssertError<X> extends Error {
  constructor(
    public readonly value: X,
    public readonly assertion: string,
    messageFactory: AssertMessageFactory<X> = assertErrorMessage
  ) {
    super(messageFactory(value, assertion))
  }
}

export function assertType<T>(
  value: unknown,
  typeGuard: types.TypeGuard<T>,
  assertion: string = defaultAssertion,
  messageFactory: AssertMessageFactory<unknown> = assertErrorMessage
): asserts value is T {
  if (!typeGuard(value)) throw new AssertError<unknown>(value, assertion, messageFactory)
}

export const assertErrorMessage: AssertMessageFactory<unknown> = (value, assertion) => {
  return `Asserted value {${value}} is not ${assertion}.`
}

export function enforceType<T>(
  value: unknown,
  typeGuard: types.TypeGuard<T>,
  assertion: string = defaultAssertion,
  messageFactory: AssertMessageFactory<unknown> = assertErrorMessage
): T {
  assertType(value, typeGuard, assertion, messageFactory)
  return value
}

/**
 * Ensures that the given value is neither `null` nor `undefined`.
 * Throws an error if the value is `null` or `undefined`.
 * @typeParam T - The type when it is not `null` or `undefined`.
 * @param value - The value to be checked.
 * @returns The non-null non-undefined value.
 * @throws If the value is null or undefined.
 */
export function insist<T>(value: types.Possible<T>): T {
  if (isNull(value)) throw new Error("Value must not be null")
  if (isUndefined(value)) throw new Error("Value must not be undefined")
  return value
}

/**
 * Checks if a value is an array of a specific type.
 *
 * @param value - The value to check.
 * @param predicate - The Predicate to check each item in the array.
 * @param emptyMatches - The value to return when the array is empty, and the type cannot be defined by the value.
 *  Defaults to `true`.
 * @returns `true` if the value is an array of the specified type, `false` otherwise.
 */
export function isArrayOf<T>(value: unknown, predicate: types.Predicate<T>, emptyMatches = true): value is T[] {
  if (!Array.isArray(value)) return false
  if (value.length === 0) return emptyMatches
  return value.every(predicate)
}

/**
 * Checks a value is a `Bag` of values that could match a specific type.
 * @typeParam T - The type to check.
 * @param value - The value to check.
 * @param typeGuard - A function to check individual values
 * @returns `true` the value is of the specified type,
 *  `undefined`, an array of that type or `undefined`, or an empty array; `false` otherwise.
 */
export function isBag<T>(value: unknown, typeGuard: types.TypeGuard<T>): value is types.Bag<T> {
  if (isUndefined(value)) return true
  if (isArrayOf(value, or(isUndefined, typeGuard), true)) return true
  if (typeGuard(value)) return true
  return false
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
 * Checks if the given value is an empty array.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an empty array, `false` otherwise.
 */
export function isEmptyArray(value: unknown): value is [] {
  return Array.isArray(value) && value.length === 0
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
 * @typeParam T - The type when it is not `null` or `undefined`.
 * @param value - The value to check.
 * @returns `false` if the value is `null` or `undefined`; `true` otherwise.
 */
export function isExplicit<T>(value: types.Possible<T>): value is types.Explicit<T> {
  return !isNullish(value)
}

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
 * Checks if a value is representable in JSON.
 * @param value - The value to check.
 * @returns `true` if the value is representable in JSON, `false` otherwise.
 */
export function isJson(obj: unknown): obj is types.Json {
  return isJsonScalar(obj) || isJsonCollection(obj)
}

/**
 * Checks if a value is representable as a JSON array or object.
 * @param value - The value to check.
 * @returns `true` if the value can be a JSON array or object, `false` otherwise.
 */
export function isJsonCollection(obj: unknown): obj is types.JsonCollection {
  return isArrayOf(obj, isJson) || isJsonObject(obj)
}

/**
 * Checks if a value is representable as a parsable JSON value.
 * @param value - The value to check.
 * @returns `true` if the value can be parsed from a JSON string; false otherwise.
 */
export function isJsonParsed(obj: unknown): obj is types.JsonParsed {
  return isJsonParsedScalar(obj) || isJsonCollection(obj)
}

/**
 * Checks if a value is representable as a parsable non-collection JSON value.
 * @param value - The value to check.
 * @returns `true` if the value can be parsed from a JSON string and is not a collection; false otherwise.
 */
export function isJsonParsedScalar(obj: unknown): obj is types.JsonParsedScalar {
  return isNull(obj) || isBoolean(obj) || isFiniteNumber(obj)
}

/**
 * Checks if a value is representable as a JSON object.
 * @param value - The value to check.
 * @returns `true` if the value can be a JSON object; false otherwise.
 */
export function isJsonObject(obj: unknown): obj is types.JsonObject {
  return isRecordOf(obj, isString, isJson)
}

/**
 * Checks if a value is representable as a non-collection JSON value.
 * @param value - The value to check.
 * @returns `true` if the value is a valid JSON non-collection value; false otherwise.
 */
export function isJsonScalar(obj: unknown): obj is types.JsonScalar {
  return isString(obj) || isJsonParsedScalar(obj)
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
 * Checks if a value is positive `Infinity`.
 * @param value - The value to check.
 * @returns `true` if the value is `Infinity`, `false` otherwise.
 */
export function isPositiveInfinity(value: unknown): value is types.PositiveInfinity {
  return value === positiveInfinity
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
