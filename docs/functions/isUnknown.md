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

[typeGuards.ts:236](https://github.com/softcraft-development/typonomy/blob/71207c5f8a51cd78ebdeff79293f44e522cae748/src/typeGuards.ts#L236)
