[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceRecord

# Function: reduceRecord()

> **reduceRecord**\<`S`, `V`\>(`record`, `reducer`, `initialState`): `S`

Reduces the keys and values of a record object.
Stops execution if the reducer throws a `BreakExecution`.
Note that the order of the keys is not guaranteed.

## Type parameters

• **S**

The type of the state.

• **V**

The type of the values in the record.

## Parameters

• **record**: `Record`\<`string`, `V`\>

The object to be reduced.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `string`\>

The reducer function.

• **initialState**: `S`

The initial state.

## Returns

`S`

The final state.

## Source

[objects.ts:65](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/objects.ts#L65)
