[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / parseJsonObject

# Function: parseJsonObject()

> **parseJsonObject**(`possibleJson`): [`JsonObject`](../type-aliases/JsonObject.md)

Parses a string to a JSON Object if possible.
Otherwise throws a `JsonParseError`.

## Parameters

• **possibleJson**: `string`

The string to parse as JSON.

## Returns

[`JsonObject`](../type-aliases/JsonObject.md)

A `JsonObject` that was parsed from `possibleJson`.

## Throws

`JsonParseError` If `possibleJson` is not parsable as a JSON object.

## Source

[json.ts:173](https://github.com/softcraft-development/typonomy/blob/eea886e2cab97560257369acf8e7d17e5016c6e5/src/json.ts#L173)
