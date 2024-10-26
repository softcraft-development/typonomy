import { onBreakExecution } from "./break"
import { composeReducer } from "./fp"
import { isExplicit, isUndefined } from "./nullish"
import * as types from "./types"

/**
 * Return a new array that includes all elements from the input array plus the value.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array of existing element.
 * @param value - The new element.
 * @returns - A new array including all elements.
 */
export function append<T>(array: T[], value: T): T[] {
  return [...array, value]
}

/**
 * If the `value` is not null or undefined, append it with the existing array.
 * Otherwise, return the existing array.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array of existing elements.
 * @param value - The new element.
 * @returns - The existing `array` if the `value` is `null` or `undefined`,
 *  or a new array including all elements.
 */
export function appendExplicit<T>(array: types.Explicit<T>[], value: types.Possible<T>): types.Explicit<T>[] {
  if (isExplicit(value)) {
    return append(array, value)
  }
  return array
}

/**
 * Creates an array of a specified size and type.
 *
 * @typeParam T - The type of elements in the array.
 * @param size - The size of the array to create. Defaults to 0.
 * @returns An array of the specified size and type.
 */
export function arrayOf<T>(size = 0): T[] {
  return new Array<T>(size)
}

/**
 * Fills an array with values generated by a filler function.
 *
 * @typeParam T - The type of elements in the resulting array.
 * @param count - The number of elements to add to the array.
 * @param filler - A function that generates values (optionally) based on the array index.
 * @returns An array of elements generated by the filler function.
 */
export function fill<T>(count: number, filler: types.Transform<number, T>): T[] {
  const reducer = composeReducer<T[], number, T, number>(filler, append)
  return reiterate(count, reducer, arrayOf<T>())
}

/**
 * Apply a callback to each element in an array,
 * unless the callback throws `BreakExecution`,
 * in which case further execution halts.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array to iterate over.
 * @param callback - The callback function to apply to each element and index.
 */
export function forArray<T>(array: T[], callback: (value: types.Optional<T>, index: number) => void): void {
  reduceArray<undefined, T>(array, (_, value, index) => {
    callback(value, index)
    return undefined
  }, undefined)
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
export function isArrayOf<T>(value: unknown, predicate: types.Predicate<T>, emptyMatches = true): value is T[] {
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
 * Transform an array of one type to another type.
 * Note that the output array will have the same number of elements as the input array
 * unless the mapper throws a `BreakExecution`.
 *
 * @typeParam T - The type of the elements in the input array.
 * @typeParam R - The type of the elements in the output array.
 * @param array - The input array.
 * @param mapper - The function to transform one element type to the other.
 * @returns The mapped array.
 */
export function mapArray<T, R>(array: T[], mapper: types.Mapper<types.Optional<T>, R>): R[] {
  return reduceArray<R[], T>(array, mapReducer(mapper), arrayOf<R>())
}

/**
 * Converts a indexed mapping function into an array `Reducer`.
 *
 * @typeParam T - The type of input elements.
 * @typeParam R - The type of the output elements.
 * @param mapper - A function that maps the input element (and possibly the element's index) to the output element.
 * @returns A `Reducer` that transforms inputs to outputs and appends them to an array.
 */
export function mapReducer<T, R>(mapper: types.Mapper<T, R>): types.Reducer<R[], T, number> {
  return (state, value, index) => {
    const result = mapper(value, index)
    return push(state, result)
  }
}

/**
 * Add an element to the end of an existing array.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array to mutate.
 * @param value - The new element.
 * @returns - The array, which now includes the new element.
 */
export function push<T>(array: T[], value: T): T[] {
  array.push(value)
  return array
}

/**
 * If the `value` is not null or undefined, push it into the existing array.
 * Otherwise, return the array unchanged.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array to mutate.
 * @param value - The new element.
 * @returns - The array, which includes the value if it is not `null` or `undefined`.
 */
export function pushExplicit<T>(array: types.Explicit<T>[], value: types.Possible<T>): types.Explicit<T>[] {
  if (isExplicit(value)) {
    return push(array, value)
  }
  return array
}

/**
 * Reduces elements of an array-like object to a single value by iterating over a sequential list of indices.
 * Stops execution if the reducer throws a `BreakExecution`.
 *
 * @typeParam S - The type of the resulting state.
 * @typeParam T - The type of the elements in the array-like object.
 * @param arrayLike - The array-like object to reduce.
 * @param reducer - The function that returns the next State for each element.
 * @param initialState - The initial state for the first call to `reducer`.
 * @param startIndex - The first index to request. Defaults to `0`
 * @param endIndex - The last index to request. Defaults to the last index of `arrayLike`
 * @returns The final state.
 */
export function reduceArray<S, T>(
  arrayLike: ArrayLike<T>,
  reducer: types.Reducer<S, types.Optional<T>, number>,
  initialState: S,
  startIndex = 0,
  endIndex = arrayLike.length - 1,
): S {
  let state = initialState
  for (let index = startIndex; index <= endIndex; index++) {
    try {
      state = reducer(state, arrayLike[index], index)
    }
    catch (exception) {
      return onBreakExecution<S>(exception, state)
    }
  }
  return state
}

/**
 * Calls a reducer function a specified number of times and returns the final state.
 * Passes the current iteration number as the value (starting from 1)
 * and a zero-based index as the key to the reducer.
 * Stops execution if the reducer throws a `BreakExecution`.
 *
 * @typeParam S - The type of the state.
 * @param count - The number of times to repeat the reducer function.
 * @param reducer - The Reducer to execute.
 * @param initialState - The initial state.
 * @returns - The final state.
 */
export function reiterate<S>(count: number, reducer: types.Reducer<S, number, number>, initialState: S): S {
  let state = initialState
  for (let index = 0; index < count; index += 1) {
    try {
      state = reducer(state, index + 1, index)
    }
    catch (exception) {
      return onBreakExecution<S>(exception, state)
    }
  }
  return state
}

/**
 * Wraps a value or an array of values into an array.
 * If the input is already an array, return it as is.
 * If the input is a single defined value, wrap it in a new array.
 * If the input is `undefined`, return an empty array.
 * @typeParam T The type of the array elements.
 * @param value - The value or array of values to wrap, if present.
 * @returns A the value if it's already an array, or a new array that contains the value if it is not `undefined`.
 */
export function wrap<T>(value: types.Bag<T>): T[] {
  if (isUndefined(value)) return []
  if (Array.isArray(value)) return value
  return [value]
}

