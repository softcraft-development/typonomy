import { reduceIndexed, type Reducer } from "./func"

/**
 * Checks if the given object is a string.
 *
 * @param obj - The object to be checked.
 * @returns `true` if the object is a string, `false` otherwise.
 */
export function isString(obj: unknown): obj is string {
  return typeof obj === "string"
}

export function reduceCharacters<S>(str: string, reducer: Reducer<S, string, number>, initialState: S): S {
  return reduceIndexed<S, string>(str, 0, str.length - 1, (state, value, index) => {
    // We know that the indices only exist within the length of `str`,
    // so we know that the `value` will never be `undefined` as a result of out-of-bounds de-indexing.
    // Thus treating `value` as `string` is safe.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return reducer(state, value as string, index)
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
