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

[arrays.ts:41](https://github.com/softcraft-development/typonomy/blob/bfa332593f2d4f3fa0b0a1ff2b00494cc65a0318/src/arrays.ts#L41)
