[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / widen

# Function: widen()

> **widen**\<`T`, `I`\>(`base`, `included`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T` \| `I`\>

Create a `TypeGuard` that includes values of another type.

## Type parameters

• **T**

The type of the base `TypeGuard`.

• **I**

The type to include.

## Parameters

• **base**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

A `TypeGuard` that allows the base type.

• **included**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`I`\>

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T` \| `I`\>

A wider `TypeGuard` that allows the base type or the included type.

## Source

[types.ts:80](https://github.com/softcraft-development/typonomy/blob/85e3fd32f5ede40463c64a3e9eb5ea415d4f2898/src/types.ts#L80)
