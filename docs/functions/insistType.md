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

[assertions.ts:85](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/assertions.ts#L85)
