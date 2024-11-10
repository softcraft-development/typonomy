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

[json.ts:148](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/json.ts#L148)
