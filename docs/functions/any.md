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

[func.ts:106](https://github.com/softcraft-development/typonomy/blob/9e2d0980378fcdcaa426a5b6cdba20880ae25840/src/func.ts#L106)