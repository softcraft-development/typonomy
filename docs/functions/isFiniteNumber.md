[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isFiniteNumber

# Function: isFiniteNumber()

> **isFiniteNumber**(`value`): `value is Finite`

Checks if a value is a `number` that is not `Infinity`, `-Infinity`, or `NaN`.
Note that this is the branded type guard version of `isFinite`.

## Parameters

• **value**: `unknown`

The value to check.

## Returns

`value is Finite`

`true` if `value` is a `number` which is not `Infinity`, `-Infinity` or `NaN`; `false` otherwise.

## Source

[numbers.ts:9](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/numbers.ts#L9)
