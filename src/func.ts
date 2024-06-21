/**
 * A function that does something to a value, but doesn't return anything.
 * Generally used for side effects.
 * @template T Any type.
 */
export type Action<T> = (value: T) => void

/**
 * A function that transforms one Transform function into another.
 * If you want a function that transforms one type <B> to another type <R>,
 * but only know/have a function that converts another type <A> to that same type <R>,
 * a MetaTransform will help get you from <A> to <B>.
 *
 * @template A The input type that you have.
 * @template B The input type that you want.
 * @template R The output type.
 *
 * @param fn The Transform function that you have.
 * @returns The Transform function that you want.
 */
export type MetaTransform<A, B, R> = (fn: Transform<A, R>) => Transform<B, R>

/**
 * Represents a function returns true or false for a given value..
 * @template T The type of the value being evaluated by the predicate.
 * @param value The value to be evaluated by the predicate.
 * @returns A boolean indicating whether the value satisfies the predicate condition.
 */
export type Predicate<T> = (value: T) => boolean

/**
 * A function combines a previous state, a value, and a key into a new state.
 * Since the old and new state are of the same type, this "reduces" the value and key into the new state.
 * @template S The type of the state.
 * @template V The type of the value.
 * @template K The type of the key.
 *  Typically a string, though frequently a number, in which case it's often called an "index".
 * @param state The current state. Note that this value may be mutated, depending on the reducer.
 * @param value The value to be applied to the state.
 * @param key The key or index associated with the value.
 * @returns The new state after applying the value.
 */
export type Reducer<S, V, K> = (state: S, value: V, key: K) => S

/**
 * A function that combines two values to produce a new value.
 * @template A The type of the first input.
 * @template B The type of the second input.
 * @template R The type of the result.
 * @param a The first value.
 * @param b The second value.
 * @returns The result of combining the two values.
 */
export type Synthesis<A, B, R> = (a: A, b: B) => R

/**
 * A function that returns a value based on no direct input.
 * Often used as a closure, taking its input from external scope.
 * @template R The return type of the thunk.
 */
export type Thunk<R> = () => R

/**
 * A function that transforms one value into another.
 * @template T The input type.
 * @template R The output type.
 * @param value The value to be transformed.
 * @returns The transformed value.
 */
export type Transform<T, R> = (value: T) => R

/**
 * A function that only performs side effects, based on no direct input.
 * The love child between an Action and a Thunk.
 * @typedef Trigger
 */
export type Trigger = () => void

/**
 * Create a Predicate that returns true if all input `Predicate` are true.
 * @type T - The type of value to test.
 * @param predicates - The `Predicate` to test against.
 * @returns A `Predicate` that returns true if all input `Predicate` are true.
 */
export function all<T>(...predicates: Predicate<T>[]): Predicate<T> {
  return value => predicates.every(predicate => predicate(value))
}

/**
 * Create a `Predicate` based on both input `Predicate` returning `true`.
 * @type T - The type of value to test.
 * @param a - The first `Predicate` to test against.
 * @param b - The second `Predicate` to test against.
 * @returns A Predicate that returns true if both inputs are true.
 */
export function and<T>(a: Predicate<T>, b: Predicate<T>): Predicate<T> {
  return (value): boolean => a(value) && b(value)
}

/**
 * Create a Predicate that returns true if any input `Predicate` is true.
 * @type T - The type of value to test.
 * @param predicates - The `Predicate` to test against.
 * @returns A `Predicate` that returns true if any input `Predicate` are true.
 */
export function any<T>(...predicates: Predicate<T>[]): Predicate<T> {
  return value => predicates.some(predicate => predicate(value))
}

/**
 * Composes a new transform from two existing transforms via an intermediate type.
 *
 * @template T The input type.
 * @template I The intermediate type.
 * @template R The result type.
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
 * Composes a new Synthesis from an existing Synthesis that returns an intermediate type
 * and a Transform that transforms the intermediate type to the result type.
 *
 * @template A - The type of the left argument of the new Synthesis.
 * @template B - The type of the right argument of the new Synthesis.
 * @template I - The type of the intermediate value.
 * @template R - The type of the result.
 *
 * @param synthesizeIntermediate - The synthesis function that returns the intermediate type.
 * @param toResult - The function that transforms the intermediate type to the result type.
 *
 * @returns - The composed synthesis function.
 */
