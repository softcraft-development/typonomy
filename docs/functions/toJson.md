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

[json.ts:189](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/json.ts#L189)
