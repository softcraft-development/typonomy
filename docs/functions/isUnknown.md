[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isUnknown

# Function: isUnknown()

> **isUnknown**(`value`): `value is unknown`

Confirms that an `unknown` value is `unknown`.
Really only useful for widening other compound type guards.

## Parameters

• **value**: `unknown`

The value to check.

## Returns

`value is unknown`

Always `true`, since the input `value` is defined as `unknown`.

## Source

[typeGuards.ts:158](https://github.com/softcraft-development/typonomy/blob/1b8341dc287f5d4629e29cda9ae815b4e8592c92/src/typeGuards.ts#L158)
