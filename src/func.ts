/**
 * A function that does something to a value, but doesn't return anything.
 * Generally used for side effects.
 * @template T Any type.
 */
export type Action<T> = (value: T) => void

/**
 * A function that combines values two types into a third type.
 * @template A The type of the first input.
 * @template B The type of the second input.
 * @template R The type of the result.
 * @param a The first value.
 * @param b The second value.
 * @returns The result of combining the two values.
 */
export type Combine<A, B, R> = (a: A, b: B) => R

/**
 * A function that transforms one Transform function into another.
 * If you want a function that transforms one type <B> to another type <R>,
 * but only know/have a function that converts another type <A> to that same type <R>,
 * a MetaTransform will help get you from <A> to <B>.
 *
 * @typeparam A The input type that you have.
 * @typeparam B The input type that you want.
 * @typeparam R The output type.
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
 * @template K The type of the key. Typically a string, though frequently a number, in which case it's often called an index.
 * @param state The current state. Note that this value may be mutated, depending on the reducer.
 * @param value The value to be applied to the state.
 * @param key The key or index associated with the value.
 * @returns The new state after applying the value.
 */
export type Reducer<S, V, K> = (state: S, value: V, key: K) => S
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
