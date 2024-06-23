import { reduceArray } from "./arrays"
import type { Reducer } from "./types"

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
