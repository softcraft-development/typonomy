[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / appendDefinite

# Function: appendDefinite()

> **appendDefinite**\<`T`\>(`array`, `value`): [`Definite`](../type-aliases/Definite.md)\<`T`\>[]

Appends a value to an array only if the value is neither null nor undefined.

## Type parameters

• **T**

The type of elements in the array.

## Parameters

• **array**: [`Definite`](../type-aliases/Definite.md)\<`T`\>[]

The array to append the value to.

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The value to append to the array if it is not null or undefined.

## Returns

[`Definite`](../type-aliases/Definite.md)\<`T`\>[]

- The updated array.

## Source

[array.ts:25](https://github.com/softcraft-development/typonomy/blob/acdcf727a03174c2b08bbaa0b667e4ee4a469eea/src/array.ts#L25)
