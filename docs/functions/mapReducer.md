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

• **mapper**: [`IndexedMapper`](../type-aliases/IndexedMapper.md)\<`T`, `R`\>

A function that maps the input element (and possibly the element's index) to the output element.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`R`[], [`Optional`](../type-aliases/Optional.md)\<`T`\>, `number`\>

A `Reducer` that transforms inputs to outputs and appends them to an array.

## Source

[arrays.ts:236](https://github.com/softcraft-development/typonomy/blob/30acaf0c9fc726297ecfec68c62e8d1edc67bc52/src/arrays.ts#L236)
