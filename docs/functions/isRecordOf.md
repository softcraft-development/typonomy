[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isRecordOf

# Function: isRecordOf()

> **isRecordOf**\<`T`\>(`obj`, `guard`, `emptyMatches`): `obj is Record<string, T>`

Checks if the value is a Record of specific types

## Type parameters

• **T**

## Parameters

• **obj**: `unknown`

The value to check.

• **guard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

A TypeGuard that checks the type of the object's values.

• **emptyMatches**: `boolean`= `true`

## Returns

`obj is Record<string, T>`

- Returns true if the value is an object whose properties are all of type T.

## Source

[objects.ts:34](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/objects.ts#L34)
