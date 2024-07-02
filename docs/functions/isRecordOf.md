[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isRecordOf

# Function: isRecordOf()

> **isRecordOf**\<`K`, `V`\>(`value`, `keyGuard`, `valueGuard`, `emptyMatches`): `value is Record<K, V>`

Checks if the value is a Record of specific types.

## Type parameters

• **K** *extends* `PropertyKey`

The type of the keys in the record.

• **V**

The type of the values in the record.

## Parameters

• **value**: `unknown`

The value to check.

• **keyGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`K`\>

A TypeGuard that checks the type of the object's keys.

• **valueGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`V`\>

A TypeGuard that checks the type of the object's values.

• **emptyMatches**: `boolean`= `true`

The return value if the object is empty. Defaults to `true`.

## Returns

`value is Record<K, V>`

- Returns `true` if the `value` is an object whose keys are all of type `K`
 and values are all of type `V`, or `emptyMatches` if there are no keys.

## Source

[objects.ts:22](https://github.com/softcraft-development/typonomy/blob/71207c5f8a51cd78ebdeff79293f44e522cae748/src/objects.ts#L22)
