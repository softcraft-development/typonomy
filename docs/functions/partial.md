[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / partial

# Function: partial()

> **partial**\<`T`, `R`\>(`transform`, `value`): [`Thunk`](../type-aliases/Thunk.md)\<`R`\>

Partially apply a value to a `Transform`.
Reduces the order of the function from 1 to 0.

## Type parameters

• **T**

The type of the value to transform.

• **R**

The type of the result.

## Parameters

• **transform**: [`Transform`](../type-aliases/Transform.md)\<`T`, `R`\>

The transform function.

• **value**: `T`

The value to partially apply to the transform.

## Returns

[`Thunk`](../type-aliases/Thunk.md)\<`R`\>

A Thunk function that returns the transformed input value.

## Source

[func.ts:319](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/func.ts#L319)
