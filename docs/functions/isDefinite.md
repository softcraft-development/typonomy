[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isDefinite

# Function: isDefinite()

> **isDefinite**\<`T`\>(`value`): `value is Exclude<T, Nullish>`

Checks if a potentially null or undefined value is actually neither null nor undefined.

## Type parameters

• **T**

## Parameters

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The potentially null or undefined value to check.

## Returns

`value is Exclude<T, Nullish>`

A boolean indicating whether the value is neither null nor undefined.

## Source

[nullish.ts:71](https://github.com/softcraft-development/typonomy/blob/ff6f66cc031bdf685fca6003f9d6a5ce5d03edf0/src/nullish.ts#L71)
