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

[objects.ts:150](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/objects.ts#L150)
