[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / insist

# Function: insist()

> **insist**\<`T`\>(`value`): `T`

Ensures that the given value is neither `null` nor `undefined`.
Throws an error if the value is `null` or `undefined`.

## Type parameters

• **T**

The type when it is not `null` or `undefined`.

## Parameters

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The value to be checked.

## Returns

`T`

The non-null non-undefined value.

## Throws

If the value is null or undefined.

## Source

[typeGuards.ts:12](https://github.com/softcraft-development/typonomy/blob/fe50b8023c82b88ddae1a279519fbfc3eededb46/src/typeGuards.ts#L12)
