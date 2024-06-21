import { composeReducer, reiterate, type Combine, type Predicate, type Reducer, type Transform } from "./func"
import { isExplicit, type Explicit, type Possible } from "./nullish"
import type { TypeGuard } from "./types"

export type Some<T> = T | T[]

/**
 * A Reducer that appends its value to an array. Mutates the original array.
 *
 * @template T - The type of elements in the array.
 * @param array - The array to append the value to.
 * @param value - The value to append to the array.
 * @returns - The updated array with the value appended.
 */
export function append<T>(array: T[], value: T): T[] {
  array.push(value)
  return array
}

/**
 * Appends a value to an array only if the value is neither `null` nor `undefined`.
 *
 * @template T - The type of elements in the array.
 * @param array - The array to append the value to.
 * @param value - The value to append to the array if it is not `null` or `undefined`.
 * @returns - The updated array.
 */
export function appendExplicit<T>(array: Explicit<T>[], value: Possible<T>): Explicit<T>[] {
  if (isExplicit(value)) {
    array.push(value)
  }
  return array
}

/**
 * Appends a value, or all elements of an array of values, to an array.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array to append values to.
 * @param value - The value or array of values to append.
 * @returns The updated array with the appended value(s).
 */
export function appendSome<T>(array: T[], value: Some<T>): T[] {
  if (Array.isArray(value)) {
    value.forEach(item => append(array, item))
    return array
  }
  return append(array, value)
}

/**
 * Creates a `TypeGuard` for an array of a specific type.
 *
 * @template T - The type of elements in the array.
 * @param predicate - The predicate to check against each element of the array.
 * @param [emptyMatches=true] - Specifies whether an empty array qualifies as an array of the given type.
 * @returns - The type guard function.
 */
export function arrayGuard<T>(predicate: Predicate<T>, emptyMatches = true): TypeGuard<T[]> {
  return (value: unknown): value is T[] => isArrayOf(value, predicate, emptyMatches)
}

/**
 * Creates an array of a specified size and type.
 *
 * @template T - The type of elements in the array.
 * @param size - The size of the array to create. Defaults to 0.
 * @returns An array of the specified size and type.
 */
export function arrayOf<T>(size = 0): T[] {
  return new Array<T>(size)
}

/**
 * Fills an array with values generated by a filler function.
 *
 * @template T - The type of elements in the resulting array.
 * @param count - The number of elements to add to the array.
 * @param filler - A function that generates values (optionally) based on the array index.
 * @returns An array of elements generated by the filler function.
 */
export function fill<T>(count: number, filler: Transform<number, T>): T[] {
  const reducer = composeReducer<T[], number, T, number>(filler, append)
  return reiterate(count, reducer, arrayOf<T>())
}

/**
 * Apply a callback to each element in a `Some<T>`.
 * @type T - The type of value(s).
 * @param some - The `Some<T>` to apply.
 * @param callback - The callback function to apply. If `some` is singular, then the index will be `0`.
 * @returns `void`.
 */
export function forSome<T>(some: Some<T>, callback: (value: T, index: number) => void): void {
  if (isPlural(some)) {
    some.forEach((value, index) => callback(value, index))
    return
  }
  callback(some, 0)
}

/**
 * Checks if a value is an array of a specific type.
 *
 * @param value - The value to check.
 * @param predicate - The Predicate to check each item in the array.
 * @param emptyMatches - The value to return when the array is empty, and the type cannot be defined by the value.
 *  Defaults to `true`.
 * @returns `true` if the value is an array of the specified type, `false` otherwise.
 */
export function isArrayOf<T>(value: unknown, predicate: Predicate<T>, emptyMatches = true): value is T[] {
  if (!Array.isArray(value)) return false
  if (value.length === 0) return emptyMatches
  return value.every(predicate)
}

/**
 * Checks if the given value is an empty array.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an empty array, `false` otherwise.
 */
export function isEmptyArray(value: unknown): value is [] {
  return Array.isArray(value) && value.length === 0
}

/**
 * Checks if the given `Some<T>` is an array of `T`
 *
 * @param value The `Some<T>` to check.
 * @returns Returns true if the value is an `Array<T>`, false if it is a single `T`.
 */
export function isPlural<T>(value: Some<T>): value is T[] {
  return Array.isArray(value)
}

/**
 * Checks if the given `Some<T>` is a single `T`
 *
 * @param value The `Some<T>` to check.
 * @returns Returns true if the value is a single `T`, false if it is an `Array<T>`.
 */
export function isSingular<T>(value: Some<T>): value is T {
  return !isPlural(value)
}

/**
 * Transforms `Some<F>` to `Some<T>`.
 * If the value is plural, transform each element into a new `T[]`
 *
 * @type F - The type to transform from.
 * @type T - The type to transform to.
 * @param some - The `Some<F>` to map.
 * @param mapper - The mapping function to apply. If `some` is singular, then the second parameter will be `0`.
 * @returns The transformed `Some<T>`.
 */
export function mapSome<F, T>(some: Some<F>, mapper: Combine<F, number, T>): Some<T> {
  if (isPlural(some)) {
    return some.map(mapper)
  }
  return mapper(some, 0)
}

/**
 * Reduce `Some<T>` to a single state.
 * @template S The type of the state.
 * @template V The type of the value.
 * @param some - The `Some<T>` to reduce.
 * @param reducer - The reducer function. If `some` is singular, then the key/index will be `0`.
 * @param initialState - The initial state.
 * @returns The final state.
 */
export function reduceSome<S, V>(some: Some<V>, reducer: Reducer<S, V, number>, initialState: S): S {
  if (isSingular(some)) {
    return reducer(initialState, some, 0)
  }
  return some.reduce(reducer, initialState)
}

/**
 * Wraps a value or an array of values into an array.
 * If the input is already an array, it is returned as is.
 * If the input is a single value, it is wrapped in an array.
 *
 * @param value - The value or array of values to wrap.
 * @returns The wrapped array.
 */
export function wrap<T>(value: Some<T>): T[] {
  return isPlural(value) ? value : [value]
}

