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

[json.ts:173](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/json.ts#L173)
