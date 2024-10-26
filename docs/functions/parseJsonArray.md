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

[json.ts:109](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/json.ts#L109)
