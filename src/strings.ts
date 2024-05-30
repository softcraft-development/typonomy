
/**
 * Checks if the given object is a string.
 *
 * @param obj - The object to be checked.
 * @returns `true` if the object is a string, `false` otherwise.
 */
export function isString(obj: unknown): obj is string {
  return typeof obj === "string"
}

/**
 * Converts a value to a string.
 *
 * @param value - The value to convert.
 * @returns The string representation of the value.
 */
export function valueToString<T>(value: T): string {
  return String(value)
}
