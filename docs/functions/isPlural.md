[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isPlural

# Function: isPlural()

> **isPlural**\<`T`\>(`value`): `value is T[]`

Checks if the given `Some<T>` is an array of `T`.
Note that an empty array, or an array of one element, is still considered plural.

## Type parameters

• **T**

## Parameters

• **value**: [`Some`](../type-aliases/Some.md)\<`T`\>

The `Some<T>` to check.

## Returns

`value is T[]`

Returns true if the value is an `Array<T>`, false if it is a single `T`.

## Source

[arrays.ts:151](https://github.com/softcraft-development/typonomy/blob/37d2aadc75ec0bb1bcd45938f3aae7730dc0182e/src/arrays.ts#L151)
