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

[arrays.ts:123](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/arrays.ts#L123)
