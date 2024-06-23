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

[arrays.ts:335](https://github.com/softcraft-development/typonomy/blob/f77f6002b19dd65199e89540af6d271db08bf123/src/arrays.ts#L335)
