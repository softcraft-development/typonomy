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

• **K** *extends* [`Key`](../type-aliases/Key.md)

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

[func.ts:151](https://github.com/softcraft-development/typonomy/blob/e9724ba9d0c158a8beed5b634614d25b27c7288a/src/func.ts#L151)
