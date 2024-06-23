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

[arrays.ts:45](https://github.com/softcraft-development/typonomy/blob/b0e16bd041f316a076ebba1edb1d4cf521b110ee/src/arrays.ts#L45)
