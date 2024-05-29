[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isDefined

# Function: isDefined()

> **isDefined**\<`T`\>(`value`): `value is Exclude<T, undefined>`

Checks if a potentially undefined value is actually not undefined.

## Type parameters

• **T**

## Parameters

• **value**: [`Optional`](../type-aliases/Optional.md)\<`T`\>

The potentially undefined value to check.

## Returns

`value is Exclude<T, undefined>`

A boolean indicating whether the value is not undefined.

## Source

[nullish.ts:61](https://github.com/softcraft-development/typonomy/blob/ff6f66cc031bdf685fca6003f9d6a5ce5d03edf0/src/nullish.ts#L61)
