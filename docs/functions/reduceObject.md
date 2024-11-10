[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceObject

# Function: reduceObject()

> **reduceObject**\<`S`, `T`\>(`obj`, `reducer`, `initialState`): `S`

Reduces the enumerable keys and values of an object.
Stops execution if the reducer throws a `BreakExecution`.
Note that the order of the keys & values is not guaranteed.

## Type parameters

• **S**

The type of the state.

• **T** *extends* `object` = `Record`\<`string`, `unknown`\>

The type of the object to be reduced.

## Parameters

• **obj**: `T`

The object to be reduced.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `T`\[keyof `T`\], keyof `T`\>

The reducer function.

• **initialState**: `S`

The initial state.

## Returns

`S`

The final state.

## Source

[objects.ts:127](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/objects.ts#L127)
