[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceSome

# Function: reduceSome()

> **reduceSome**\<`S`, `V`\>(`some`, `reducer`, `initialState`): `S`

Reduce `Some<V>` to a single state `S`.
Note that a `BreakExecution` on a singular `V` will return the initial state.

## Type parameters

• **S**

The type of the state.

• **V**

The type of the value.

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`V`\>

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, [`Defined`](../type-aliases/Defined.md)\<`V`\>, `number`\>

The reducer function. If `bag` is singular, then the key/index will be `0`.

• **initialState**: `S`

The initial state.

## Returns

`S`

The final state.

## Source

[some.ts:78](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/some.ts#L78)
