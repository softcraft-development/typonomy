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

[nullish.ts:81](https://github.com/softcraft-development/typonomy/blob/09474e7d86c7eb31d4c29237c93a572fbae7f0d9/src/nullish.ts#L81)
