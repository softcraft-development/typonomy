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

[object.ts:22](https://github.com/softcraft-development/typonomy/blob/e9724ba9d0c158a8beed5b634614d25b27c7288a/src/object.ts#L22)
