import { isNull, isUndefined } from "./nullish"
import * as types from "./types"

export const defaultAssertion = "the expected type"

/**
 * Represents an error thrown when a type assertion is invalid.
 *
 * @typeParam X - The type of the value that caused the assertion to fail.
 */
export class AssertError<X> extends Error {
  /**
   * Creates an instance of `AssertError`.
   *
   * @param value - The value that caused the assertion to fail.
   * @param assertion - A description of the assertion that failed.
   * @param messageFactory - A function that generates the error message. Defaults to `assertErrorMessage`.
   */
  constructor(
    public readonly value: X,
    public readonly assertion: string,
    message: string,
  ) {
    super(message)
  }

  public static withMessageFactory<X = unknown>(
    value: X,
    assertion: string,
    messageFactory: types.Combine<X, string, string> = assertErrorMessage
  ): AssertError<X> {
    return new AssertError<X>(value, assertion, messageFactory(value, assertion))
  }
}

/**
 * Constructs a standard message describing an assertion failure.
 * @param value Any value that failed an assertion.
 * @param assertion A description of the assertion.
 * @returns A message describing the assertion failure.
 */
export function assertErrorMessage(value: unknown, assertion: string): string {
  return `Asserted value {${value}} is not ${assertion}.`
}

/**
 * Asserts that the given value is of a given type.
 * Throws an AssertError otherwise.
 * @typeParam T - The type to guarantee.
 * @param value - The value to be checked.
 * @returns An assertion that the value is of type T.
 * @throws `AssertError` If the value is not of type T.
 */
export function assertType<T>(
  value: unknown,
  typeGuard: types.TypeGuard<T>,
  assertion: string = defaultAssertion,
  messageFactory: types.Combine<unknown, string, string> = assertErrorMessage
): asserts value is T {
  if (!typeGuard(value)) throw AssertError.withMessageFactory(value, assertion, messageFactory)
}

/**
 * Ensures that the given value is neither `null` nor `undefined`.
 * Throws an error if the value is `null` or `undefined`.
 * @typeParam T - The type when it is not `null` or `undefined`.
 * @param value - The value to be checked.
 * @returns The non-null non-undefined value.
 * @throws If `AssertError` is null or undefined.
 */
export function insist<T>(value: types.Possible<T>): T {
  if (isNull(value)) throw AssertError.withMessageFactory(value, "null")
  if (isUndefined(value)) throw AssertError.withMessageFactory(value, "undefined")
  return value
}

/**
 * Ensures that the given value is of a given type.
 * Throws an AssertError otherwise.
 * @typeParam T - The type to guarantee.
 * @param value - The value to be checked.
 * @returns The value if it is of type T.
 * @throws `AssertError` If the value is not of type T.
 */
export function insistType<T>(
  value: unknown,
  typeGuard: types.TypeGuard<T>,
  assertion: string = defaultAssertion,
  messageFactory = assertErrorMessage
): T {
  assertType(value, typeGuard, assertion, messageFactory)
  return value
}
