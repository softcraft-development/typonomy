[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / bag

# Function: bag()

> **bag**\<`T`\>(`bag`, `element`): [`Bag`](../type-aliases/Bag.md)\<`T`\>

Adds a defined element to a `Bag<T>`.
Ignore the element if it is `undefined`.

## Type parameters

• **T**

The type of elements (if any) in the bag.

## Parameters

• **bag**: [`Bag`](../type-aliases/Bag.md)\<`T`\>

The `Bag<T>` to add the element to.

• **element**: [`Optional`](../type-aliases/Optional.md)\<`T`\>

The element to add to the bag, or `undefined` if there is no element to add.

## Returns

[`Bag`](../type-aliases/Bag.md)\<`T`\>

An `Array<T>` containing all elements from both `bag` and `element` if both are not `undefined`,
  or the `bag` if `element` is `undefined`,
  or `element` if `bag` is `undefined`,
  or `undefined` if both `bag` and `element` are `undefined`.

## Source

[arrays.ts:102](https://github.com/softcraft-development/typonomy/blob/5469316e6ff7a55df7069c91f81292468fab4b62/src/arrays.ts#L102)
