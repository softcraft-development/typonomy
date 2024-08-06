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

The type of the elements.

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`T`\>

The array or element to add to.

• **more**: [`Defined`](../type-aliases/Defined.md)\<`T`\>

The element to add.

## Returns

[`Defined`](../type-aliases/Defined.md)\<`T`\>[]

An array with the additional element.

## Source

[some.ts:17](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/some.ts#L17)
