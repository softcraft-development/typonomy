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

A Predicate that returns `true` if either inputs are `true`.

## Source

[func.ts:235](https://github.com/softcraft-development/typonomy/blob/bb883dcb7a2044dc6d2e6edeb73029aeebd91383/src/func.ts#L235)
