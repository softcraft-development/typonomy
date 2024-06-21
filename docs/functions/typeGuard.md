[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / typeGuard

# Function: typeGuard()

> **typeGuard**\<`T`\>(`predicate`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

Convert a `Predicate<unknown>` into a type guard for a type.

## Type parameters

• **T**

## Parameters

• **predicate**: [`Predicate`](../type-aliases/Predicate.md)\<`unknown`\>

The `Predicate<unknown>` used to check the type.

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

A `TypeGuard<T>` that checks if an `unknown` value is of type `T`.

## Source

[types.ts:90](https://github.com/softcraft-development/typonomy/blob/9e2d0980378fcdcaa426a5b6cdba20880ae25840/src/types.ts#L90)
