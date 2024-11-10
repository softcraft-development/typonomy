[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / errorToObject

# Function: errorToObject()

> **errorToObject**(`error`): `Record`\<`string`, `unknown`\>

Converts an `Error` into an `object` with enumerable properties, including the `name` property.
If any of these properties are an `Error`, they will be recursively converted.

## Parameters

• **error**: `Error`

The error to convert.

## Returns

`Record`\<`string`, `unknown`\>

An object with the same properties of the `error`

## Source

[objects.ts:16](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/objects.ts#L16)
