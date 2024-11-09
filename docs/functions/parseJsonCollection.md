[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / parseJsonCollection

# Function: parseJsonCollection()

> **parseJsonCollection**(`possibleJson`): [`JsonCollection`](../type-aliases/JsonCollection.md)

Parses a string to a JSON array or object if possible.
Otherwise throws a `JsonParseError`.

## Parameters

• **possibleJson**: `string`

The string to parse as JSON.

## Returns

[`JsonCollection`](../type-aliases/JsonCollection.md)

A `Json[]` or `JsonObject` that was parsed from `possibleJson`.

## Throws

`JsonParseError` If `possibleJson` is not parsable as a JSON array or JSON object.

## Source

[json.ts:157](https://github.com/softcraft-development/typonomy/blob/eea886e2cab97560257369acf8e7d17e5016c6e5/src/json.ts#L157)
