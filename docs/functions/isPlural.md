[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isPlural

# Function: isPlural()

> **isPlural**\<`T`\>(`value`): `value is T[]`

Checks if the given `Some<T>` is an array of `T`

## Type parameters

• **T**

## Parameters

• **value**: [`Some`](../type-aliases/Some.md)\<`T`\>

The `Some<T>` to check.

## Returns

`value is T[]`

Returns true if the value is an `Array<T>`, false if it is a single `T`.

## Source

[arrays.ts:133](https://github.com/softcraft-development/typonomy/blob/bb883dcb7a2044dc6d2e6edeb73029aeebd91383/src/arrays.ts#L133)
