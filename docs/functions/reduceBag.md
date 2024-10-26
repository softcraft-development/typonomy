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

[bags.ts:129](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/bags.ts#L129)
