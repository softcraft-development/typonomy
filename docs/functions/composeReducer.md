[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / composeReducer

# Function: composeReducer()

> **composeReducer**\<`S`, `V`, `I`, `K`\>(`toIntermediate`, `reduceIntermediate`): [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `K`\>

Composes a new Reducer from an existing Reducer for an intermediate type
and a Combine that transforms values and/or keys to that intermediate type.

## Type parameters

• **S**

The type of the state.

• **V**

The type of the value to reduce.

• **I**

The type of the intermediate value.

• **K**

The type of the reducer key.

## Parameters

• **toIntermediate**: [`Combine`](../type-aliases/Combine.md)\<`V`, `K`, `I`\>

The Combine function that transforms reducer values to intermediate values.

• **reduceIntermediate**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `I`, `K`\>

The Reducer function for the intermediate type.
 Note that this can be a Transform<V, I> function if the key <K> is irrelevant.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `K`\>

A Reducer function for the value type.

## Source

[func.ts:188](https://github.com/softcraft-development/typonomy/blob/85e3fd32f5ede40463c64a3e9eb5ea415d4f2898/src/func.ts#L188)
