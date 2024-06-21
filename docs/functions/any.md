[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / any

# Function: any()

> **any**\<`T`\>(...`predicates`): [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

Create a Predicate that returns true if any input `Predicate` is true.

## Type parameters

• **T**

## Parameters

• ...**predicates**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>[]

The `Predicate` to test against.

## Returns

[`Predicate`](../type-aliases/Predicate.md)\<`T`\>

A `Predicate` that returns true if any input `Predicate` are true.

## Source

[func.ts:106](https://github.com/softcraft-development/typonomy/blob/85e3fd32f5ede40463c64a3e9eb5ea415d4f2898/src/func.ts#L106)
