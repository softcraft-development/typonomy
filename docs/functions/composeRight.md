[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / composeRight

# Function: composeRight()

> **composeRight**\<`A`, `B`, `I`, `R`\>(`toIntermediate`, `combineIntermediate`): [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

Composes a new Combine from an existing Combine for an intermediate type
and a Transform that transforms the second (right) type to that intermediate type.

## Type parameters

• **A**

The type of the left argument of the new Combine.

• **B**

The type of the right argument of the new Combine.

• **I**

The type of the intermediate value.

• **R**

The type of the result.

## Parameters

• **toIntermediate**: [`Transform`](../type-aliases/Transform.md)\<`B`, `I`\>

The function that transforms the right type to the intermediate type.

• **combineIntermediate**: [`Combine`](../type-aliases/Combine.md)\<`A`, `I`, `R`\>

The Combine function for the intermediate type.

## Returns

[`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

- The composed Combine function.

## Source

[fp.ts:103](https://github.com/softcraft-development/typonomy/blob/71207c5f8a51cd78ebdeff79293f44e522cae748/src/fp.ts#L103)
