[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / parseJson

# Function: parseJson()

> **parseJson**(`possibleJson`): [`JsonParsed`](../type-aliases/JsonParsed.md)

Parses a string to a `JsonParsed` value if possible.
Otherwise throws a `JsonParseError`.

All strings are valid strings in JSON, but only some of them are parsable to other valid
These parsable JSON types are:
  * `null`
  * `Finite` (a subset of `number` that excludes `NaN` and `Infinity`.)
  * `boolean`
  * `Json[]` (which may be a `string[]`)
  * `JsonObject` (which may be a `Record<string, string>`)

If `possibleJson` is not parsable as one of these types, then it may be:
  * A string that's intended to be an arbitrary and valid JSON string.
  * A string that's an improperly-formatted JSON object or array.

No JSON parser can distinguish between these two cases.
`parseJson` assumes that `possibleJson` is intended to be strictly parsable as one of these types,
and will throw a `JsonParseError` otherwise.
If the intention of the string is different, try using one of these other functions:
  * [parseJsonArray](parseJsonArray.md) for strings intended to be to JSON arrays.
  * [parseJsonObject](parseJsonObject.md) for strings intended to be to JSON objects.
  * [parseJsonCollection](parseJsonCollection.md) for strings intended to be either JSON arrays or JSON objects.
  * [toJson](toJson.md) for strings of uncertain intention.

## Parameters

• **possibleJson**: `string`

The string to parse as JSON.

## Returns

[`JsonParsed`](../type-aliases/JsonParsed.md)

A `JsonParsed` that was parsed from `possibleJson`.

## Throws

`JsonParseError` If `possibleJson` is not parsable as a `JsonParsed`.

## Source

[json.ts:131](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/json.ts#L131)
