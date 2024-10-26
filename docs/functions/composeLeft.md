[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / composeLeft

# Function: composeLeft()

> **composeLeft**\<`A`, `B`, `I`, `R`\>(`toIntermediate`, `combineIntermediate`): [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

Composes a new Combine from an existing Combine for an intermediate type
and a Transform that transforms the first (left) type to that intermediate type.

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

• **toIntermediate**: [`Transform`](../type-aliases/Transform.md)\<`A`, `I`\>

The function that transforms the left type to the intermediate type.

• **combineIntermediate**: [`Combine`](../type-aliases/Combine.md)\<`I`, `B`, `R`\>

The Combine function for the intermediate type.

## Returns

[`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

- The composed Combine function.

## Source

[fp.ts:73](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/fp.ts#L73)
