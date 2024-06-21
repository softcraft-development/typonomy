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

[arrays.ts:28](https://github.com/softcraft-development/typonomy/blob/6cd020f80278694e706a0b517cce1e3ecb0a4458/src/arrays.ts#L28)
