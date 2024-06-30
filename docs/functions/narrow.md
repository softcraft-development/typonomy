[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / narrow

# Function: narrow()

> **narrow**\<`T`, `X`\>(`base`, `excluded`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`Exclude`\<`T` \| `X`, `X`\>\>

Create a `TypeGuard` that excludes values of another type.

## Type parameters

• **T**

The base type of the resulting `TypeGuard`.

• **X**

The type to exclude.

## Parameters

• **base**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T` \| `X`\>

A `TypeGuard` that allows either the base type or excluded type.

• **excluded**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`X`\>

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`Exclude`\<`T` \| `X`, `X`\>\>

A narrower `TypeGuard` that only allows the base type.

## Source

[typeGuards.ts:169](https://github.com/softcraft-development/typonomy/blob/fe50b8023c82b88ddae1a279519fbfc3eededb46/src/typeGuards.ts#L169)
