[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / typeGuardFor

# Function: typeGuardFor()

> **typeGuardFor**\<`T`\>(`predicates`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

Creates a Predicate that validates the properties of an object.

## Type parameters

• **T**

The Type to check against.

## Parameters

• **predicates**: \{ \[K in string \| number \| symbol\]: Predicate\<unknown\> \}

An object with a Predicate for properties in T.

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

A TypeGuard that checks if an object is of type T.

## Source

[objects.ts:67](https://github.com/softcraft-development/typonomy/blob/16e8ada4ce77ce01fea3d62ce7f81f8090c6d1b6/src/objects.ts#L67)
