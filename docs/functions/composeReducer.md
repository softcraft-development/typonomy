[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / composeReducer

# Function: composeReducer()

> **composeReducer**\<`S`, `V`, `I`, `K`\>(`toIntermediate`, `reduceIntermediate`): [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `K`\>

Composes a new Reducer from an existing Reducer for an intermediate type
and a Synthesis that transforms values and/or keys to that intermediate type.

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

• **toIntermediate**: [`Synthesis`](../type-aliases/Synthesis.md)\<`V`, `K`, `I`\>

The Synthesis function that transforms reducer values to intermediate values.

• **reduceIntermediate**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `I`, `K`\>

The Reducer function for the intermediate type.
 Note that this can be a Transform<V, I> function if the key <K> is irrelevant.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `K`\>

A Reducer function for the value type.

## Source

[func.ts:188](https://github.com/softcraft-development/typonomy/blob/a265c54b67d3009e0095d9a5a897bf61d10478cf/src/func.ts#L188)
