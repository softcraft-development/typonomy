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

[fp.ts:119](https://github.com/softcraft-development/typonomy/blob/71207c5f8a51cd78ebdeff79293f44e522cae748/src/fp.ts#L119)
