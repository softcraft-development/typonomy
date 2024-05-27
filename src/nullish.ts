/**
 * A utility type for values that may never be undefined.
 * @template T - The type when it is not undefined.
 */
export type Defined<T> = Exclude<T, undefined>

/**
* A utility type for values that may never be null nor undefined.
* @template T - The type when it is not undefined.
*/
export type Definite<T> = Exclude<T, Nullish>

/**
 * A utility type for values that may be undefined.
 * @template T - The type when it is not undefined.
 */
export type Optional<T> = T | undefined

/**
 * A utility type for values that may not be null.
 * @template T - The type when it is not null.
 */
export type NotNullable<T> = Exclude<T, null>

/**
 * A utility type for values that may be null.
 * @template T - The type when it is not null.
 */
export type Nullable<T> = T | null

/**
 * Either null or undefined.
 */
export type Nullish = null | undefined

/**
 * A utility type for values that may null or undefined.
 * @template T - The type when it is not Nullish.
 */
export type Possible<T> = T | Nullish

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
