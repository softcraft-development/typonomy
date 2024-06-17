[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / composeLeft

# Function: composeLeft()

> **composeLeft**\<`A`, `B`, `I`, `R`\>(`toIntermediate`, `synthesizeIntermediate`): [`Synthesis`](../type-aliases/Synthesis.md)\<`A`, `B`, `R`\>

Composes a new Synthesis from an existing Synthesis for an intermediate type
and a Transform that transforms the first (left) type to that intermediate type.

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

• **toIntermediate**: [`Transform`](../type-aliases/Transform.md)\<`A`, `I`\>

The function that transforms the left type to the intermediate type.

• **synthesizeIntermediate**: [`Synthesis`](../type-aliases/Synthesis.md)\<`I`, `B`, `R`\>

The synthesis function for the intermediate type.

## Returns

[`Synthesis`](../type-aliases/Synthesis.md)\<`A`, `B`, `R`\>

- The composed synthesis function.

## Source

[func.ts:166](https://github.com/softcraft-development/typonomy/blob/ac449b6265e0e88e666105085e6c109ec445538b/src/func.ts#L166)
