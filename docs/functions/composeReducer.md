[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / composeReducer

# Function: composeReducer()

> **composeReducer**\<`S`, `V`, `I`, `K`\>(`reducer`, `synthesis`): [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `K`\>

Composes a new Reducer from an existing Reducer for an intermediate type
and a Synthesis that transforms values to that intermediate type.

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

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `I`, `K`\>

The Reducer function for the intermediate type.

• **synthesis**: [`Synthesis`](../type-aliases/Synthesis.md)\<`V`, `K`, `I`\>

The Synthesis function that transforms reducer values to intermediate values.
 Note that these can be Transform<V, I> functions if the key <K> is irrelevant.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `K`\>

A Reducer function for the value type.

## Source

[func.ts:100](https://github.com/softcraft-development/typonomy/blob/98e4fa0887f0ca1053297997df20bd5aab7be107/src/func.ts#L100)
