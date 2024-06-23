[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceSome

# Function: reduceSome()

> **reduceSome**\<`S`, `V`\>(`some`, `reducer`, `initialState`): `S`

Reduce `Some<T>` to a single state `S`.
Note that a `BreakExecution` on a singular `T` will return the initial state.

## Type parameters

• **S**

The type of the state.

• **V**

The type of the value.

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`V`\>

The `Some<T>` to reduce.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, [`Optional`](../type-aliases/Optional.md)\<`V`\>, `number`\>

The reducer function. If `some` is singular, then the key/index will be `0`.

• **initialState**: `S`

The initial state.

## Returns

`S`

The final state.

## Source

[arrays.ts:292](https://github.com/softcraft-development/typonomy/blob/a62fc03e32b184f07c3799ae239136e6b1077839/src/arrays.ts#L292)
