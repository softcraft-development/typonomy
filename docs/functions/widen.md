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

[typeGuards.ts:190](https://github.com/softcraft-development/typonomy/blob/f77f6002b19dd65199e89540af6d271db08bf123/src/typeGuards.ts#L190)
