import { Reducer } from "./func"

/**
 * Checks if an object has no keys or properties.
 * @param obj - The object to check.
 * @returns Returns `true` if the object has no keys; false otherwise.
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0
}

/**
 * Reduces the keys and values of a record object.
 *
 * @template S - The type of the state.
 * @template V - The type of the values in the record.
 * @param obj - The object to be reduced.
 * @param reducer - The reducer function.
 * @param initialState - The initial state.
 * @returns The final state.
 */
export function reduce<S, V>(obj: Record<string, V>, reducer: Reducer<S, V, string>, initialState: S): S {
  return Object.keys(obj).reduce((state, key) => {
    const value = obj[key]
    const newState = reducer(state, value, key)
    return newState
  }, initialState)
}
