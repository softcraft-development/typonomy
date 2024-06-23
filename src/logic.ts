import type { Predicate } from "./types"

/**
 * Create a `Predicate` that returns true if all input `Predicate` are true.
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
 * @returns A `Predicate` that returns true if both inputs are true.
 */
export function and<T>(a: Predicate<T>, b: Predicate<T>): Predicate<T> {
  return (value): boolean => a(value) && b(value)
}

/**
 * Negates a `Predicate`.
 *
 * @param predicate - The `Predicate` to negate.
 * @returns A new `Predicate` that returns the opposite value of the input Predicate.
 */
export function not<T>(predicate: Predicate<T>): Predicate<T> {
  return value => !predicate(value)
}

/**
 * Create a `Predicate` based on either input `Predicate` returning `true`.
 * @type T - The type of value to test.
 * @param a - The first `Predicate` to test against.
 * @param b - The second `Predicate` to test against.
 * @returns A `Predicate` that returns `true` if either inputs are `true`.
 */
export function or<T>(a: Predicate<T>, b: Predicate<T>): Predicate<T> {
  return (value): boolean => a(value) || b(value)
}

/**
 * Create a Predicate that returns true if any input `Predicate` is true.
 * @type T - The type of value to test.
 * @param predicates - The `Predicate` to test against.
 * @returns A `Predicate` that returns true if any input `Predicate` are true.
 */
export function some<T>(...predicates: Predicate<T>[]): Predicate<T> {
  return value => predicates.some(predicate => predicate(value))
}

