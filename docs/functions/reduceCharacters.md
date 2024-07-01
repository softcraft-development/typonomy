[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceCharacters

# Function: reduceCharacters()

> **reduceCharacters**\<`S`\>(`str`, `reducer`, `initialState`): `S`

Reduce each character in a string.

## Type parameters

• **S**

The type of the accumulated state.

## Parameters

• **str**: `string`

The input string.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `string`, `number`\>

The reducer function to apply to each character.

• **initialState**: `S`

The initial state value.

## Returns

`S`

- The reduced state.

## Source

[strings.ts:27](https://github.com/softcraft-development/typonomy/blob/30acaf0c9fc726297ecfec68c62e8d1edc67bc52/src/strings.ts#L27)
