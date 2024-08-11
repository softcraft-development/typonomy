[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / mapReducer

# Function: mapReducer()

> **mapReducer**\<`T`, `R`\>(`mapper`): [`Reducer`](../type-aliases/Reducer.md)\<`R`[], `T`, `number`\>

Converts a indexed mapping function into an array `Reducer`.

## Type parameters

• **T**

The type of input elements.

• **R**

The type of the output elements.

## Parameters

• **mapper**: [`Mapper`](../type-aliases/Mapper.md)\<`T`, `R`\>

A function that maps the input element (and possibly the element's index) to the output element.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`R`[], `T`, `number`\>

A `Reducer` that transforms inputs to outputs and appends them to an array.

## Source

[arrays.ts:98](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/arrays.ts#L98)
