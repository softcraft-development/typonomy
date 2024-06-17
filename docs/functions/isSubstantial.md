[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isSubstantial

# Function: isSubstantial()

> **isSubstantial**\<`T`\>(`value`): `value is Exclude<T, null>`

Checks if a potentially null value is actually not null.

## Type parameters

• **T**

## Parameters

• **value**: [`Nullable`](../type-aliases/Nullable.md)\<`T`\>

The potentially null value to check.

## Returns

`value is Exclude<T, null>`

A boolean indicating whether the value is not null.

## Source

[nullish.ts:123](https://github.com/softcraft-development/typonomy/blob/16e8ada4ce77ce01fea3d62ce7f81f8090c6d1b6/src/nullish.ts#L123)
