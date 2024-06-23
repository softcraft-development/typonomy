import { addMore, reduceArray, type Some } from "./arrays"
import { isEquality, onBreakExecution, type Combine, type Predicate, type Reducer } from "./func"
import { isUndefined, type Optional } from "./nullish"
import { type TypeGuard } from "./types"

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

/**
 * Returns all keys (if any) that are mapped to the target value.
 * @template V - The type of the values in the record.
 * @param obj - The record or enum to search.
 * @param target - The value to search for.
  * @param [checkEquality=isEquality<unknown>] - A function to compare object values to the target value.
 * @returns An optional array of keys that have the specified value.
 */
export function keysForValue<T extends object>(
  obj: T,
  target: unknown,
  checkEquality: Combine<unknown, unknown, boolean> = isEquality<unknown>
): Optional<Some<keyof T>> {
  return reduceArray(Object.entries(obj), (state, [k, value]) => {
    if (!checkEquality(value, target)) return state
    // We know `k` is a key of `T` because it comes from `Object.entries(obj)`.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const key = k as keyof T
    if (isUndefined(state)) return key
    return addMore(state, key)
  }, objectOf<Optional<Some<keyof T>>>(undefined))
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

/**
 * Creates a type guard function that checks if a value is mapped to a key in the object.
 * Typically used for enum type guards, where the values are the primary constituents of the enum.
 * Also works for other key-value maps like `object` and `Record`,
 * though it makes less sense to base a type guard on mapped values for those types.
 *
 * @template T - The type to guard.
 * @param obj - The object with keys mapped to values.
 * @param [checkEquality=isEquality<unknown>] - A function to compare object values to the target value.
 * @returns - The type guard for the object,
 *  which returns `true` if the value is mapped to a key in `obj`, and `false` otherwise.
 */
export function typeGuardValues<T extends object>(
  obj: T,
  checkEquality: Combine<unknown, unknown, boolean> = isEquality<unknown>
): TypeGuard<T[keyof T]> {
  return (value: unknown): value is T[keyof T] => {
    const keys = keysForValue(obj, value, checkEquality)
    return !isUndefined(keys)
  }
}
