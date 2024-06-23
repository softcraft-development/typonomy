import type { Combine, Reducer, Thunk, Transform } from "./types"

/**
 * Composes a new transform from two existing transforms via an intermediate type.
 *
 * @typeParam T The input type.
 * @typeParam I The intermediate type.
 * @typeParam R The result type.
 * @param toIntermediate A transform to from the input to the intermediate type.
 * @param toResult A transform from the intermediate type to the result type.
 * @returns The composed transform function.
 */
export function compose<T, I, R>(
  toIntermediate: Transform<T, I>,
  toResult: Transform<I, R>,
): Transform<T, R> {
  return (value: T): R => {
    return toResult(toIntermediate(value))
  }
}

/**
 * Composes a new Combine from an existing Combine that returns an intermediate type
 * and a Transform that transforms the intermediate type to the result type.
 *
 * @typeParam A - The type of the left argument of the new Combine.
 * @typeParam B - The type of the right argument of the new Combine.
 * @typeParam I - The type of the intermediate value.
 * @typeParam R - The type of the result.
 *
 * @param combineIntermediate - The Combine that returns the intermediate type.
 * @param toResult - The function that transforms the intermediate type to the result type.
 *
 * @returns - The composed Combine function.
 */
export function composeDown<A, B, I, R>(
  combineIntermediate: Combine<A, B, I>,
  toResult: Transform<I, R>,
): Combine<A, B, R> {
  return (a: A, b: B): R => {
    return toResult(combineIntermediate(a, b))
  }
}

/**
 * Composes a new Combine from an existing Combine for an intermediate type
 * and a Transform that transforms the first (left) type to that intermediate type.
 *
 * @typeParam A - The type of the left argument of the new Combine.
 * @typeParam B - The type of the right argument of the new Combine.
 * @typeParam I - The type of the intermediate value.
 * @typeParam R - The type of the result.
 *
 * @param toIntermediate - The function that transforms the left type to the intermediate type.
 * @param combineIntermediate - The Combine function for the intermediate type.
 *
 * @returns - The composed Combine function.
 */
export function composeLeft<A, B, I, R>(
  toIntermediate: Transform<A, I>,
  combineIntermediate: Combine<I, B, R>,
): Combine<A, B, R> {
  return (a: A, b: B): R => {
    return combineIntermediate(toIntermediate(a), b)
  }
}

/**
 * Composes a new Reducer from an existing Reducer for an intermediate type
 * and a Combine that transforms values and/or keys to that intermediate type.
 *
 * @typeParam S The type of the state.
 * @typeParam V The type of the value to reduce.
 * @typeParam I The type of the intermediate value.
 * @typeParam K The type of the reducer key.
 * @param toIntermediate The Combine function that transforms reducer values to intermediate values.
 * @param reduceIntermediate The Reducer function for the intermediate type.
 *  Note that this can be a Transform<V, I> function if the key <K> is irrelevant.
 * @returns A Reducer function for the value type.
 */
export function composeReducer<S, V, I, K>(
  toIntermediate: Combine<V, K, I>,
  reduceIntermediate: Reducer<S, I, K>,
): Reducer<S, V, K> {
  return (state, value, key) => reduceIntermediate(state, toIntermediate(value, key), key)
}

/**
 * Composes a new Combine from an existing Combine for an intermediate type
 * and a Transform that transforms the second (right) type to that intermediate type.
 *
 * @typeParam A - The type of the left argument of the new Combine.
 * @typeParam B - The type of the right argument of the new Combine.
 * @typeParam I - The type of the intermediate value.
 * @typeParam R - The type of the result.
 *
 * @param combineIntermediate - The Combine function for the intermediate type.
 * @param toIntermediate - The function that transforms the right type to the intermediate type.
 *
 * @returns - The composed Combine function.
 */
export function composeRight<A, B, I, R>(
  toIntermediate: Transform<B, I>,
  combineIntermediate: Combine<A, I, R>,
): Combine<A, B, R> {
  return (a: A, b: B): R => {
    return combineIntermediate(a, toIntermediate(b))
  }
}

/**
 * Partially apply a value to a `Transform`.
 * Reduces the order of the function from 1 to 0.
 *
 * @typeParam T The type of the value to transform.
 * @typeParam R The type of the result.
 * @param transform The transform function.
 * @param value The value to partially apply to the transform.
 * @returns A Thunk function that returns the transformed input value.
 */
export function partial<T, R>(transform: Transform<T, R>, value: T): Thunk<R> {
  return () => transform(value)
}

/**
 * Partially apply a value to the left (first) parameter of a `Combine`.
 * Reduces the order of the function from 2 to 1.
 *
 * @typeParam A - The type of the left argument of the `Combine`.
 * @typeParam B - The type of the right argument of the `Combine`.
 * @typeParam R - The type of the result.
 * @param combine The `Combine` function.
 * @param value The value to partially apply to left parameter of the `Combine`.
 * @returns A `Transform` function function for the right parameter of the `Combine`.
 */
export function partialLeft<A, B, R>(combine: Combine<A, B, R>, value: A): Transform<B, R> {
  return (b: B) => combine(value, b)
}

/**
 * Partially apply a value to the right (second) parameter of a `Combine`.
 * Reduces the order of the function from 2 to 1.
 *
 * @typeParam A - The type of the left argument of the `Combine`.
 * @typeParam B - The type of the right argument of the `Combine`.
 * @typeParam R - The type of the result.
 * @param combine The `Combine` function.
 * @param value The value to partially apply to right parameter of the `Combine`.
 * @returns A `Transform` function function for the left parameter of the `Combine`.
 */
export function partialRight<A, B, R>(combine: Combine<A, B, R>, value: B): Transform<A, R> {
  return (a: A) => combine(a, value)
}

/**
 * Creates a `Thunk`= that returns the provided value.
 * @typeParam T - The type of the value.
 * @param value - The value to be returned by the `Thunk`.
 * @returns A function that returns the provided value.
 */
export function thunk<T>(value: T): Thunk<T> {
  return () => value
}

