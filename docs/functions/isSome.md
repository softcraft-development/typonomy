[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isSome

# Function: isSome()

> **isSome**\<`T`\>(`value`, `typeGuard`): `value is Some<T>`

Checks if a value matches a type, an array of that type, or an empty array (potentially of that type).

## Type parameters

• **T**

## Parameters

• **value**: `unknown`

The value to check.

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

A function to check individual values

## Returns

`value is Some<T>`

`true` the value is of the specified type, an array of that type, or an empty array; `false` otherwise.

## Source

[arrays.ts:172](https://github.com/softcraft-development/typonomy/blob/37d2aadc75ec0bb1bcd45938f3aae7730dc0182e/src/arrays.ts#L172)
