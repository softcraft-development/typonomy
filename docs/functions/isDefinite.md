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

[nullish.ts:71](https://github.com/softcraft-development/typonomy/blob/765a39464ce76242064341d502188569b9fd202c/src/nullish.ts#L71)
