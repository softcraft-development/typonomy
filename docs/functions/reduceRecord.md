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

[objects.ts:55](https://github.com/softcraft-development/typonomy/blob/37d2aadc75ec0bb1bcd45938f3aae7730dc0182e/src/objects.ts#L55)
