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

[objects.ts:183](https://github.com/softcraft-development/typonomy/blob/eea886e2cab97560257369acf8e7d17e5016c6e5/src/objects.ts#L183)
