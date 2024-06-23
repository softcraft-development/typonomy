
/**
 * A function that does something to a value, but doesn't return anything.
 * Generally used for side effects.
 * @template T Any type.
 */
export type Action<T> = (value: T) => void

/**
 * A function that combines two values to produce a new value.
 * @template A The type of the first input.
 * @template B The type of the second input.
 * @template R The type of the result.
 * @param a The first value.
 * @param b The second value.
 * @returns The result of combining the two values.
 */
export type Combine<A, B, R> = (a: A, b: B) => R

export type Entry<T extends object, V = unknown> = [keyof T, V]

/**
 * A utility type for values that are never `null` or `undefined`.
 * @template T - The type, which is neither `null` nor `undefined`.
 */
export type Explicit<T> = Exclude<T, Nullish>

/**
 * A function that can transform from one type and its numeric index to another type.
 */
export type IndexedMapper<T, R> = Combine<Optional<T>, number, R>

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
 * A utility type for values that may be `null`.
 * @template T - The type when it is not `null`.
 */
export type Nullable<T> = T | null

/**
 * A utility type for values that are never `null` (but potentially `undefined`).
 * @template T - The type, which is not `null`.
 */
export type NotNull<T> = Exclude<T, null>

/**
 * A utility type for values that are never `undefined` (but potentially `null`).
 * @template T - The type, which is not `undefined`.
 */
export type NotUndefined<T> = Exclude<T, undefined>

/**
 * Either null or undefined.
 */
export type Nullish = null | undefined

/**
 * A utility type for values that may be `undefined`.
 * @template T - The type when it is not `undefined`.
 */
export type Optional<T> = T | undefined

/**
 * A utility type for values that may be `null` or `undefined`.
 * @template T - The type when it is not `null` or `undefined`.
 */
export type Possible<T> = T | Nullish

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
 * Represents a type that can be either a single value of type T or an array of type T.
 *
 * @template T - The type of value.
 */
export type Some<T> = T | T[]

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
 * A function that checks if a value satisfies a specific type.
 */
export type TypeGuard<T> = (value: unknown) => value is T
