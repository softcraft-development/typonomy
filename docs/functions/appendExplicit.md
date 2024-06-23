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

• **array**: [`Explicit`](../type-aliases/Explicit.md)\<`T`\>[]

The array to append the value to.

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The value to append to the array if it is not `null` or `undefined`.

## Returns

[`Explicit`](../type-aliases/Explicit.md)\<`T`\>[]

- The updated array.

## Source

[arrays.ts:44](https://github.com/softcraft-development/typonomy/blob/862c1ddee53805e60a02ad4f6ec1cd71d6a929be/src/arrays.ts#L44)
