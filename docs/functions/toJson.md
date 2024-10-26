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

[json.ts:155](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/json.ts#L155)
