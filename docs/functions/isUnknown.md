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

[typeGuards.ts:158](https://github.com/softcraft-development/typonomy/blob/30acaf0c9fc726297ecfec68c62e8d1edc67bc52/src/typeGuards.ts#L158)
