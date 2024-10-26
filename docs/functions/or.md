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

[logic.ts:41](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/logic.ts#L41)
