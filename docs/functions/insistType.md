[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / insistType

# Function: insistType()

> **insistType**\<`T`\>(`value`, `typeGuard`, `assertion`, `messageFactory`): `T`

Ensures that the given value is of a given type.
Throws an AssertError otherwise.

## Type parameters

• **T**

The type to guarantee.

## Parameters

• **value**: `unknown`

The value to be checked.

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

• **assertion**: `string`= `defaultAssertion`

• **messageFactory**= `assertErrorMessage`

## Returns

`T`

The value if it is of type T.

## Throws

`AssertError` If the value is not of type T.

## Source

[assertions.ts:85](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/assertions.ts#L85)
