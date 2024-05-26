/**
 * Ensures that the given value is not null or undefined.
 * If the value is null or undefined, an error is thrown.
 * @param value - The value to be checked.
 * @returns The non-null non-undefined value.
 * @throws {Error} If the value is null or undefined.
 */
export function insist<T>(value: T | null | undefined): T {
  if (value === null) throw new Error("Value must not be null")
  if (value === undefined) throw new Error("Value must not be undefined")
  return value
}

export default { insist }
