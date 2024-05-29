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

[nullish.ts:61](https://github.com/softcraft-development/typonomy/blob/09474e7d86c7eb31d4c29237c93a572fbae7f0d9/src/nullish.ts#L61)
