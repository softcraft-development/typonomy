import * as func from "./func"
import type { Definite, Possible } from "./nullish"
import { isDefinite } from "./nullish"

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
 * @param {Definite<T>[]} array - The array to append the value to.
 * @param {Possible<T>} value - The value to append to the array if it is not null or undefined.
 * @returns {Definite<T>[]} - The updated array.
 */
export function appendDefinite<T>(array: Definite<T>[], value: Possible<T>): Definite<T>[] {
  if (isDefinite(value)) {
    array.push(value)
  }
  return array
}

/**
 * Creates an array of a specified size and type.
 *
 * @template T - The type of elements in the array.
 * @param size - The size of the array to create. Defaults to 0.
 * @returns An array of the specified size and type.
 */
export function arr<T>(size = 0): T[] {
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
export function fill<T>(count: number, filler: func.Transform<number, T>): T[] {
  const reducer = func.composeReducer<T[], number, T, number>(filler, append)
  return func.reiterate(count, reducer, arr<T>())
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