export function composeDown<A, B, I, R>(
  synthesizeIntermediate: Synthesis<A, B, I>,
  toResult: Transform<I, R>,
): Synthesis<A, B, R> {
  return (a: A, b: B): R => {
    return toResult(synthesizeIntermediate(a, b))
  }
}

/**
 * Composes a new Synthesis from an existing Synthesis for an intermediate type
 * and a Transform that transforms the first (left) type to that intermediate type.
 *
 * @template A - The type of the left argument of the new Synthesis.
 * @template B - The type of the right argument of the new Synthesis.
 * @template I - The type of the intermediate value.
 * @template R - The type of the result.
 *
 * @param toIntermediate - The function that transforms the left type to the intermediate type.
 * @param synthesizeIntermediate - The synthesis function for the intermediate type.
 *
 * @returns - The composed synthesis function.
 */
export function composeLeft<A, B, I, R>(
  toIntermediate: Transform<A, I>,
  synthesizeIntermediate: Synthesis<I, B, R>,
): Synthesis<A, B, R> {
  return (a: A, b: B): R => {
    return synthesizeIntermediate(toIntermediate(a), b)
  }
}

/**
 * Composes a new Reducer from an existing Reducer for an intermediate type
 * and a Synthesis that transforms values and/or keys to that intermediate type.
 *
 * @template S The type of the state.
 * @template V The type of the value to reduce.
 * @template I The type of the intermediate value.
 * @template K The type of the reducer key.
 * @param toIntermediate The Synthesis function that transforms reducer values to intermediate values.
 * @param reduceIntermediate The Reducer function for the intermediate type.
 *  Note that this can be a Transform<V, I> function if the key <K> is irrelevant.
 * @returns A Reducer function for the value type.
 */
export function composeReducer<S, V, I, K>(
  toIntermediate: Synthesis<V, K, I>,
  reduceIntermediate: Reducer<S, I, K>,
): Reducer<S, V, K> {
  return (state, value, key) => reduceIntermediate(state, toIntermediate(value, key), key)
}

/**
 * Composes a new Synthesis from an existing Synthesis for an intermediate type
 * and a Transform that transforms the second (right) type to that intermediate type.
 *
 * @template A - The type of the left argument of the new Synthesis.
 * @template B - The type of the right argument of the new Synthesis.
 * @template I - The type of the intermediate value.
 * @template R - The type of the result.
 *
 * @param synthesizeIntermediate - The synthesis function for the intermediate type.
 * @param toIntermediate - The function that transforms the right type to the intermediate type.
 *
 * @returns - The composed synthesis function.
 */
export function composeRight<A, B, I, R>(
  toIntermediate: Transform<B, I>,
  synthesizeIntermediate: Synthesis<A, I, R>,
): Synthesis<A, B, R> {
  return (a: A, b: B): R => {
    return synthesizeIntermediate(a, toIntermediate(b))
  }
}

/**
 * Negates a `Predicate`.
 *
 * @param predicate - The Predicate to negate.
 * @returns A new Predicate that returns the opposite value of the input Predicate.
 */
export function not<T>(predicate: Predicate<T>): Predicate<T> {
  return value => !predicate(value)
}

/**
 * Create a `Predicate` based on either input `Predicate` returning `true`.
 * @type T - The type of value to test.
 * @param a - The first `Predicate` to test against.
 * @param b - The second `Predicate` to test against.
 * @returns A Predicate that returns `true` if either inputs are `true`.
 */
export function or<T>(a: Predicate<T>, b: Predicate<T>): Predicate<T> {
  return (value): boolean => a(value) || b(value)
}

/**
 * Repeats a reducer function a specified number of times and returns the final state.
 * Passes the current iteration number as the value (starting from 1)
 * and a zero-based index as the key to the reducer.
 *
 * @template S - The type of the state.
 * @param count - The number of times to repeat the reducer function.
 * @param reducer - The Reducer to execute.
 * @param initialState - The initial state.
 * @returns - The final state.
 */
export function reiterate<S>(count: number, reducer: Reducer<S, number, number>, initialState: S): S {
  let state = initialState
  for (let index = 0; index < count; index += 1) {
    state = reducer(state, index + 1, index)
  }
  return state
}
