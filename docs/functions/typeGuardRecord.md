[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / typeGuardRecord

# Function: typeGuardRecord()

> **typeGuardRecord**\<`K`, `V`\>(`keyGuard`, `valueGuard`, `emptyMatches`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`Record`\<`K`, `V`\>\>

Creates type guard for Records with specific types of keys and values.

## Type parameters

• **K** *extends* `PropertyKey`

The type of the keys in the record. Must be a `PropertyKey`.

• **V**

The type of the values in the record.

## Parameters

• **keyGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`K`\>

A TypeGuard that checks the type of the object's keys.

• **valueGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`V`\>

A TypeGuard that checks the type of the object's values.

• **emptyMatches**: `boolean`= `true`

The return value if the object is empty. Defaults to `true`.

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`Record`\<`K`, `V`\>\>

- Returns a TypeGuard for a specific form of `Record`

## Source

[objects.ts:135](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/objects.ts#L135)
