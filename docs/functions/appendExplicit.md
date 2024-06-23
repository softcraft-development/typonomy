[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / appendExplicit

# Function: appendExplicit()

> **appendExplicit**\<`T`\>(`array`, `value`): [`Explicit`](../type-aliases/Explicit.md)\<`T`\>[]

Appends a value to an array only if the value is neither `null` nor `undefined`.

## Type parameters

• **T**

The type of elements in the array.

## Parameters

• **array**: `Exclude`\<`T`, [`Nullish`](../type-aliases/Nullish.md)\>[]

The array to append the value to.

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The value to append to the array if it is not `null` or `undefined`.

## Returns

[`Explicit`](../type-aliases/Explicit.md)\<`T`\>[]

- The updated array.

## Source

[arrays.ts:44](https://github.com/softcraft-development/typonomy/blob/f77f6002b19dd65199e89540af6d271db08bf123/src/arrays.ts#L44)
