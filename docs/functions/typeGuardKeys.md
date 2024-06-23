[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / typeGuardKeys

# Function: typeGuardKeys()

> **typeGuardKeys**\<`T`\>(`example`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<keyof `T`\>

Returns a type guard for the keys of an object.

## Type parameters

• **T** *extends* `object`

## Parameters

• **example**: `T`

The object to create the type guard for.

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<keyof `T`\>

A type guard function that checks if a value is a key of the object.

## Source

[objects.ts:161](https://github.com/softcraft-development/typonomy/blob/f77f6002b19dd65199e89540af6d271db08bf123/src/objects.ts#L161)
