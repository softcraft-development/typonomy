[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isExplicit

# Function: isExplicit()

> **isExplicit**\<`T`\>(`value`): `value is Exclude<T, Nullish>`

Checks if a value is not `Nullish`.

## Type parameters

• **T**

The type when it is not `null` or `undefined`.

## Parameters

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The value to check.

## Returns

`value is Exclude<T, Nullish>`

`false` if the value is `null` or `undefined`; `true` otherwise.

## Source

[nullish.ts:65](https://github.com/softcraft-development/typonomy/blob/b0e16bd041f316a076ebba1edb1d4cf521b110ee/src/nullish.ts#L65)
