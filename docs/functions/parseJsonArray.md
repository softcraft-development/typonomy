[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / parseJsonArray

# Function: parseJsonArray()

> **parseJsonArray**(`possibleJson`): [`Json`](../type-aliases/Json.md)[]

Parses a string to a JSON array if possible.
Otherwise throws a `JsonParseError`.

## Parameters

• **possibleJson**: `string`

The string to parse as JSON.

## Returns

[`Json`](../type-aliases/Json.md)[]

A `Json[]` that was parsed from `possibleJson`.

## Throws

`JsonParseError` If `possibleJson` is not parsable as a JSON array.

## Source

[json.ts:143](https://github.com/softcraft-development/typonomy/blob/eea886e2cab97560257369acf8e7d17e5016c6e5/src/json.ts#L143)
