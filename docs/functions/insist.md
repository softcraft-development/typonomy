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

[assertions.ts:48](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/assertions.ts#L48)
