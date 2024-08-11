[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isSome

# Function: isSome()

> **isSome**\<`T`\>(`value`, `typeGuard`): `value is Some<T>`

Checks if a value matches a type or a non-empty array of that type.

## Type parameters

• **T**

The type to check.

## Parameters

• **value**: `unknown`

The value to check.

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

A function to check individual values.

## Returns

`value is Some<T>`

`true` the value is of the specified type or a non-empty array of that type; `false` otherwise.

## Source

[typeGuards.ts:194](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/typeGuards.ts#L194)
