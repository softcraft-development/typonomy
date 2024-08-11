[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / partial

# Function: partial()

> **partial**\<`T`, `R`\>(`transform`, `value`): [`Thunk`](../type-aliases/Thunk.md)\<`R`\>

Partially apply a value to a `Transform`.
Reduces the arity of the function from 1 to 0.

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

[fp.ts:244](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/fp.ts#L244)
