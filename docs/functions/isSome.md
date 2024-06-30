[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isSome

# Function: isSome()

> **isSome**\<`T`\>(`value`, `typeGuard`): `value is Some<T>`

Checks if a value matches a type, an array of that type, or an empty array (potentially of that type).

## Type parameters

• **T**

The type to check.

## Parameters

• **value**: `unknown`

The value to check.

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

A function to check individual values

## Returns

`value is Some<T>`

`true` the value is of the specified type, an array of that type, or an empty array; `false` otherwise.

## Source

[arrays.ts:207](https://github.com/softcraft-development/typonomy/blob/5469316e6ff7a55df7069c91f81292468fab4b62/src/arrays.ts#L207)
