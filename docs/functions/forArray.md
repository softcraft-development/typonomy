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

[arrays.ts:112](https://github.com/softcraft-development/typonomy/blob/a62fc03e32b184f07c3799ae239136e6b1077839/src/arrays.ts#L112)
