[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / or

# Function: or()

> **or**\<`T`\>(`a`, `b`): [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

Create a `Predicate` based on either input `Predicate` returning `true`.

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

A `Predicate` that returns `true` if either inputs are `true`.

## Source

[logic.ts:41](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/logic.ts#L41)
