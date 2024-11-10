[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / assertType

# Function: assertType()

> **assertType**\<`T`\>(`value`, `typeGuard`, `assertion`, `messageFactory`): `asserts value is T`

Asserts that the given value is of a given type.
Throws an AssertError otherwise.

## Type parameters

• **T**

The type to guarantee.

## Parameters

• **value**: `unknown`

The value to be checked.

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

• **assertion**: `string`= `defaultAssertion`

• **messageFactory**: [`Combine`](../type-aliases/Combine.md)\<`unknown`, `string`, `string`\>= `assertErrorMessage`

## Returns

`asserts value is T`

An assertion that the value is of type T.

## Throws

`AssertError` If the value is not of type T.

## Source

[assertions.ts:54](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/assertions.ts#L54)
