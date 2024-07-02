import { mapReducer, push } from "./arrays"
import { reduceBag } from "./bags"
import { onBreakExecution } from "./break"
import { isPlural } from "./typeGuards"
import type { Combine, Defined, Mapper, Reducer, Some } from "./types"

/**
 * Adds an element to a `Some`, resulting in an `Array` of elements.
 * If the `Some` is already an array, the element is pushed on to the array.
 * Otherwise, create a new array with the singular `Some` and the new element.
 *
 * @typeParam T - The e of the elements.
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

export function forSome<T>(some: Some<T>, callback: Combine<Defined<T>, number, void>): void {
  reduceSome(some, (state, value, index) => {
    callback(value, index)
    return state
  }, undefined)
}

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

export function reduceSome<S, V>(some: Some<V>, reducer: Reducer<S, Defined<V>, number>, initialState: S): S {
  return reduceBag(some, (state, value, index) => {
    // Since we're reducing Some<V>, we know that all values are Defined<V>.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return reducer(state, value as Defined<V>, index)
  }, initialState)
}
