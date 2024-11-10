[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / offsetIndexReducer

# Function: offsetIndexReducer()

> **offsetIndexReducer**\<`S`, `V`\>(`reducer`, `offset`): [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `number`\>

Applies an offset to the numeric index of a reducer.

## Type parameters

• **S**

The type of the state.

• **V**

The type of the value.

## Parameters

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `number`\>

The input reducer.

• **offset**: `number`

The amount to add to the index.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `number`\>

A new reducer function with the offset applied to the index parameter.

## Source

[fp.ts:230](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/fp.ts#L230)
