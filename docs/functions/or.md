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

[func.ts:235](https://github.com/softcraft-development/typonomy/blob/a265c54b67d3009e0095d9a5a897bf61d10478cf/src/func.ts#L235)
