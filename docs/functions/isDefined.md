[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isDefined

# Function: isDefined()

> **isDefined**\<`T`\>(`value`): `value is Exclude<T, undefined>`

Checks if a potentially undefined value is actually not undefined.

## Type parameters

• **T**

## Parameters

• **value**: [`Optional`](../type-aliases/Optional.md)\<`T`\>

The potentially undefined value to check.

## Returns

`value is Exclude<T, undefined>`

A boolean indicating whether the value is not undefined.

## Source

[nullish.ts:61](https://github.com/softcraft-development/typonomy/blob/e9724ba9d0c158a8beed5b634614d25b27c7288a/src/nullish.ts#L61)
