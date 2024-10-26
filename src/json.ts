import { isArrayOf } from "./arrays"
import { isFiniteNumber } from "./number"
import { isObject, isRecordOf } from "./objects"
import { isString } from "./strings"
import { isBoolean, isNull } from "./typeGuards"
import type { Json, JsonCollection, JsonObject, JsonParsed, JsonParsedScalar, JsonScalar } from "./types"

/**
 * Checks if a value is representable in JSON.
 * @param value - The value to check.
 * @returns `true` if the value is representable in JSON, `false` otherwise.
 */
export function isJson(value: unknown): value is Json {
  return isJsonScalar(value) || isJsonCollection(value)
}

/**
 * Checks if a value is representable as a JSON array or object.
 * @param value - The value to check.
 * @returns `true` if the value can be a JSON array or object, `false` otherwise.
 */
export function isJsonCollection(value: unknown): value is JsonCollection {
  return isArrayOf(value, isJson) || isJsonObject(value)
}

/**
 * Checks if a value is representable as a parsable JSON value.
 * @param value - The value to check.
 * @returns `true` if the value can be parsed from a JSON string; false otherwise.
 */
export function isJsonParsed(value: unknown): value is JsonParsed {
  return isJsonParsedScalar(value) || isJsonCollection(value)
}

/**
 * Checks if a value is representable as a parsable non-collection JSON value.
 * @param value - The value to check.
 * @returns `true` if the value can be parsed from a JSON string and is not a collection; false otherwise.
 */
export function isJsonParsedScalar(value: unknown): value is JsonParsedScalar {
  return isNull(value) || isBoolean(value) || isFiniteNumber(value)
}

/**
 * Checks if a value is representable as a JSON object.
 * @param value - The value to check.
 * @returns `true` if the value can be a JSON object; false otherwise.
 */
export function isJsonObject(value: unknown): value is JsonObject {
  return isRecordOf(value, isString, isJson)
}

/**
 * Checks if a value is representable as a non-collection JSON value.
 * @param value - The value to check.
 * @returns `true` if the value is a valid JSON non-collection value; false otherwise.
 */
export function isJsonScalar(value: unknown): value is JsonScalar {
  return isString(value) || isJsonParsedScalar(value)
}

/**
 * Parses a string to a `JsonParsed` value if possible.
 * Otherwise throws a `JsonParseError`.
 *
 * All strings are valid strings in JSON, but only some of them are parsable to other valid
 * These parsable JSON types are:
 *   * `null`
 *   * `Finite` (a subset of `number` that excludes `NaN` and `Infinity`.)
 *   * `boolean`
 *   * `Json[]` (which may be a `string[]`)
 *   * `JsonObject` (which may be a `Record<string, string>`)
 *
 * If `possibleJson` is not parsable as one of these types, then it may be:
 *   * A string that's intended to be an arbitrary and valid JSON string.
 *   * A string that's an improperly-formatted JSON object or array.
 *
 * No JSON parser can distinguish between these two cases.
 * `parseJson` assumes that `possibleJson` is intended to be strictly parsable as one of these types,
 * and will throw a `JsonParseError` otherwise.
 * If the intention of the string is different, try using one of these other functions:
 *   * {@link parseJsonArray} for strings intended to be to JSON arrays.
 *   * {@link parseJsonObject} for strings intended to be to JSON objects.
 *   * {@link parseJsonCollection} for strings intended to be either JSON arrays or JSON objects.
 *   * {@link toJson} for strings of uncertain intention.
 *
 * @param possibleJson - The string to parse as JSON.
 * @returns A `JsonParsed` that was parsed from `possibleJson`.
 * @throws `JsonParseError` If `possibleJson` is not parsable as a `JsonParsed`.
 */
export function parseJson(possibleJson: string): JsonParsed {
  try {
    return JSON.parse(possibleJson)
  }
  catch (error) {
    throw new JsonParseError("Unparsable JSON.", possibleJson, error)
  }
}

/**
 * Parses a string to a JSON array if possible.
 * Otherwise throws a `JsonParseError`.
 *
 * @param possibleJson - The string to parse as JSON.
 * @returns A `Json[]` that was parsed from `possibleJson`.
 * @throws `JsonParseError` If `possibleJson` is not parsable as a JSON array.
 */
export function parseJsonArray(possibleJson: string): Json[] {
  const parsed = parseJson(possibleJson)
  if (Array.isArray(parsed)) return parsed
  throw new JsonParseError("Not a JSON array", possibleJson)
}

/**
 * Parses a string to a JSON array or object if possible.
 * Otherwise throws a `JsonParseError`.
 *
 * @param possibleJson - The string to parse as JSON.
 * @returns A `Json[]` or `JsonObject` that was parsed from `possibleJson`.
 * @throws `JsonParseError` If `possibleJson` is not parsable as a JSON array or JSON object.
 */
export function parseJsonCollection(possibleJson: string): JsonCollection {
  const parsed = parseJson(possibleJson)
  if (Array.isArray(parsed)) return parsed
  // `Finite` is a branded object thus passes `isObject`.
  if (isObject(parsed) && !isFiniteNumber(parsed)) return parsed
  throw new JsonParseError("Not a JSON Collection", possibleJson)
}

/**
 * Parses a string to a JSON Object if possible.
 * Otherwise throws a `JsonParseError`.
 *
 * @param possibleJson - The string to parse as JSON.
 * @returns A `JsonObject` that was parsed from `possibleJson`.
 * @throws `JsonParseError` If `possibleJson` is not parsable as a JSON object.
 */
export function parseJsonObject(possibleJson: string): JsonObject {
  const parsed = parseJson(possibleJson)
  // `Finite` is a branded `object` thus passes `isObject`.
  // Likewise, `Array` is an `object` too.
  // Neither of these are JSON objects though.
  if (isObject(parsed) && !isFiniteNumber(parsed) && !Array.isArray(parsed)) return parsed
  throw new JsonParseError("Not a JSON object", possibleJson)
}

/**
 * Parses a string to a parsable JSON value if possible.
 * Otherwise returns the original string.
 *
 * @param possibleJson - The string to parse as JSON.
 * @returns A `JsonParsed` that was parsed from `possibleJson`, or `possibleJson` if nothing could be parsed.
 */
export function toJson(possibleJson: string): Json {
  try {
    return JSON.parse(possibleJson)
  }
  catch (error) {
    return possibleJson
  }
}

/**
 * The `Error` thrown when a string is not parsable as JSON,
 * but is expected to be.
 */
export class JsonParseError extends Error {
  constructor(message: string, public readonly invalid: string, public readonly cause?: unknown) {
    super(message)
  }
}
