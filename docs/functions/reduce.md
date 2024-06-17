[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduce

# Function: reduce()

> **reduce**\<`S`, `V`\>(`obj`, `reducer`, `initialState`): `S`

Reduces the keys and values of a record object.

## Type parameters

• **S**

The type of the state.

• **V**

The type of the values in the record.

## Parameters

• **obj**: `Record`\<`string`, `V`\>

The object to be reduced.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `string`\>

The reducer function.

• **initialState**: `S`

The initial state.

## Returns

`S`

The final state.

## Source

[objects.ts:53](https://github.com/softcraft-development/typonomy/blob/a265c54b67d3009e0095d9a5a897bf61d10478cf/src/objects.ts#L53)
