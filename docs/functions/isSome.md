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

[arrays.ts:189](https://github.com/softcraft-development/typonomy/blob/b0e16bd041f316a076ebba1edb1d4cf521b110ee/src/arrays.ts#L189)
