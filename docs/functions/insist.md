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

[nullish.ts:51](https://github.com/softcraft-development/typonomy/blob/16e8ada4ce77ce01fea3d62ce7f81f8090c6d1b6/src/nullish.ts#L51)
