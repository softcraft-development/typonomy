import { composeReducer, reiterate, type Predicate, type Transform } from "./func"
import { isNullish, type Explicit, type Possible } from "./nullish"
import type { TypeGuard } from "./types"

/**
 * A Reducer that appends its value to an array. Mutates the original array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to append the value to.
 * @param {T} value - The value to append to the array.
 * @returns {T[]} - The updated array with the value appended.
 */
export function append<T>(array: T[], value: T): T[] {
  array.push(value)
  return array
}

/**
 * Appends a value to an array only if the value is neither null nor undefined.
 *
 * @template T - The type of elements in the array.
 * @param {Defined<T>[]} array - The array to append the value to.
 * @param {Possible<T>} value - The value to append to the array if it is not null or undefined.
 * @returns {Defined<T>[]} - The updated array.
 */
export function appendExplicit<T>(array: Explicit<T>[], value: Possible<T>): Explicit<T>[] {
  if (!isNullish(value)) {
    array.push(value)
  }
  return array
}

/**
 * Creates a `TypeGuard` for an array of a specific type.
 *
 * @template T - The type of elements in the array.
 * @param {Predicate<T>} predicate - The predicate to check against each element of the array.
 * @param {boolean} [emptyMatches=true] - Specifies whether an empty array qualifies as an array of the given type.
 * @returns {TypeGuard<T[]>} - The type guard function.
 */
export function arrayGuard<T>(predicate: Predicate<T>, emptyMatches = true): TypeGuard<T[]> {
  return (value: unknown): value is T[] => isArrayOf(value, predicate, emptyMatches)
}

/**
 * Creates an array of a specified size and type.
 *
 * @template T - The type of elements in the array.
 * @param size - The size of the array to create. Defaults to 0.
 * @returns An array of the specified size and type.
 */
export function create<T>(size = 0): T[] {
  return new Array<T>(size)
}

/**
 * Fills an array with values generated by a filler function.
 *
 * @template T - The type of elements in the resulting array.
 * @param count - The number of elements to add to the array.
 * @param filler - A function that generates values (optionally) based on the array index.
 * @returns An array of elements generated by the filler function.
 */
export function fill<T>(count: number, filler: Transform<number, T>): T[] {
  const reducer = composeReducer<T[], number, T, number>(filler, append)
  return reiterate(count, reducer, create<T>())
}

/**
 * Checks if a value is an array of a specific type.
 *
 * @param value - The value to check.
 * @param predicate - The Predicate to check each item in the array.
 * @param emptyMatches - The value to return when the array is empty, and the type cannot be defined by the value.
 *  Defaults to `true`.
 * @returns `true` if the value is an array of the specified type, `false` otherwise.
 */
export function isArrayOf<T>(value: unknown, predicate: Predicate<T>, emptyMatches = true): value is T[] {
  if (!Array.isArray(value)) return false
  if (value.length === 0) return emptyMatches
  return value.every(predicate)
}

export function isEmptyArray(value: unknown): value is [] {
  return Array.isArray(value) && value.length === 0
}

/**
 * Wraps a value or an array of values into an array.
 * If the input is already an array, it is returned as is.
 * If the input is a single value, it is wrapped in an array.
 *
 * @param value - The value or array of values to wrap.
 * @returns The wrapped array.
 */
export function wrap<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

