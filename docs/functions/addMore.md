[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / addMore

# Function: addMore()

> **addMore**\<`T`\>(`some`, `more`): [`Defined`](../type-aliases/Defined.md)\<`T`\>[]

Adds an element to a `Some`, resulting in an `Array` of elements.
If the `Some` is already an array, the element is pushed on to the array.
Otherwise, create a new array with the singular `Some` and the new element.

## Type parameters

• **T**

The e of the elements.

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`T`\>

The array or element to add to.

• **more**: [`Defined`](../type-aliases/Defined.md)\<`T`\>

The element to add.

## Returns

[`Defined`](../type-aliases/Defined.md)\<`T`\>[]

An array with the additional element.

## Source

[some.ts:17](https://github.com/softcraft-development/typonomy/blob/71207c5f8a51cd78ebdeff79293f44e522cae748/src/some.ts#L17)
