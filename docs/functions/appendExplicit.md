[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / appendExplicit

# Function: appendExplicit()

> **appendExplicit**\<`T`\>(`array`, `value`): [`Explicit`](../type-aliases/Explicit.md)\<`T`\>[]

If the `value` is not null or undefined, append it with the existing array.
Otherwise, return the existing array.

## Type parameters

• **T**

The type of elements in the array.

## Parameters

• **array**: `Exclude`\<`T`, [`Nullish`](../type-aliases/Nullish.md)\>[]

The array of existing elements.

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The new element.

## Returns

[`Explicit`](../type-aliases/Explicit.md)\<`T`\>[]

- The existing `array` if the `value` is `null` or `undefined`,
 or a new array including all elements.

## Source

[arrays.ts:28](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/arrays.ts#L28)
