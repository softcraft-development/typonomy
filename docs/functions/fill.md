[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / fill

# Function: fill()

> **fill**\<`T`\>(`count`, `filler`): `T`[]

Fills an array with values generated by a filler function.

## Type parameters

• **T**

The type of elements in the resulting array.

## Parameters

• **count**: `number`

The number of elements to add to the array.

• **filler**: [`Transform`](../type-aliases/Transform.md)\<`number`, `T`\>

A function that generates values (optionally) based on the array index.

## Returns

`T`[]

An array of elements generated by the filler function.

## Source

[arrays.ts:54](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/arrays.ts#L54)
