[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / toJson

# Function: toJson()

> **toJson**(`possibleJson`): [`Json`](../type-aliases/Json.md)

Parses a string to a parsable JSON value if possible.
Otherwise returns the original string.

## Parameters

• **possibleJson**: `string`

The string to parse as JSON.

## Returns

[`Json`](../type-aliases/Json.md)

A `JsonParsed` that was parsed from `possibleJson`, or `possibleJson` if nothing could be parsed.

## Source

[json.ts:194](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/json.ts#L194)
