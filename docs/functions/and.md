[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / and

# Function: and()

> **and**\<`T`\>(`a`, `b`): [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

Create a `Predicate` based on both input `Predicate` returning `true`.

## Type parameters

• **T**

The type of value to test.

## Parameters

• **a**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

The first `Predicate` to test against.

• **b**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

The second `Predicate` to test against.

## Returns

[`Predicate`](../type-aliases/Predicate.md)\<`T`\>

A `Predicate` that returns true if both inputs are true.

## Source

[logic.ts:20](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/logic.ts#L20)
