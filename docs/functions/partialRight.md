[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / partialRight

# Function: partialRight()

> **partialRight**\<`A`, `B`, `R`\>(`combine`, `value`): [`Transform`](../type-aliases/Transform.md)\<`A`, `R`\>

Partially apply a value to the right (second) parameter of a `Combine`.
Reduces the order of the function from 2 to 1.

## Type parameters

• **A**

The type of the left argument of the `Combine`.

• **B**

The type of the right argument of the `Combine`.

• **R**

The type of the result.

## Parameters

• **combine**: [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

The `Combine` function.

• **value**: `B`

The value to partially apply to right parameter of the `Combine`.

## Returns

[`Transform`](../type-aliases/Transform.md)\<`A`, `R`\>

A `Transform` function function for the left parameter of the `Combine`.

## Source

[func.ts:279](https://github.com/softcraft-development/typonomy/blob/6cd020f80278694e706a0b517cce1e3ecb0a4458/src/func.ts#L279)
