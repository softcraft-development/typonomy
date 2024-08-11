import { isUndefined } from "./typeGuards"
import type { Action, Combine, Mapper, Optional, Reducer, Thunk, Transform, TypeGuard } from "./types"

/**
 * Swap the argument order of a Combine (arity-2) function.
 *
 * @typeParam A - The type of the first argument of the input Combine.
 * @typeParam B - The type of the second argument of the input Combine.
 * @typeParam R - The return type of the function.
 * @param combine - The function to commute.
 * @returns A new Combine that takes the arguments in reverse order.
 */
export function commute<A, B, R>(combine: Combine<A, B, R>): Combine<B, A, R> {
  return (b: B, a: A): R => combine(a, b)
}

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
 * Convert a Combine function into a Transform function.
 * This function transforms the first argument of the Combine function into another Transform function.
 * In turn, this second function transforms the second Combine argument into the return value.
 * Thus, `curry` converts an arity-2 function into two arity-1 functions.
 *
 * See also:
 *   * `yrruc`, which does the same, except with the opposite argument order.
 *   * `uncurry`, which does the opposite transformation.
 *
 * @param combine - The function to curry.
 * @returns A curried function that takes the first argument and returns a function that takes the second argument.
 */
export function curry<A, B, R>(combine: Combine<A, B, R>): Transform<A, Transform<B, R>> {
  return (a: A) => (b: B) => combine(a, b)
}

/**
 * Convert an arity-3 function into a Transform function.
 * This function transforms the first argument of the function
 * into a Combine function for the second and third arguments.
 * Thus, `curryLeft` converts an arity-3 function into an arity-1 function and arity-2 function.
 * To fully curry the original function, pass the results into `curry` or `yrruc` as appropriate.
 *
 * See also `curryMiddle` and `curryRight`, which do the same for the second and third arguments, respectively.
 * @typeParam A - The type of the first argument of the input function.
 * @typeParam B - The type of the second argument of the input function.
 * @typeParam C - The type of the third argument of the input function.
 * @typeParam R - The return type of the function.
 * @param fn - The function to curry.
 * @returns A curried function that takes the first argument
 *  and returns a function that takes the second and third arguments.
 */
export function curryLeft<A, B, C, R>(fn: (first: A, second: B, third: C) => R): Transform<A, Combine<B, C, R>> {
  return (first: A) => (second: B, third: C) => fn(first, second, third)
}

/**
 * Convert an arity-3 function into a Transform function.
 * This function transforms the second argument of the function
 * into a Combine function for the first and third arguments.
 * Thus, `curryMiddle` converts an arity-3 function into an arity-1 function and arity-2 function.
 * To fully curry the original function, pass the results into `curry` or `yrruc` as appropriate.
 *
 * See also `curryLeft` and `curryRight`, which do the same for the first and third arguments, respectively.
 * @typeParam A - The type of the first argument of the input function.
 * @typeParam B - The type of the second argument of the input function.
 * @typeParam C - The type of the third argument of the input function.
 * @typeParam R - The return type of the function.
 * @param fn - The function to curry.
 * @returns A curried function that takes the second argument
 *  and returns a function that takes the first and third arguments.
 */
export function curryMiddle<A, B, C, R>(fn: (first: A, second: B, third: C) => R): Transform<B, Combine<A, C, R>> {
  return (second: B) => (first: A, third: C) => fn(first, second, third)
}

/**
 * Convert an arity-3 function into a Transform function.
 * This function transforms the third argument of the function
 * into a Combine function for the first and second arguments.
 * Thus, `curryMiddle` converts an arity-3 function into an arity-1 function and arity-2 function.
 * To fully curry the original function, pass the results into `curry` or `yrruc` as appropriate.
 *
 * See also `curryLeft` and `curryMiddle`, which do the same for the first and second arguments, respectively.
 * @typeParam A - The type of the first argument of the input function.
 * @typeParam B - The type of the second argument of the input function.
 * @typeParam C - The type of the third argument of the input function.
 * @typeParam R - The return type of the function.
 * @param fn - The function to curry.
 * @returns A curried function that takes the third argument
 *  and returns a function that takes the first and second arguments.
 */
export function curryRight<A, B, C, R>(fn: (first: A, second: B, third: C) => R): Transform<C, Combine<A, B, R>> {
  return (third: C) => (first: A, second: B) => fn(first, second, third)
}

/**
 * Widen a mapping function to operate on `Optional` values.
 * `undefined` inputs will be translated to `undefined` outputs.
 *
 * @param map - The mapping function to apply.
 * @returns A new mapping function that operates on optional values.
 */
export function mapOptional<T, R>(map: Mapper<T, R>): Mapper<Optional<T>, Optional<R>> {
  return (value, index) => {
    if (isUndefined(value)) return value
    return map(value, index)
  }
}

/**
 * Ignore all parameters.
 */
export const noOp: Action<unknown> = () => { }

