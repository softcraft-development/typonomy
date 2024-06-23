[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceArray

# Function: reduceArray()

> **reduceArray**\<`S`, `T`\>(`array`, `reducer`, `initialState`): `S`

Reduces an array of values to a single value.
Stops execution if the reducer throws a `BreakExecution`.

## Type parameters

• **S**

The type of the resulting state.

• **T**

The type of the elements in the array.

## Parameters

• **array**: `T`[]

The array to reduce.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `T`, `number`\>

The function that returns the next State for each array element.

• **initialState**: `S`

The initial state for the first call to `reducer`.

## Returns

`S`

The final reduced state.

## Source

[arrays.ts:244](https://github.com/softcraft-development/typonomy/blob/37d2aadc75ec0bb1bcd45938f3aae7730dc0182e/src/arrays.ts#L244)
