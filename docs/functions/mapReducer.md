[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / mapReducer

# Function: mapReducer()

> **mapReducer**\<`T`, `R`\>(`mapper`): [`Reducer`](../type-aliases/Reducer.md)\<`R`[], [`Optional`](../type-aliases/Optional.md)\<`T`\>, `number`\>

Converts a `Mapper` into an array `Reducer`.

## Type parameters

• **T**

The type of input elements.

• **R**

The type of the output elements.

## Parameters

• **mapper**: [`IndexMapper`](../type-aliases/IndexMapper.md)\<`T`, `R`\>

A function that maps the input element (and possibly the element's index) to the output element.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`R`[], [`Optional`](../type-aliases/Optional.md)\<`T`\>, `number`\>

A `Reducer` that transforms inputs to outputs and appends them to an array.

## Source

[arrays.ts:217](https://github.com/softcraft-development/typonomy/blob/862c1ddee53805e60a02ad4f6ec1cd71d6a929be/src/arrays.ts#L217)
