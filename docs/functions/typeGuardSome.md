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

[arrays.ts:285](https://github.com/softcraft-development/typonomy/blob/ed30302645156be7a3415a48b3f38706435f25d3/src/arrays.ts#L285)
