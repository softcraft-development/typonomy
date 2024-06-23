[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceIndexed

# Function: reduceIndexed()

> **reduceIndexed**\<`S`, `T`\>(`indexed`, `startIndex`, `endIndex`, `reducer`, `initialState`): `S`

Reduces indexed elements to a single value by iterating over a sequential list of indices.
Stops execution if the reducer throws a `BreakExecution`.

## Type parameters

• **S**

The type of the resulting state.

• **T**

The type of the elements in the array.

## Parameters

• **indexed**: [`Indexed`](../type-aliases/Indexed.md)\<`T`\>

The Indexed to reduce.

• **startIndex**: `number`

The first index to request.

• **endIndex**: `number`

The last index to request.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `undefined` \| `T`, `number`\>

The function that returns the next State for each element.

• **initialState**: `S`

The initial state for the first call to `reducer`.

## Returns

`S`

The final state.

## Source

[func.ts:378](https://github.com/softcraft-development/typonomy/blob/b0e16bd041f316a076ebba1edb1d4cf521b110ee/src/func.ts#L378)