/**
 * Applies an offset to the numeric index of a reducer.
 *
 * @typeParam S - The type of the state.
 * @typeParam V - The type of the value.
 * @param reducer - The input reducer.
 * @param offset - The amount to add to the index.
 * @returns A new reducer function with the offset applied to the index parameter.
 */
export function offsetIndexReducer<S, V>(reducer: Reducer<S, V, number>, offset: number): Reducer<S, V, number> {
  return (state, value, index) => reducer(state, value, offset + index)
}

/**
 * Partially apply a value to a `Transform`.
 * Reduces the arity of the function from 1 to 0.
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
 * Reduces the arity of the function from 2 to 1.
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
 * Reduces the arity of the function from 2 to 1.
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
 * Return the input.
 *
 * @typeParam T - The type of value.
 * @param value - The input value.
 * @returns The same input value.
 */
export function passThrough<T>(value: T): T {
  return value
}

/**
 * Reduce a `value` if it matches the type guard for `V`.
 * Otherwise, ignore it and return the current state.
 *
 * @typeParam S - The type of the state.
 * @typeParam V - The type of value to reduce.
 * @typeParam X - The type of value to ignore.
 * @typeParam K - The type of the key.
 * @param typeGuard - The `TypeGuard<V>` to check if the value should be reduced.
 * @param reducer - The `Reducer<S,V,K>` to reduce matching values.
 * @returns A Reducer that accepts either `V` or `X` values.
 */
export function reduceIf<S, V, X, K>(
  typeGuard: TypeGuard<V>,
  reducer: Reducer<S, V, K>,
): Reducer<S, V | X, K> {
  return (state, value, key) => {
    if (typeGuard(value)) return reducer(state, value, key)
    return state
  }
}

/**
 * If a `value` of type `X` matches the type guard for `T`, then transform it using `Transform<T,R>`.
 * Otherwise, transform it using the `fallback` `Transform<X,R>`.
 *
 * Note that `Transform` functions do not necessarily need to consider their input values,
 * i.e.: they can be `Thunk<R>`.
 * This is useful for returning default values, especially for the `fallback` transform.
 *
 * If `R` is `void`, then the transforms can be callbacks, ie: `Action<T>` and `Action<X>`.
 *
 * @typeParam T - The type to be checked by the type guard.
 * @typeParam R - The type of the transformed value.
 * @typeParam X - The type of the input value.
 *
 * @param typeGuard - The `TypeGuard<T> used to check the value.
 * @param transform - The transform to apply to the value if the type guard returns `true`.
 * @param fallback - The transform to  apply to the value if the type guard returns `false`.
 *
 * @returns - The transformed value or the default value.
 */
export function transformIf<T, X, R>(
  typeGuard: TypeGuard<T>,
  transform: Transform<T, R>,
  fallback: Transform<X, R>): Transform<T | X, R> {
  return (value: T | X): R => {
    if (typeGuard(value)) return transform(value)
    return fallback(value)
  }
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

/**
 * Convert a curried function into a `Combine` function.
 * The function to uncurry is a `Transform` that returns a `Transform`.
 * The parameter to the first `Transform` becomes the first parameter of the resulting Combine function.
 * `uncurry` is thus the opposite transformation of `curry`.
 *
 * @param curried - The function to uncurry.
 * @returns A `Combine` whose first parameter is that of the first curried Transform,
 *  and second parameter is that of the resulting Transform.
 */
export function uncurry<A, B, R>(curried: Transform<A, Transform<B, R>>): Combine<A, B, R> {
  return (a: A, b: B): R => curried(a)(b)
}

/**
 * Convert a curried function into a `Combine` function.
 * The function to uncurry is a `Transform` that returns a `Transform`.
 * The parameter to the first `Transform` becomes the first parameter of the resulting Combine function.
 * `uncurry` is thus the opposite transformation of `curry`,
 * and so converts two arity-1 functions into an arity-2 function.
 *
 * See also:
 *   * `uncurry`, which does the same, except with the opposite argument order.
 *   * `yrruc`, which does the opposite transformation.

 * @param curried - The function to uncurry.
 * @returns A `Combine` whose first parameter is that of the first curried Transform,
 *  and second parameter is that of the resulting Transform.
 */
export function unyrruc<A, B, R>(curried: Transform<B, Transform<A, R>>): Combine<A, B, R> {
  return commute(uncurry(curried))
}

/**
 * Convert a Combine function into a Transform function.
 * This function transforms the second argument of the Combine function into another Transform function.
 * In turn, this second function transforms the first Combine argument into the return value.
 * Thus, `curry` converts an arity-2 function into two arity-1 functions.
 *
 * See also:
 *   * `curry`, which does the same, except with the opposite argument order.
 *   * `uncurry`, which does the opposite transformation.
 *
 * @param combine - The function to curry.
 * @returns A curried function that takes the second argument and returns a function that takes the first argument.
 */
export function yrruc<A, B, R>(combine: Combine<A, B, R>): Transform<B, Transform<A, R>> {
  return curry(commute(combine))
}
