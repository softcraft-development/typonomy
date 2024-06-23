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

[func.ts:140](https://github.com/softcraft-development/typonomy/blob/ed30302645156be7a3415a48b3f38706435f25d3/src/func.ts#L140)
