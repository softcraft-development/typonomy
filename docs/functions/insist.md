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

[nullish.ts:49](https://github.com/softcraft-development/typonomy/blob/b2f9399cc7ee48148cc20b59e77776d46b4d859d/src/nullish.ts#L49)
