import { Reducer } from "@/func"

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
