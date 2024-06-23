[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / typeGuardSome

# Function: typeGuardSome()

> **typeGuardSome**\<`T`\>(`guard`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<[`Some`](../type-aliases/Some.md)\<`T`\>\>

Converts a `TypeGuard<T>` into a `TypeGuard<Some<T>>`.

## Type parameters

• **T**

The underlying type to guard.

## Parameters

• **guard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

The type guard for `T`

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<[`Some`](../type-aliases/Some.md)\<`T`\>\>

A type guard for `Some<T>`.

## Source

[arrays.ts:292](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/arrays.ts#L292)
