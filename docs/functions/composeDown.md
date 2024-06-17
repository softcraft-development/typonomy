[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / composeDown

# Function: composeDown()

> **composeDown**\<`A`, `B`, `I`, `R`\>(`synthesizeIntermediate`, `toResult`): [`Synthesis`](../type-aliases/Synthesis.md)\<`A`, `B`, `R`\>

Composes a new Synthesis from an existing Synthesis that returns an intermediate type
and a Transform that transforms the intermediate type to the result type.

## Type parameters

• **A**

The type of the left argument of the new Synthesis.

• **B**

The type of the right argument of the new Synthesis.

• **I**

The type of the intermediate value.

• **R**

The type of the result.

## Parameters

• **synthesizeIntermediate**: [`Synthesis`](../type-aliases/Synthesis.md)\<`A`, `B`, `I`\>

The synthesis function that returns the intermediate type.

• **toResult**: [`Transform`](../type-aliases/Transform.md)\<`I`, `R`\>

The function that transforms the intermediate type to the result type.

## Returns

[`Synthesis`](../type-aliases/Synthesis.md)\<`A`, `B`, `R`\>

- The composed synthesis function.

## Source

[func.ts:143](https://github.com/softcraft-development/typonomy/blob/16e8ada4ce77ce01fea3d62ce7f81f8090c6d1b6/src/func.ts#L143)
