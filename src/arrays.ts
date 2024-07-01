import { onBreakExecution } from "./break"
import { composeReducer, partialRight } from "./fp"
import { isExplicit, isUndefined, typeGuard } from "./typeGuards"
import * as t from "./types"

/**
 * Adds an element to a `Some`, resulting in an `Array` of elements.
 * If the `Some` is already an array, the element is appended to the array.
 * Otherwise, create a new array with the singular `Some` and the new element.
 *
 * @typeParam T - The type of the elements.
 * @param some - The array or element to add to.
 * @param more - The element to add.
 * @returns An array with the additional element.
 */
export function addMore<T>(some: t.Some<T>, more: T): T[] {
  if (isPlural(some)) {
    return appendSome(some, more)
  }
  return [some, more]
}

/**
 * A Reducer that appends its value to an array. Mutates the original array.
 *
 * @typeParam T - The type of elements in the array.
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
 * @typeParam T - The type of elements in the array.
 * @param array - The array to append the value to.
 * @param value - The value to append to the array if it is not `null` or `undefined`.
 * @returns - The updated array.
 */
export function appendExplicit<T>(array: t.Explicit<T>[], value: t.Possible<T>): t.Explicit<T>[] {
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
export function appendSome<T>(array: T[], value: t.Some<T>): T[] {
  if (Array.isArray(value)) {
    value.forEach(item => append(array, item))
    return array
  }
  return append(array, value)
}

/**
 * Creates a `TypeGuard` for an array of a specific type.
 *
 * @typeParam T - The type of elements in the array.
 * @param predicate - The predicate to check against each element of the array.
 * @param [emptyMatches=true] - Specifies whether an empty array qualifies as an array of the given type.
 * @returns - The type guard function.
 */
export function arrayGuard<T>(predicate: t.Predicate<T>, emptyMatches = true): t.TypeGuard<T[]> {
  return (value: unknown): value is T[] => isArrayOf(value, predicate, emptyMatches)
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
 * Adds a defined element to a `Bag<T>`.
 * Ignore the element if it is `undefined`.
 *
 * @typeParam T - The type of elements (if any) in the bag.
 * @param bag - The `Bag<T>` to add the element to.
 * @param element - The element to add to the bag, or `undefined` if there is no element to add.
 * @returns An `Array<T>` containing all elements from both `bag` and `element` if both are not `undefined`,
 *   or the `bag` if `element` is `undefined`,
 *   or `element` if `bag` is `undefined`,
 *   or `undefined` if both `bag` and `element` are `undefined`.
 */
export function bag<T>(bag: t.Bag<T>, element: t.Optional<T>): t.Bag<T> {
  if (isUndefined(bag)) return element
  if (isUndefined(element)) return bag
  return addMore(bag, element)
}

/**
 * Fills an array with values generated by a filler function.
 *
 * @typeParam T - The type of elements in the resulting array.
 * @param count - The number of elements to add to the array.
 * @param filler - A function that generates values (optionally) based on the array index.
 * @returns An array of elements generated by the filler function.
 */
export function fill<T>(count: number, filler: t.Transform<number, T>): T[] {
  const reducer = composeReducer<T[], number, T, number>(filler, append)
  return reiterate(count, reducer, arrayOf<T>())
}

/**
 * Apply a callback to each element in an array,
 * unless the callback throws `BreakException`,
 * in which case further execution halts.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array to iterate over.
 * @param callback - The callback function to apply to each element.
 */
export function forArray<T>(array: T[], callback: t.IndexedMapper<T, void>): void {
  reduceArray<undefined, T>(array, (_, value, index) => {
    callback(value, index)
    return undefined
  }, undefined)
}

/**
 * Apply a callback to each element in a `Some<T>`,
 * unless the callback throws `BreakException`,
 * in which case further execution halts.
 *
 * @typeParam T - The type of value(s).
 * @param some - The `Some<T>` to apply.
 * @param callback - The callback function to apply. If `some` is singular, then the index will be `0`.
 */
export function forSome<T>(some: t.Some<T>, callback: (value: t.Optional<T>, index: number) => void): void {
  reduceSome<undefined, T>(some, (_, value, index) => {
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
export function isArrayOf<T>(value: unknown, predicate: t.Predicate<T>, emptyMatches = true): value is T[] {
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
 * Checks if the given `Bag<T>` is an array of `T`.
 * Note that an empty array, or an array of one element, is still considered plural.
 *
 * @param value The `Bag<T>` to check.
 * @returns `true` if the value is an `Array<T>`, `false` if it is a single `T` or `undefined`.
 */
export function isPlural<T>(value: t.Bag<T>): value is T[] {
  // Undefined is not an array so we don't need to check it explicitly here.
  return Array.isArray(value)
}

/**
 * Checks if the given `Bag<T>` is a single `T`.
 *
 * @param value The `Bag<T>` to check.
 * @returns `true` if the value is a single `T`, `false` if it is an `Array<T>` or `undefined`.
 */
export function isSingular<T>(value: t.Bag<T>): value is T {
  return !isPlural(value) && !isUndefined(value)
}

/**
 * Checks if a value matches a type, an array of that type, or an empty array (potentially of that type).
 * @typeParam T - The type to check.
 * @param value - The value to check.
 * @param typeGuard - A function to check individual values
 * @returns `true` the value is of the specified type, an array of that type, or an empty array; `false` otherwise.
 */
export function isSome<T>(value: unknown, typeGuard: t.TypeGuard<T>): value is t.Some<T> {
  if (isArrayOf(value, typeGuard, true)) return true
  if (typeGuard(value)) return true
  return false
}

/**
 * Transform an array of one type to another type.
 * Note that the output array will have the same number of elements as the input array
 * unless the mapper throws a `BreakExecution`.
 *
 * @typeParam T - The type of the elements in the input array.
 * @typeParam R - The type of the elements in the output array.
 * @param array - The input array.
 * @param mapper - The `Mapper` to transform one element type to the other.
 * @returns The mapped array.
 */
export function mapArray<T, R>(array: T[], mapper: t.IndexedMapper<T, R>): R[] {
  return reduceArray<R[], T>(array, mapReducer(mapper), arrayOf<R>())
}

/**
 * Converts a `Mapper` into an array `Reducer`.
 *
 * @typeParam T - The type of input elements.
 * @typeParam R - The type of the output elements.
 * @param mapper - A function that maps the input element (and possibly the element's index) to the output element.
 * @returns A `Reducer` that transforms inputs to outputs and appends them to an array.
 */
export function mapReducer<T, R>(mapper: t.IndexedMapper<T, R>): t.Reducer<R[], t.Optional<T>, number> {
  return (state, value, index) => {
    const result = mapper(value, index)
    return append(state, result)
  }
}

/**
 * Transforms `Some<T>` to `Some<R>`.
 * If the value is plural, transform each element into a new `T[]`.
 * If the mapper breaks execution, return an empty array.
 *
 * @typeParam T - The type to transform from.
 * @typeParam R - The type to transform to.
 * @param some - The `Some<T>` to map.
 * @param mapper - The mapping function to apply. If `some` is singular, then the second parameter will be `0`.
 * @returns An `R` for a single `T`,
 *  or an array of `R` for an array of `T`,
 *  or an empty array if the mapper breaks execution on a single `T`.
 */
export function mapSome<T, R>(some: t.Some<T>, mapper: t.IndexedMapper<T, R>): t.Some<R> {
  if (isPlural(some)) {
    return mapArray(some, mapper)
  }
  try {
    return mapper(some, 0)
  }
  catch (exception) {
    return onBreakExecution(exception, [])
  }
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
  reducer: t.Reducer<S, t.Optional<T>, number>,
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
 * Reduce `Some<T>` to a single state `S`.
 * Note that a `BreakExecution` on a singular `T` will return the initial state.
 *
 * @typeParam S The type of the state.
 * @typeParam V The type of the value.
 * @param some - The `Some<T>` to reduce.
 * @param reducer - The reducer function. If `some` is singular, then the key/index will be `0`.
 * @param initialState - The initial state.
 * @returns The final state.
 */
export function reduceSome<S, V>(some: t.Some<V>, reducer: t.Reducer<S, t.Optional<V>, number>, initialState: S): S {
  if (isPlural(some)) {
    return reduceArray(some, reducer, initialState)
  }
  try {
    return reducer(initialState, some, 0)
  }
  catch (exception) {
    return onBreakExecution<S>(exception, initialState)
  }
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
export function reiterate<S>(count: number, reducer: t.Reducer<S, number, number>, initialState: S): S {
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
 * Converts a `TypeGuard<T>` into a `TypeGuard<Some<T>>`.
 * @typeParam T The underlying type to guard.
 * @param guard - The type guard for `T`
 * @returns A type guard for `Some<T>`.
 */
export function typeGuardSome<T>(guard: t.TypeGuard<T>): t.TypeGuard<t.Some<T>> {
  const predicate = partialRight<unknown, t.TypeGuard<T>, boolean>(isSome, guard)
  const forSome = typeGuard<t.Some<T>>(predicate)
  return forSome
}

/**
 * Unwraps an array, returning the array, the only element of the array, or `undefined` if there are no elements.
 * @typeParam T The type of the array elements.
 * @param value - The array to unwrap
 * @returns The the first array element if it's the only one,
 *   the whole array if there's more than one element,
 *   or `undefined` if the array is empty.
 */
export function unwrap<T>(value: T[]): t.Optional<t.Some<T>> {
  if (value.length === 0) return undefined
  if (value.length === 1) return value[0]
  return value
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
export function wrap<T>(value: t.Optional<t.Some<T>>): T[] {
  if (isUndefined(value)) return []
  if (isPlural(value)) return value
  return [value]
}

