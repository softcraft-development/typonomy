[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isNumber

# Function: isNumber()

> **isNumber**(`value`, `nanAllowed`, `infiniteAllowed`): `value is number`

Checks if a value is a number.

## Parameters

• **value**: `unknown`

The value to check.

• **nanAllowed**: `boolean`= `false`

Whether `NaN` considered a valid number. Defaults to `false`.

• **infiniteAllowed**: `boolean`= `false`

Whether `Infinity` or `-Infinity` are considered a valid numbers. Defaults to `false`.

## Returns

`value is number`

`true` if the value is a number (including `NaN`, `Infinity`, or `-Infinity` when allowed),
  `false` otherwise.

## Source

[numbers.ts:49](https://github.com/softcraft-development/typonomy/blob/eea886e2cab97560257369acf8e7d17e5016c6e5/src/numbers.ts#L49)
