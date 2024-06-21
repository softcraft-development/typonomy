[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceSome

# Function: reduceSome()

> **reduceSome**\<`S`, `V`\>(`some`, `reducer`, `initialState`): `S`

Reduce `Some<T>` to a single state.

## Type parameters

• **S**

The type of the state.

• **V**

The type of the value.

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`V`\>

The `Some<T>` to reduce.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `number`\>

The reducer function. If `some` is singular, then the key/index will be `0`.

• **initialState**: `S`

The initial state.

## Returns

`S`

The final state.

## Source

[arrays.ts:173](https://github.com/softcraft-development/typonomy/blob/bb883dcb7a2044dc6d2e6edeb73029aeebd91383/src/arrays.ts#L173)
