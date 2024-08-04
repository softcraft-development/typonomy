import { bag } from "./bags"
import { Break, onBreakExecution } from "./break"
import { isEmptyObject, isEquality, isObject, isPropertyKey, isUndefined, typeGuard } from "./typeGuards"
import type { Bag, Combine, Optional, Predicate, Reducer, Transform, TypeGuard } from "./types"

export function isKeyOf<T extends object>(value: unknown, example: T): value is keyof T {
  if (!isPropertyKey(value)) return false
  return value in example
}

/**
 * Checks if the value is a Record of specific types.
 * @typeParam K - The type of the keys in the record.
 * @typeParam V - The type of the values in the record.
 * @param value - The value to check.
 * @param keyGuard - A TypeGuard that checks the type of the object's keys.
 * @param valueGuard - A TypeGuard that checks the type of the object's values.
 * @param emptyMatches - The return value if the object is empty. Defaults to `true`.
 * @returns - Returns `true` if the `value` is an object whose keys are all of type `K`
 *  and values are all of type `V`, or `emptyMatches` if there are no keys.
 */
export function isRecordOf<K extends PropertyKey, V>(
  value: unknown,
  keyGuard: TypeGuard<K>,
  valueGuard: TypeGuard<V>,
  emptyMatches = true
): value is Record<K, V> {
  if (!isObject(value)) return false
  const result = reduceObject(value, (state, value, key) => {
    if (state === false) throw Break
    if (!keyGuard(key)) return false
    if (!valueGuard(value)) return false
    return true
  }, objectOf<Optional<boolean>>(undefined))
  if (isUndefined(result)) return emptyMatches
  return result
}

/**
 * Returns all keys (if any) that are mapped to the target value.
 * @typeParam V - The type of the values in the record.
 * @param obj - The record or enum to search.
 * @param target - The value to search for.
 * @param [checkEquality=isEquality<unknown>] - A function to compare object values to the target value.
 * @returns An optional array of keys that have the specified value.
 */
export function keysForValue<T extends object>(
  obj: T,
  target: unknown,
  checkEquality: Combine<unknown, unknown, boolean> = isEquality<unknown>
): Bag<keyof T> {
  return reduceObject<Bag<keyof T>, T>(obj, (state, value, key) => {
    if (!checkEquality(value, target)) return state
    return bag(state, key)
  }, undefined)
}

/**
 * Reduces the keys and values of an object.
 * Stops execution if the reducer throws a `BreakExecution`.
 * Note that the order of the keys & values is not guaranteed.
 *
 * @typeParam S - The type of the state.
 * @typeParam T - The type of object to reduce.
 * @typeParam V - The type of the values in the object. Defaults to `unknown`.
 * @param obj - The object to be reduced.
 * @param reducer - The reducer function.
 * @param initialState - The initial state.
 * @returns The final state.
 */
export function reduceObject<S, T extends Record<keyof T, V>, V = unknown>(
  obj: T,
  reducer: Reducer<S, V, keyof T>,
  initialState: S): S {
  let state: S = initialState
  for (const key in obj) {
    const value = obj[key]
    try {
      state = reducer(state, value, key)
    }
    catch (exception) {
      return onBreakExecution(exception, state)
    }
  }
  return state
}

/**
 * Declares an object to be of a specific type.
 * Useful for type inference when the object is a literal.
 *
 * @typeParam T - The type of the object.
 * @param obj - The object to return
 * @returns The input object
 */
export function objectOf<T>(obj: T): T {
  return obj
}

/**
 * Returns a Transform that extracts the specified property from an object.
 *
 * @typeParam T - The type of the object that contains the property.
 * @typeParam K - The key of T to extract. Note that this should be the same value as the `property`.
 * @param property - The name of the property to extract. Note that this should be the same value as `K`
 * @returns A transform function that takes an object and returns the value of the specified property.
 */
export function plucker<T, K extends keyof T>(property: K): Transform<T, T[K]> {
  return (obj: T): T[K] => obj[property]
}

/**
 * Creates a `Record` of a specified key and value type.
 *
 * @typeParam K - The type of the keys in the object.
 * @typeParam V - The type of the values in the object.
 * @param [data={} as Record<K, V>] - An object to use as the record. Defaults to an empty object.
 * @returns An empty `object`.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export function recordOf<K extends PropertyKey, V>(data: Record<K, V> = {} as Record<K, V>): Record<K, V> {
  return data
}

/**
 * Creates type guard for Records with specific types of keys and values.
 *
 * @typeParam K - The type of the keys in the record. Must be a `PropertyKey`.
 * @typeParam V - The type of the values in the record.
 * @param keyGuard - A TypeGuard that checks the type of the object's keys.
 * @param valueGuard - A TypeGuard that checks the type of the object's values.
 * @param emptyMatches - The return value if the object is empty. Defaults to `true`.
 * @returns - Returns a TypeGuard for a specific form of `Record`
 */
export function typeGuardRecord<K extends PropertyKey, V>(
  keyGuard: TypeGuard<K>,
  valueGuard: TypeGuard<V>,
  emptyMatches = true
): TypeGuard<Record<K, V>> {
  return typeGuard(value => isRecordOf(value, keyGuard, valueGuard, emptyMatches))
}

/**
 * Creates a Predicate that validates the properties of an object.
 *
 * @typeParam T - The Type to check against.
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
 * Returns a type guard for the keys of an object.
 * @param example - The object to create the type guard for.
 * @returns A type guard function that checks if a value is a key of the object.
 */
export function typeGuardKeys<T extends object>(example: T): TypeGuard<keyof T> {
  return (value: unknown): value is keyof T => isKeyOf(value, example)
}

/**
 * Creates a type guard function that checks if a value is mapped to a key in the object.
 * Typically used for enum type guards, where the values are the primary constituents of the enum.
 * Also works for other key-value maps like `object` and `Record`,
 * though it makes less sense to base a type guard on mapped values for those types.
 *
 * @typeParam T - The type to guard.
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
