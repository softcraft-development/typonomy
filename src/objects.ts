import type { Predicate, Reducer } from "./func"
import type { TypeGuard } from "./types"

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
 * Checks if a value is a non-`Array` non-`null` `object`.
 *
 * @param value - The value to check.
 * @returns `false` if the value is an `Array` or `null`; `true` if the value is an object; `false` otherwise.
 */
export function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/**
 * Checks if the value is a Record of specific types
 *
 * @template V - The type of the values in the record.
 * @param {unknown} obj - The value to check.
 * @param {TypeGuard} guard - A TypeGuard that checks the type of the object's values.
 * @returns {value is Record<K, T>} - Returns true if the value is an object whose properties are all of type T.
 */
export function isRecordOf<T>(
  obj: unknown,
  guard: TypeGuard<T>,
  emptyMatches = true
): obj is Record<string, T> {
  if (!isObject(obj)) return false
  const values = Object.values(obj)
  if (values.length === 0) return emptyMatches
  return values.every(guard)
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
  return Object.entries(obj).reduce((state, [key, value]) => {
    const newState = reducer(state, value, key)
    return newState
  }, initialState)
}

/**
 * Creates a `Record` of a specified key and value type.
 *
 * @template K - The type of the keys in the object.
 * @template V - The type of the values in the object.
 * @returns An empty `object`.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export function rOf<K extends PropertyKey, V>(data: Record<K, V> = {} as Record<K, V>): Record<K, V> {
  return data
}

/**
 * Creates a Predicate that validates the properties of an object.
 *
 * @template T - The Type to check against.
 * @param predicates - An object with a Predicate for properties in T.
 * @returns A TypeGuard that checks if an object is of type T.
 */
export function typeGuardFor<T>(predicates: { [K in keyof T]: Predicate<unknown> }): TypeGuard<T> {
  return (obj: unknown): obj is T => {
    if (!isObject(obj)) return false
    if (isEmptyObject(obj)) return false
    for (const key in predicates) {
      const predicate = predicates[key]
      const value = obj[key]
      if (!predicate(value)) return false
    }
    return true
  }
}
