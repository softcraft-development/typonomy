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

[nullish.ts:49](https://github.com/softcraft-development/typonomy/blob/289df70d83b2b1e3049cb23856e86e275cb8aa8a/src/nullish.ts#L49)
