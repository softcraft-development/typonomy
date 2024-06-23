[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / addMore

# Function: addMore()

> **addMore**\<`T`\>(`some`, `more`): `T`[]

Adds an element to a `Some`, resulting in an `Array` of elements.
If the `Some` is already an array, the element is appended to the array.
Otherwise, create a new array with the singular `Some` and the new element.

## Type parameters

• **T**

The type of the elements.

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`T`\>

The array or element to add to.

• **more**: `T`

The element to add.

## Returns

`T`[]

An array with the additional element.

## Source

[arrays.ts:16](https://github.com/softcraft-development/typonomy/blob/f77f6002b19dd65199e89540af6d271db08bf123/src/arrays.ts#L16)
