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

The `Some<V>` to reduce.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, [`Defined`](../type-aliases/Defined.md)\<`V`\>, `number`\>

The reducer function. If `bag` is singular, then the key/index will be `0`.

• **initialState**: `S`

The initial state.

## Returns

`S`

The final state.

## Source

[some.ts:89](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/some.ts#L89)
