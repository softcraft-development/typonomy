import { addMore, type Some } from "./arrays"
import { onBreakExecution, type Predicate, type Reducer } from "./func"
import { isUndefined, type Optional } from "./nullish"
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
 * @param obj - The value to check.
 * @param guard - A TypeGuard that checks the type of the object's values.
 * @returns - Returns true if the value is an object whose properties are all of type T.
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

export function keysForValue<T extends Record<string, V>, V>(obj: T, target: V): Optional<Some<keyof T>> {
  return reduceRecord<Optional<Some<keyof T>>, V>(obj, (state, value, key) => {
    if (value !== target) return state
    if (isUndefined(state)) return key
    return addMore(state, key)
  }, undefined)
}

/**
 * Reduces the keys and values of a record object.
 * Stops execution if the reducer throws a `BreakExecution`.
 * Note that the order of the keys is not guaranteed.
 *
 * @template S - The type of the state.
 * @template V - The type of the values in the record.
 * @param record - The object to be reduced.
 * @param reducer - The reducer function.
 * @param initialState - The initial state.
 * @returns The final state.
 */
export function reduceRecord<S, V>(record: Record<string, V>, reducer: Reducer<S, V, string>, initialState: S): S {
  let state: S = initialState
  for (const key in record) {
    if (record.hasOwnProperty(key)) {
      // We've confirmed the key exists, so we know the is not `undefined` by virtue of being unassigned,
      // so we are safe to declare it as `V`.
      // Note that the value may still be assigned as `undefined` if `V` includes `undefined`.
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const value = record[key] as V
      try {
        state = reducer(state, value, key)
      }
      catch (exception) {
        return onBreakExecution(exception, state)
      }
    }
  }
  return state
}

/**
 * Declares an object to be of a specific type.
 * Useful for type inference when the object is a literal.
 *
 * @template T - The type of the object.
 * @param obj - The object to return
 * @returns The input object
 */
export function objectOf<T>(obj: T): T {
  return obj
}

/**
 * Creates a `Record` of a specified key and value type.
 *
 * @template K - The type of the keys in the object.
 * @template V - The type of the values in the object.
 * @param [data={} as Record<K, V>] - An object to use as the record. Defaults to an empty object.
 * @returns An empty `object`.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export function recordOf<K extends PropertyKey, V>(data: Record<K, V> = {} as Record<K, V>): Record<K, V> {
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
