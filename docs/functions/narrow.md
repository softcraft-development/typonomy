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

[typeGuards.ts:247](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/typeGuards.ts#L247)
