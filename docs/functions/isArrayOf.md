[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isArrayOf

# Function: isArrayOf()

> **isArrayOf**\<`T`\>(`value`, `predicate`, `emptyMatches`): `value is T[]`

Checks if a value is an array of a specific type.

## Type parameters

• **T**

## Parameters

• **value**: `unknown`

The value to check.

• **predicate**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

The Predicate to check each item in the array.

• **emptyMatches**: `boolean`= `true`

The value to return when the array is empty, and the type cannot be defined by the value.
 Defaults to `true`.

## Returns

`value is T[]`

`true` if the value is an array of the specified type, `false` otherwise.

## Source

[arrays.ts:84](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/arrays.ts#L84)
