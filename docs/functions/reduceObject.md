[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceObject

# Function: reduceObject()

> **reduceObject**\<`S`, `T`, `V`\>(`obj`, `reducer`, `initialState`): `S`

Reduces the keys and values of an object.
Stops execution if the reducer throws a `BreakExecution`.
Note that the order of the keys & values is not guaranteed.

## Type parameters

• **S**

The type of the state.

• **T** *extends* `Record`\<keyof `T`, `V`\>

The type of object to reduce.

• **V** = `unknown`

The type of the values in the object. Defaults to `unknown`.

## Parameters

• **obj**: `T`

The object to be reduced.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, keyof `T`\>

The reducer function.

• **initialState**: `S`

The initial state.

## Returns

`S`

The final state.

## Source

[objects.ts:76](https://github.com/softcraft-development/typonomy/blob/a62fc03e32b184f07c3799ae239136e6b1077839/src/objects.ts#L76)
