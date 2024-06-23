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

[types.ts:90](https://github.com/softcraft-development/typonomy/blob/b0e16bd041f316a076ebba1edb1d4cf521b110ee/src/types.ts#L90)
