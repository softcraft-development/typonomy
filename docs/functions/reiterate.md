[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reiterate

# Function: reiterate()

> **reiterate**\<`S`\>(`count`, `reducer`, `initialState`): `S`

Calls a reducer function a specified number of times and returns the final state.
Passes the current iteration number as the value (starting from 1)
and a zero-based index as the key to the reducer.
Stops execution if the reducer throws a `BreakExecution`.

## Type parameters

• **S**

The type of the state.

## Parameters

• **count**: `number`

The number of times to repeat the reducer function.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `number`, `number`\>

The Reducer to execute.

• **initialState**: `S`

The initial state.

## Returns

`S`

- The final state.

## Source

[arrays.ts:178](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/arrays.ts#L178)
