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

[typeGuards.ts:12](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/typeGuards.ts#L12)
