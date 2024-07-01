[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / partialLeft

# Function: partialLeft()

> **partialLeft**\<`A`, `B`, `R`\>(`combine`, `value`): [`Transform`](../type-aliases/Transform.md)\<`B`, `R`\>

Partially apply a value to the left (first) parameter of a `Combine`.
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

• **value**: `A`

The value to partially apply to left parameter of the `Combine`.

## Returns

[`Transform`](../type-aliases/Transform.md)\<`B`, `R`\>

A `Transform` function function for the right parameter of the `Combine`.

## Source

[fp.ts:141](https://github.com/softcraft-development/typonomy/blob/30acaf0c9fc726297ecfec68c62e8d1edc67bc52/src/fp.ts#L141)
