import { isNull, isUndefined } from "./nullish"
import type { AssertMessageFactory } from "./types"
import * as types from "./types"

export const defaultAssertion = "the expected type"

export class AssertError<X> extends Error {
  constructor(
    public readonly value: X,
    public readonly assertion: string,
    messageFactory: AssertMessageFactory<X> = assertErrorMessage
  ) {
    super(messageFactory(value, assertion))
  }
}

export function assertType<T>(
  value: unknown,
  typeGuard: types.TypeGuard<T>,
  assertion: string = defaultAssertion,
  messageFactory: AssertMessageFactory<unknown> = assertErrorMessage
): asserts value is T {
  if (!typeGuard(value)) throw new AssertError<unknown>(value, assertion, messageFactory)
}

export const assertErrorMessage: AssertMessageFactory<unknown> = (value, assertion) => {
  return `Asserted value {${value}} is not ${assertion}.`
}

export function enforceType<T>(
  value: unknown,
  typeGuard: types.TypeGuard<T>,
  assertion: string = defaultAssertion,
  messageFactory: AssertMessageFactory<unknown> = assertErrorMessage
): T {
  assertType(value, typeGuard, assertion, messageFactory)
  return value
}

/**
 * Ensures that the given value is neither `null` nor `undefined`.
 * Throws an error if the value is `null` or `undefined`.
 * @typeParam T - The type when it is not `null` or `undefined`.
 * @param value - The value to be checked.
 * @returns The non-null non-undefined value.
 * @throws If the value is null or undefined.
 */
export function insist<T>(value: types.Possible<T>): T {
  if (isNull(value)) throw new Error("Value must not be null")
  if (isUndefined(value)) throw new Error("Value must not be undefined")
  return value
}
