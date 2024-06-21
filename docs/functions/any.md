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

[func.ts:106](https://github.com/softcraft-development/typonomy/blob/bfa332593f2d4f3fa0b0a1ff2b00494cc65a0318/src/func.ts#L106)
