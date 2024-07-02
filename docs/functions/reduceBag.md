[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceBag

# Function: reduceBag()

> **reduceBag**\<`S`, `V`\>(`bag`, `reducer`, `initialState`): `S`

Reduce `Bag<T>` to a single state `S`.
Note that a `BreakExecution` on a singular `T` or `undefined` will return the initial state.

## Type parameters

• **S**

The e of the state.

• **V**

The e of the value.

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

[bags.ts:76](https://github.com/softcraft-development/typonomy/blob/71207c5f8a51cd78ebdeff79293f44e522cae748/src/bags.ts#L76)
