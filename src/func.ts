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

/**
 * A collection of elements that can be retrieved by a numeric index.
 * `Array` and `string` are typical examples of `Indexed` collections.
 * @template T The type of elements in the collection.
 */
export type Indexed<T> = {
  [index: number]: T | undefined
}

/**
 * A function that can transform from one type and its numeric index to another type.
 */
export type IndexedMapper<T, R> = Combine<T, number, R>

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
 * A signal to break out of the typical execution flow.
 * Typonomy iteration functions (which typically start with `for*`, `map*`, or `reduce*`) will `catch` this signal
 * and use it to short-circuit the iteration.
 * Note that this looks like an `Error`, and can be `throw`n and `catch`ed like one, but is not an `Error`.
 */
export class BreakExecution {
  message: string

  /**
   * Creates a new instance of the BreakExecution class.
   */
  constructor(message = "Break Execution") {
    this.message = message
  }

  /**
   * Returns the break message.
   * @returns The `message` used to construct the `BreakExecution`.
   */
  toString(): string {
    return this.message
  }
}

/**
 * A `BreakExecution` instance that can be used in general contexts.
 */
export const Break = new BreakExecution()

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
 * Composes a new Combine from an existing Combine that returns an intermediate type
 * and a Transform that transforms the intermediate type to the result type.
 *
 * @template A - The type of the left argument of the new Combine.
 * @template B - The type of the right argument of the new Combine.
 * @template I - The type of the intermediate value.
 * @template R - The type of the result.
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
 * @template A - The type of the left argument of the new Combine.
 * @template B - The type of the right argument of the new Combine.
 * @template I - The type of the intermediate value.
 * @template R - The type of the result.
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
 * @template S The type of the state.
 * @template V The type of the value to reduce.
 * @template I The type of the intermediate value.
 * @template K The type of the reducer key.
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
 * @template A - The type of the left argument of the new Combine.
 * @template B - The type of the right argument of the new Combine.
 * @template I - The type of the intermediate value.
 * @template R - The type of the result.
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
 * Checks if the provided value is a `BreakExecution`.
 * @param value - The value to check.
 * @returns `true` if the value is a `BreakExecution`, `false` otherwise.
 */
export function isBreakExecution(value: unknown): value is BreakExecution {
  return value instanceof BreakExecution
}

/**
 * Checks if two values are equal via the `===` operator.
 *
 * @template T - The type of the values being compared.
 * @param a - The first value.
 * @param b - The second value.
 * @returns `true` if the values are equal, `false` otherwise.
 */
export function isEquality<T>(a: T, b: T): boolean {
  return a === b
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
 * Return a value if the exception is a `BreakExecution`, or (re)throw it otherwise.
 * The typical use case is to call this from a `catch(exception)` block where `BreakExecution` is expected.
 *
 * @template R - The type of the return value.
 * @param exception - Any object, which is expected to
 * @param returnValue - The value to return if the exception is a `BreakExecution`.
 * @returns The `returnValue` if the exception is a `BreakExecution`; otherwise `exception` is thrown.
 * @throws The `exception` if it is not a `BreakExecution`.
 */
export function onBreakExecution<R>(exception: unknown, returnValue: R): R {
  if (isBreakExecution(exception)) {
    return returnValue
  }
  throw exception
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
 * Partially apply a value to a `Transform`.
 * Reduces the order of the function from 1 to 0.
 *
 * @template T The type of the value to transform.
 * @template R The type of the result.
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
 * @template A - The type of the left argument of the `Combine`.
 * @template B - The type of the right argument of the `Combine`.
 * @template R - The type of the result.
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
 * @template A - The type of the left argument of the `Combine`.
 * @template B - The type of the right argument of the `Combine`.
 * @template R - The type of the result.
 * @param combine The `Combine` function.
 * @param value The value to partially apply to right parameter of the `Combine`.
 * @returns A `Transform` function function for the left parameter of the `Combine`.
 */
export function partialRight<A, B, R>(combine: Combine<A, B, R>, value: B): Transform<A, R> {
  return (a: A) => combine(a, value)
}

/**
 * Reduces indexed elements to a single value by iterating over a sequential list of indices.
 * Stops execution if the reducer throws a `BreakExecution`.
 *
 * @template S - The type of the resulting state.
 * @template T - The type of the elements in the array.
 * @param indexed - The Indexed to reduce.
 * @param startIndex - The first index to request.
 * @param endIndex - The last index to request.
 * @param reducer - The function that returns the next State for each element.
 * @param initialState - The initial state for the first call to `reducer`.
 * @returns The final state.
 */
export function reduceIndexed<S, T>(
  indexed: Indexed<T>,
  startIndex: number,
  endIndex: number,
  reducer: Reducer<S, T | undefined, number>,
  initialState: S,
): S {
  let state = initialState
  for (let index = startIndex; index <= endIndex; index++) {
    const value = indexed[index]
    try {
      state = reducer(state, value, index)
    }
    catch (exception) {
      return onBreakExecution<S>(exception, state)
    }
  }
  return state
}

/**
 * Calls a reducer function a specified number of times and returns the final state.
 * Passes the current iteration number as the value (starting from 1)
 * and a zero-based index as the key to the reducer.
 * Stops execution if the reducer throws a `BreakExecution`.
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
    try {
      state = reducer(state, index + 1, index)
    }
    catch (exception) {
      return onBreakExecution<S>(exception, state)
    }
  }
  return state
}

/**
 * Creates a `Thunk`= that returns the provided value.
 * @template T - The type of the value.
 * @param value - The value to be returned by the `Thunk`.
 * @returns A function that returns the provided value.
 */
export function thunk<T>(value: T): Thunk<T> {
  return () => value
}
