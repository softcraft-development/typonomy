[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / and

# Function: and()

> **and**\<`T`\>(`a`, `b`): [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

Create a `Predicate` based on both input `Predicate` returning `true`.

## Type parameters

• **T**

## Parameters

• **a**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

The first `Predicate` to test against.

• **b**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

The second `Predicate` to test against.

## Returns

[`Predicate`](../type-aliases/Predicate.md)\<`T`\>

A Predicate that returns true if both inputs are true.

## Source

[func.ts:96](https://github.com/softcraft-development/typonomy/blob/85e3fd32f5ede40463c64a3e9eb5ea415d4f2898/src/func.ts#L96)
