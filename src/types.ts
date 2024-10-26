
/**
 * A function that does something to a value, but doesn't return anything.
 * Generally used for side effects.
 * @typeParam T Any type.
 */
export type Action<T> = (value: T) => void

/**
 * Zero, one, or more values of type `T`.
 * Zero values are represented as `undefined`.
 * One value is represented as `T`.
 * More than one value is represented as `Array<T>`.
 * Note that, if `T` itself includes `undefined`, then `Bag<T>` could be `Array<T | undefined>`.
 * @typeParam T The type of value.
 */
export type Bag<T> = undefined | T | T[]

/**
 * A function that combines two values to produce a new value.
 * @typeParam A The type of the first input.
 * @typeParam B The type of the second input.
 * @typeParam R The type of the result.
 * @param a The first value.
 * @param b The second value.
 * @returns The result of combining the two values.
 */
export type Combine<A, B, R> = (a: A, b: B) => R

/**
 * A utility type for values that are never `undefined` (but potentially `null`).
 * @typeParam T - The type, which is not `undefined`.
 */
export type Defined<T> = Exclude<T, undefined>

/**
 * A key:value pair from an object `T`
 *
 * @typeParam T - The type of the object with keys.
 * @typeParam V - The type of the value for the keys.
 */
export type Entry<T extends object, V = unknown> = [keyof T, V]

/**
 * A utility type for values that are never `null` or `undefined`.
 * @typeParam T - The type, which is neither `null` nor `undefined`.
 */
export type Explicit<T> = Exclude<T, Nullish>

/**
 * A utility type for values that have a specific property with a specific type.
 * @typeParam K - The string key of the property.
 * @typeParam T - The type of the property.
 */
export type Has<K extends string, T> = { [P in K]: T }

/**
 * A type for all values that can be represented in JSON.
 */
export type Json = string | number | boolean | null | Json[] | JsonObject

/**
 * A type for objects that can be represented in JSON.
 */
export type JsonObject = { [key: string]: Json }

/**
 * A function that transforms from one type (and its numeric index) to another.
 * Note that `Transform<T,R>` are `Mapper<T,R>` that ignore the indexes.
 * @typeParam T - The input type.
 * @typeParam T - The input type.
 */
export type Mapper<T, R> = Combine<T, number, R>

/**
 * A function that transforms one Transform function into another.
 * If you want a function that transforms one type <B> to another type <R>,
 * but only know/have a function that converts another type <A> to that same type <R>,
 * a MetaTransform will help get you from <A> to <B>.
 *
 * @typeParam A The input type that you have.
 * @typeParam B The input type that you want.
 * @typeParam R The output type.
 *
 * @param fn The Transform function that you have.
 * @returns The Transform function that you want.
 */
export type MetaTransform<A, B, R> = (fn: Transform<A, R>) => Transform<B, R>

/**
 * A utility type for values that may be `null`.
 * @typeParam T - The type when it is not `null`.
 */
export type Nullable<T> = T | null

/**
 * A utility type for values that are never `null` (but potentially `undefined`).
 * @typeParam T - The type, which is not `null`.
 */
export type NotNull<T> = Exclude<T, null>

/**
 * Either null or undefined.
 */
export type Nullish = null | undefined

/**
 * A utility type for values that may be `undefined`.
 * @typeParam T - The type when it is not `undefined`.
 */
export type Optional<T> = T | undefined

/**
 * A utility type for values that may be `null` or `undefined`.
 * @typeParam T - The type when it is not `null` or `undefined`.
 */
export type Possible<T> = T | Nullish

/**
 * Represents a function returns true or false for a given value..
 * @typeParam T The type of the value being evaluated by the predicate.
 * @param value The value to be evaluated by the predicate.
 * @returns A boolean indicating whether the value satisfies the predicate condition.
 */
export type Predicate<T> = (value: T) => boolean

/**
 * A function combines a previous state, a value, and a key into a new state.
 * Since the old and new state are of the same type, this "reduces" the value and key into the new state.
 * @typeParam S The type of the state.
 * @typeParam V The type of the value.
 * @typeParam K The type of the key.
 *  Typically a string, though frequently a number, in which case it's often called an "index".
 * @param state The current state. Note that this value may be mutated, depending on the reducer.
 * @param value The value to be applied to the state.
 * @param key The key or index associated with the value.
 * @returns The new state after applying the value.
 */
export type Reducer<S, V, K> = (state: S, value: V, key: K) => S

/**
 * Represents a type that can be either a single value of type T or an array of type T.
 * Note that T may never be `undefined`.
 *
 * @typeParam T - The type of value.
 */
export type Some<T> = Defined<T> | Defined<T>[]

/**
 * A function that returns a value based on no direct input.
 * Often used as a closure, taking its input from external scope.
 * @typeParam R The return type of the thunk.
 */
export type Thunk<R> = () => R

/**
 * A function that transforms one value into another.
 * @typeParam T The input type.
 * @typeParam R The output type.
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
