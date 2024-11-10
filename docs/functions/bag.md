[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / bag

# Function: bag()

> **bag**\<`T`\>(`previous`, `more`?): [`Bag`](../type-aliases/Bag.md)\<`T`\>

Adds an element to a `Bag<T>`, ignore it if it is `undefined`.
Note that `undefined` is ignored even if `T` itself includes `undefined.

@typeParam T - The type of elements (if any) in the bag.
@param previous - The `Bag<T>` to add the element to.
@param more - The element to add to the bag, or `undefined` if there is no element to add.
@returns An `Array<T>` containing all elements from both `bag` and `element` if neither are `undefined`,
  or the `bag` if `element` is `undefined`,
  or `element` if `bag` is `undefined`,
  or `undefined` if both `bag` and `element` are `undefined`.

## Type parameters

• **T**

## Parameters

• **previous**: [`Bag`](../type-aliases/Bag.md)\<`T`\>

• **more?**: `T`

## Returns

[`Bag`](../type-aliases/Bag.md)\<`T`\>

## Source

[bags.ts:19](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/bags.ts#L19)
