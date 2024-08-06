[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceBag

# Function: reduceBag()

> **reduceBag**\<`S`, `V`\>(`bag`, `reducer`, `initialState`): `S`

Reduce `Bag<V>` to a single state `S`.
Note that a `BreakExecution` on a singular `V` or `undefined` will return the initial state.

## Type parameters

• **S**

The type of the state.

• **V**

The type of the value.

## Parameters

• **bag**: [`Bag`](../type-aliases/Bag.md)\<`V`\>

The `Bag<T>` to reduce.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, [`Optional`](../type-aliases/Optional.md)\<`V`\>, `number`\>

The reducer function. If `bag` is singular or `undefined, then the key/index will be `0`.

• **initialState**: `S`

The initial state.

## Returns

`S`

The final state.

## Source

[bags.ts:88](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/bags.ts#L88)
