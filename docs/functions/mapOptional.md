[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / mapOptional

# Function: mapOptional()

> **mapOptional**\<`T`, `R`\>(`map`): [`Mapper`](../type-aliases/Mapper.md)\<[`Optional`](../type-aliases/Optional.md)\<`T`\>, [`Optional`](../type-aliases/Optional.md)\<`R`\>\>

Widen a mapping function to operate on `Optional` values.
`undefined` inputs will be translated to `undefined` outputs.

## Type parameters

• **T**

• **R**

## Parameters

• **map**: [`Mapper`](../type-aliases/Mapper.md)\<`T`, `R`\>

The mapping function to apply.

## Returns

[`Mapper`](../type-aliases/Mapper.md)\<[`Optional`](../type-aliases/Optional.md)\<`T`\>, [`Optional`](../type-aliases/Optional.md)\<`R`\>\>

A new mapping function that operates on optional values.

## Source

[fp.ts:209](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/fp.ts#L209)
