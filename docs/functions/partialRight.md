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

[fp.ts:151](https://github.com/softcraft-development/typonomy/blob/a62fc03e32b184f07c3799ae239136e6b1077839/src/fp.ts#L151)
