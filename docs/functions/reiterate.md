[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reiterate

# Function: reiterate()

> **reiterate**\<`S`\>(`count`, `reducer`, `initialState`): `S`

Repeats a reducer function a specified number of times and returns the final state.
Passes the current iteration number as the value (starting from 1)
and a zero-based index as the key to the reducer.

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

[func.ts:294](https://github.com/softcraft-development/typonomy/blob/14556f6ce24da12ae1545e4a4295c60ae5e18fe4/src/func.ts#L294)
