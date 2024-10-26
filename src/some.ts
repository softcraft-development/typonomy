import { isArrayOf, mapReducer, push } from "./arrays"
import { isPlural, reduceBag } from "./bags"
import { onBreakExecution } from "./break"
import type { Combine, Defined, Mapper, Reducer, Some, TypeGuard } from "./types"

/**
 * Adds an element to a `Some`, resulting in an `Array` of elements.
 * If the `Some` is already an array, the element is pushed on to the array.
 * Otherwise, create a new array with the singular `Some` and the new element.
 *
 * @typeParam T - The type of the elements.
 * @param some - The array or element to add to.
 * @param more - The element to add.
 * @returns An array with the additional element.
 */
export function addMore<T>(some: Some<T>, more: Defined<T>): Defined<T>[] {
  if (isPlural(some)) {
    return push(some, more)
  }
  return [some, more]
}

/**
 * Apply a callback to each element in a `Some<T>`,
 * unless the callback breaks execution.
 *
 * @typeParam T - The type of value in the `Some`.
 * @param some - The `Some<T>` on which to apply the callback.
 * @param callback - The callback function to apply. If `some` is singular, then the index will be `0`.
 */
export function forSome<T>(some: Some<T>, callback: Combine<Defined<T>, number, void>): void {
  reduceSome(some, (state, value, index) => {
    callback(value, index)
    return state
  }, undefined)
}

/**
   * Checks if a value matches a type or a non-empty array of that type.
   * @typeParam T - The type to check.
   * @param value - The value to check.
   * @param typeGuard - A function to check individual values.
   * @returns `true` the value is of the specified type or a non-empty array of that type; `false` otherwise.
   */
export function isSome<T>(value: unknown, typeGuard: TypeGuard<T>): value is Some<T> {
  if (isArrayOf(value, typeGuard, false)) return true
  if (typeGuard(value)) return true
  return false
}

/**
 * Transforms `Some<T>` to `Some<R>`.
 * If the value is plural, return a new array of transformed elements.
 * Note that the new array may be shorter than the original if the mapper breaks execution.
 * If the value is singular return the transformed value,
 * or an empty array if the mapper breaks execution.
 *
 * @typeParam T - The type to transform from.
 * @typeParam R - The type to transform to.
 * @param some - The `Some<T>` to map.
 * @param mapper - The mapping function to apply. If `some` is singular, then the index will be `0`.
 * @returns A `Some<R>` containing the transformed values.
 *  May be an empty array if the mapper breaks execution on a singular `some`.
 */
export function mapSome<T, R>(some: Some<T>, mapper: Mapper<Defined<T>, Defined<R>>): Some<R> {
  if (isPlural(some)) {
    const reducer = mapReducer(mapper)
    return reduceSome<Defined<R>[], T>(some, reducer, [])
  }
  try {
    return mapper(some, 0)
  }
  catch (error) {
    return onBreakExecution(error, [])
  }
}

/**
 * Reduce `Some<V>` to a single state `S`.
 * Note that a `BreakExecution` on a singular `V` will return the initial state.
 *
 * @typeParam S The type of the state.
 * @typeParam V The type of the value.
 * @param some - The `Some<V>` to reduce.
 * @param reducer - The reducer function. If `bag` is singular, then the key/index will be `0`.
 * @param initialState - The initial state.
 * @returns The final state.
 */
export function reduceSome<S, V>(some: Some<V>, reducer: Reducer<S, Defined<V>, number>, initialState: S): S {
  return reduceBag(some, (state, value, index) => {
    // Since we're reducing Some<V>, we know that all values are Defined<V>.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return reducer(state, value as Defined<V>, index)
  }, initialState)
}

/**
 * Returns the number of items in the `Some`.
 *
 * @param some - The `Some`.
 * @returns The number of items in the `Some`. Always returns number that is positive and finite.
 */
export function someSize(some: Some<unknown>): number {
  if (isPlural(some)) return some.length
  return 1
}
