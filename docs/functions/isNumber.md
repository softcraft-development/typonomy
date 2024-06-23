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

[types.ts:37](https://github.com/softcraft-development/typonomy/blob/b0e16bd041f316a076ebba1edb1d4cf521b110ee/src/types.ts#L37)
