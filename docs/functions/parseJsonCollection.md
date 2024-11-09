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

[json.ts:157](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/json.ts#L157)
