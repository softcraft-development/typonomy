import { isArrayOf, mapArray, push, reduceArray } from "./arrays"
import { onBreakExecution } from "./break"
import { or } from "./logic"
import { isUndefined } from "./nullish"
import type { Bag, Defined, Mapper, Optional, Reducer, TypeGuard } from "./types"

/**
 * Adds an element to a `Bag<T>`, ignore it if it is `undefined`.
 * Note that `undefined` is ignored even if `T` itself includes `undefined.
 *
 * @typeParam T - The type of elements (if any) in the bag.
 * @param previous - The `Bag<T>` to add the element to.
 * @param more - The element to add to the bag, or `undefined` if there is no element to add.
 * @returns An `Array<T>` containing all elements from both `bag` and `element` if neither are `undefined`,
 *   or the `bag` if `element` is `undefined`,
 *   or `element` if `bag` is `undefined`,
 *   or `undefined` if both `bag` and `element` are `undefined`.
 */
export function bag<T>(previous: Bag<T>, more?: T): Bag<T> {
  if (isUndefined(previous)) return more
  if (isUndefined(more)) return previous
  if (isPlural(previous)) return push(previous, more)
  return [previous, more]
}

/**
 * Returns the number of items in the `Bag`.
 *
 * @param bag - The `Bag`.
 * @returns The number of items in the bag. Always returns number that is non-negative and finite.
 */
export function bagSize(bag: Bag<unknown>): number {
  if (isUndefined(bag)) return 0
  if (isPlural(bag)) return bag.length
  return 1
}

/**
 * Apply a callback to each element in a `Bag<T>`,
 * unless the callback breaks execution.
 *
 * @typeParam T - The type of value in the `Bag`.
 * @param bag - The `Bag<T>` on which to apply the callback.
 * @param callback - The callback function to apply. If `bag` is singular, then the index will be `0`.
 */
export function forBag<T>(bag: Bag<T>, callback: (value: Optional<T>, index: number) => void): void {
  reduceBag<undefined, T>(bag, (_, value, index) => {
    callback(value, index)
    return undefined
  }, undefined)
}

/**
 * Checks a value is a `Bag` of values that could match a specific type.
 * @typeParam T - The type to check.
 * @param value - The value to check.
 * @param typeGuard - A function to check individual values
 * @returns `true` the value is of the specified type,
 *  `undefined`, an array of that type or `undefined`, or an empty array; `false` otherwise.
 */
export function isBag<T>(value: unknown, typeGuard: TypeGuard<T>): value is Bag<T> {
  if (isUndefined(value)) return true
  if (isArrayOf(value, or(isUndefined, typeGuard), true)) return true
  if (typeGuard(value)) return true
  return false
}

/**
   * Checks if the given `Bag<T>` is an array of `T`.
   * Note that an empty array, or an array of one element, or an array of `undefined`
   * are all still considered plural.
   *
   * @param value The `Bag<T>` to check.
   * @returns `true` if the value is an `Array<T>`, `false` if it is a single `T` or `undefined`.
   */
export function isPlural<T>(value: Bag<T>): value is T[] {
  // Undefined is not an array so we don't need to check it explicitly here.
  return Array.isArray(value)
}

/**
   * Checks if the given `Bag<T>` is a single `T`.
   *
   * @param value The `Bag<T>` to check.
   * @returns `true` if the value is a single `T`, `false` if it is an `Array<T>` or `undefined`.
   */
export function isSingular<T>(value: Bag<T>): value is Defined<T> {
  if (isPlural(value)) return false
  if (isUndefined(value)) return false
  return true
}

/**
 * Transforms `Bag<T>` to `Bag<R>`.
 * If the value is plural, return a new array of transformed elements.
 * Note that the new array may be shorter than the original if the mapper breaks execution.
 * If the value is singular or `undefined`, return the transformed value,
 * or `undefined` if the mapper breaks execution.
 *
 * @typeParam T - The type to transform from.
 * @typeParam R - The type to transform to.
 * @param bag - The `Bag<T>` to map.
 * @param mapper - The mapping function to apply. If `bag` is singular, then the index will be `0`.
 * @returns A `Bag<R>` containing the transformed values.
 */
export function mapBag<T, R>(bag: Bag<T>, mapper: Mapper<Optional<T>, R>): Bag<R> {
  if (isPlural(bag)) {
    return mapArray(bag, mapper)
  }
  try {
    return mapper(bag, 0)
  }
  catch (error) {
    return onBreakExecution(error, undefined)
  }
}

/**
 * Reduce `Bag<V>` to a single state `S`.
 * Note that a `BreakExecution` on a singular `V` or `undefined` will return the initial state.
 *
 * @typeParam S The type of the state.
 * @typeParam V The type of the value.
 * @param bag - The `Bag<T>` to reduce.
 * @param reducer - The reducer function. If `bag` is singular or `undefined, then the key/index will be `0`.
 * @param initialState - The initial state.
 * @returns The final state.
 */
export function reduceBag<S, V>(
  bag: Bag<V>,
  reducer: Reducer<S, Optional<V>, number>,
  initialState: S
): S {
  if (isPlural(bag)) return reduceArray(bag, reducer, initialState)
  try {
    return reducer(initialState, bag, 0)
  }
  catch (error) {
    return onBreakExecution(error, initialState)
  }
}
