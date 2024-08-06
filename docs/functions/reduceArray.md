[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceArray

# Function: reduceArray()

> **reduceArray**\<`S`, `T`\>(`arrayLike`, `reducer`, `initialState`, `startIndex`, `endIndex`): `S`

Reduces elements of an array-like object to a single value by iterating over a sequential list of indices.
Stops execution if the reducer throws a `BreakExecution`.

## Type parameters

• **S**

The type of the resulting state.

• **T**

The type of the elements in the array-like object.

## Parameters

• **arrayLike**: `ArrayLike`\<`T`\>

The array-like object to reduce.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, [`Optional`](../type-aliases/Optional.md)\<`T`\>, `number`\>

The function that returns the next State for each element.

• **initialState**: `S`

The initial state for the first call to `reducer`.

• **startIndex**: `number`= `0`

The first index to request. Defaults to `0`

• **endIndex**: `number`= `undefined`

The last index to request. Defaults to the last index of `arrayLike`

## Returns

`S`

The final state.

## Source

[arrays.ts:147](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/arrays.ts#L147)
