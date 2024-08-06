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

[fp.ts:244](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/fp.ts#L244)
