[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / compose

# Function: compose()

> **compose**\<`T`, `I`, `R`\>(`toIntermediate`, `toResult`): [`Transform`](../type-aliases/Transform.md)\<`T`, `R`\>

Composes a new transform from two existing transforms via an intermediate type.

## Type parameters

• **T**

The input type.

• **I**

The intermediate type.

• **R**

The result type.

## Parameters

• **toIntermediate**: [`Transform`](../type-aliases/Transform.md)\<`T`, `I`\>

A transform to from the input to the intermediate type.

• **toResult**: [`Transform`](../type-aliases/Transform.md)\<`I`, `R`\>

A transform from the intermediate type to the result type.

## Returns

[`Transform`](../type-aliases/Transform.md)\<`T`, `R`\>

The composed transform function.

## Source

[func.ts:120](https://github.com/softcraft-development/typonomy/blob/6cd020f80278694e706a0b517cce1e3ecb0a4458/src/func.ts#L120)
