[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / typeGuard

# Function: typeGuard()

> **typeGuard**\<`T`\>(`predicate`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

Convert a `Predicate<unknown>` into a type guard for a type.

## Type parameters

• **T**

The type of the resulting TypeGuard.

## Parameters

• **predicate**: [`Predicate`](../type-aliases/Predicate.md)\<`unknown`\>

The `Predicate<unknown>` used to check the type.

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

A `TypeGuard<T>` that checks if an `unknown` value is of type `T`.

## Source

[typeGuards.ts:76](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/typeGuards.ts#L76)
