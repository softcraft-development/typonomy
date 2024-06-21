[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / arrayGuard

# Function: arrayGuard()

> **arrayGuard**\<`T`\>(`predicate`, `emptyMatches`?): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`[]\>

Creates a `TypeGuard` for an array of a specific type.

## Type parameters

• **T**

The type of elements in the array.

## Parameters

• **predicate**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

The predicate to check against each element of the array.

• **emptyMatches?**: `boolean`= `true`

Specifies whether an empty array qualifies as an array of the given type.

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`[]\>

- The type guard function.

## Source

[arrays.ts:59](https://github.com/softcraft-development/typonomy/blob/85e3fd32f5ede40463c64a3e9eb5ea415d4f2898/src/arrays.ts#L59)
