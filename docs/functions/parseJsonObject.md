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

[json.ts:139](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/json.ts#L139)
