[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / insist

# Function: insist()

> **insist**\<`T`\>(`value`): `T`

Ensures that the given value is not null or undefined.
If the value is null or undefined, an error is thrown.

## Type parameters

• **T**

## Parameters

• **value**: `undefined` \| `null` \| `T`

The value to be checked.

## Returns

`T`

The non-null non-undefined value.

## Throws

If the value is null or undefined.

## Source

[nullish.ts:8](https://github.com/softcraft-development/typonomy/blob/98e4fa0887f0ca1053297997df20bd5aab7be107/src/nullish.ts#L8)
