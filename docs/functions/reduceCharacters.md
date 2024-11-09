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

[strings.ts:57](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/strings.ts#L57)
