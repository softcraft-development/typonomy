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

A `Predicate` that returns true if both inputs are true.

## Source

[logic.ts:20](https://github.com/softcraft-development/typonomy/blob/a62fc03e32b184f07c3799ae239136e6b1077839/src/logic.ts#L20)
