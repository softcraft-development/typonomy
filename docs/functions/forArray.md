[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / forArray

# Function: forArray()

> **forArray**\<`T`\>(`array`, `callback`): `void`

Apply a callback to each element in an array,
unless the callback throws `BreakException`,
in which case further execution halts.

## Type parameters

• **T**

The type of elements in the array.

## Parameters

• **array**: `T`[]

The array to iterate over.

• **callback**: [`IndexedMapper`](../type-aliases/IndexedMapper.md)\<`T`, `void`\>

The callback function to apply to each element.

## Returns

`void`

## Source

[arrays.ts:103](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/arrays.ts#L103)
