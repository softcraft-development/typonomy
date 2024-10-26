[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / assertType

# Function: assertType()

> **assertType**\<`T`\>(`value`, `typeGuard`, `assertion`, `messageFactory`): `asserts value is T`

## Type parameters

• **T**

## Parameters

• **value**: `unknown`

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

• **assertion**: `string`= `defaultAssertion`

• **messageFactory**: [`AssertMessageFactory`](../type-aliases/AssertMessageFactory.md)\<`unknown`\>= `assertErrorMessage`

## Returns

`asserts value is T`

## Source

[assertions.ts:21](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/assertions.ts#L21)
