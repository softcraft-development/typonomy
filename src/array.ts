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

export function arr<T>(size = 0): T[] {
  return new Array<T>(size)
}