[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / composeRight

# Function: composeRight()

> **composeRight**\<`A`, `B`, `I`, `R`\>(`toIntermediate`, `synthesizeIntermediate`): [`Synthesis`](../type-aliases/Synthesis.md)\<`A`, `B`, `R`\>

Composes a new Synthesis from an existing Synthesis for an intermediate type
and a Transform that transforms the second (right) type to that intermediate type.

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

• **toIntermediate**: [`Transform`](../type-aliases/Transform.md)\<`B`, `I`\>

The function that transforms the right type to the intermediate type.

• **synthesizeIntermediate**: [`Synthesis`](../type-aliases/Synthesis.md)\<`A`, `I`, `R`\>

The synthesis function for the intermediate type.

## Returns

[`Synthesis`](../type-aliases/Synthesis.md)\<`A`, `B`, `R`\>

- The composed synthesis function.

## Source

[func.ts:172](https://github.com/softcraft-development/typonomy/blob/e9724ba9d0c158a8beed5b634614d25b27c7288a/src/func.ts#L172)
