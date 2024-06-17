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

[types.ts:69](https://github.com/softcraft-development/typonomy/blob/a265c54b67d3009e0095d9a5a897bf61d10478cf/src/types.ts#L69)
