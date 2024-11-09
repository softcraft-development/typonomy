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

[some.ts:89](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/some.ts#L89)
