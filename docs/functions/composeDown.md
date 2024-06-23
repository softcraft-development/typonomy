[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / composeDown

# Function: composeDown()

> **composeDown**\<`A`, `B`, `I`, `R`\>(`combineIntermediate`, `toResult`): [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

Composes a new Combine from an existing Combine that returns an intermediate type
and a Transform that transforms the intermediate type to the result type.

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

• **combineIntermediate**: [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `I`\>

The Combine that returns the intermediate type.

• **toResult**: [`Transform`](../type-aliases/Transform.md)\<`I`, `R`\>

The function that transforms the intermediate type to the result type.

## Returns

[`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

- The composed Combine function.

## Source

[fp.ts:36](https://github.com/softcraft-development/typonomy/blob/a62fc03e32b184f07c3799ae239136e6b1077839/src/fp.ts#L36)
