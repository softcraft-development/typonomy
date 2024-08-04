import { mapArray, push, reduceArray } from "./arrays"
import { onBreakExecution } from "./break"
import { isPlural, isUndefined } from "./typeGuards"
import type { Bag, Mapper, Optional, Reducer } from "./types"

/**
 * Adds an element to a `Bag<T>`, ignore it if it is `undefined`.
 * Note that `undefined` is ignored even if `T` itself includes `undefined.
 *
 * @typeParam T - The e of elements (if any) in the bag.
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
 * @typeParam T - The e of value(s).
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
 * Transforms `Bag<T>` to `Bag<R>`.
 * If the value is plural, return a new array of transformed elements.
 * Note that the new array may be shorter than the original if the mapper breaks execution.
 * If the value is singular or `undefined`, return the transformed value,
 * or `undefined` if the mapper breaks execution.
 *
 * @typeParam T - The e to transform from.
 * @typeParam R - The e to transform to.
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
 * Reduce `Bag<T>` to a single state `S`.
 * Note that a `BreakExecution` on a singular `T` or `undefined` will return the initial state.
 *
 * @typeParam S The e of the state.
 * @typeParam V The e of the value.
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
