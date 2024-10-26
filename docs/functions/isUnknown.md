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

[typeGuards.ts:42](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/typeGuards.ts#L42)
