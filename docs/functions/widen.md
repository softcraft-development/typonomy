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

[types.ts:80](https://github.com/softcraft-development/typonomy/blob/9e2d0980378fcdcaa426a5b6cdba20880ae25840/src/types.ts#L80)