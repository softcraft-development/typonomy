import { reduceArray } from "./arrays"
import { isNullish, undefine } from "./nullish"
import type { Combine, Optional, Possible, Reducer } from "./types"

/**
 * Concatenates two strings
 * Note that this is compatible with `Reducer<string, Optional<string>, unknown>` since the `key` is irrelevant.
 * This is particularly useful for passing to `reduceBag`.
 *
 * @param a - The first string.
 * @param b - The second string.
 * @returns The concatenated string.
 */
export function concat(a: string, b: Possible<string>): string {
  if (!b) return a
  return `${a}${b}`
}

/**
 * Create a Combine that concatenates two strings with a given separator.
 * If both values are `Nullish`, return `undefined`.
 * If one value is `Nullish`, return the other string.
 * Can be used as a Reducer for strings as well.
 *
 * @param separator - The string used to join two strings. Defaults to `,`.
 * @returns A function that joins strings using `separator` when both strings are not `Nullish`,
 *   or returns the other string when one is `Nullish`
 *   or `undefined` when both are `Nullish`.
 */
export function joiner(separator: string = ","): Combine<Possible<string>, Possible<string>, Optional<string>> {
  return (a, b) => {
    if (isNullish(a)) return undefine(b)
    if (isNullish(b)) return undefine(a)
    return `${a}${separator}${b}`
  }
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
 * Reduce each character in a string.
 *
 * @typeParam S - The type of the accumulated state.
 * @param str - The input string.
 * @param reducer - The reducer function to apply to each character.
 * @param initialState - The initial state value.
 * @returns - The reduced state.
 */
export function reduceCharacters<S>(str: string, reducer: Reducer<S, string, number>, initialState: S): S {
  return reduceArray<S, string>(str, (state, character, index) => {
    // Strings can never contain undefined characters;
    // The `undefined` here is a consequence of strings being `ArrayLike`, which in turn can de-index to `undefined`.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return reducer(state, character as string, index)
  }, initialState)
}

/**
 * Converts a value to a string.
 *
 * @param value - The value to convert.
 * @returns The string representation of the value.
 */
export function valueToString<T>(value: T): string {
  return String(value)
}
