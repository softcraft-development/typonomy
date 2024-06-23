[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / or

# Function: or()

> **or**\<`T`\>(`a`, `b`): [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

Create a `Predicate` based on either input `Predicate` returning `true`.

## Type parameters

• **T**

## Parameters

• **a**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

The first `Predicate` to test against.

• **b**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

The second `Predicate` to test against.

## Returns

[`Predicate`](../type-aliases/Predicate.md)\<`T`\>

A `Predicate` that returns `true` if either inputs are `true`.

## Source

[logic.ts:51](https://github.com/softcraft-development/typonomy/blob/862c1ddee53805e60a02ad4f6ec1cd71d6a929be/src/logic.ts#L51)
