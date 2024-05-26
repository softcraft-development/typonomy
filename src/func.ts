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
 * A function combines a previous state, a value, and a key into a new state.
 * Since the old and new state are of the same type, this "reduces" the value and key into the new state.
 * @template S The type of the state.
 * @template V The type of the value.
 * @template K The type of the key.
 *  Typically a string, though frequently a number, in which case it's often called an index.
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
 * @typedef {() => void} Trigger
 */
export type Trigger = () => void

/**
 * Composes a new transform from two existing transforms via an intermediate type.
 *
 * @template T The input type.
 * @template I The intermediate type.
 * @template R The result type.
 * @param {Transform<T, I>} toIntermediate A transform to from the input to the intermediate type.
 * @param {Transform<I, R>} toResult A transform from the intermediate type to the result type.
 * @returns {Transform<T, R>} The composed transform function.
 */
export function compose<T, I, R>(toIntermediate: Transform<T, I>, toResult: Transform<I, R>): Transform<T, R> {
  return (value: T): R => {
    return toResult(toIntermediate(value))
  }
}

/**
 * Composes a new Reducer from an existing Reducer for an intermediate type
 * and a Synthesis that transforms values to that intermediate type.
 *
 * @template S The type of the state.
 * @template V The type of the value to reduce.
 * @template I The type of the intermediate value.
 * @template K The type of the reducer key.
 * @param reducer The Reducer function for the intermediate type.
 * @param synthesis The Synthesis function that transforms reducer values to intermediate values.
 *  Note that these can be Transform<V, I> functions if the key <K> is irrelevant.
 * @returns A Reducer function for the value type.
 */
export function composeReducer<S, V, I, K>(reducer: Reducer<S, I, K>, synthesis: Synthesis<V, K, I>): Reducer<S, V, K> {
  return (state, value, key) => reducer(state, synthesis(value, key), key)
}

/**
 * Repeats a reducer function a specified number of times and returns the final state.
 * Passes the current iteration number as the value (starting from 1)
 * and a zero-based index as the key to the reducer.
 *
 * @template S - The type of the state.
 * @param {number} count - The number of times to repeat the reducer function.
 * @param {Reducer<S, number, number>} reducer - The Reducer to execute.
 * @param {S} initialState - The initial state.
 * @returns {S} - The final state.
 */
export function reiterate<S>(count: number, reducer: Reducer<S, number, number>, initialState: S): S {
  let state = initialState
  for (let index = 0; index < count; index += 1) {
    state = reducer(state, index + 1, index)
  }
  return state
}
