[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / JsonParseError

# Class: JsonParseError

The `Error` thrown when a string is not parsable as JSON,
but is expected to be.

## Extends

- `Error`

## Constructors

### new JsonParseError()

> **new JsonParseError**(`message`, `invalid`, `cause`?): [`JsonParseError`](JsonParseError.md)

#### Parameters

• **message**: `string`

• **invalid**: `string`

• **cause?**: `unknown`

#### Returns

[`JsonParseError`](JsonParseError.md)

#### Overrides

`Error.constructor`

#### Source

[json.ts:203](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/json.ts#L203)

## Properties

### cause?

> `optional` `readonly` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Source

[json.ts:203](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/json.ts#L203)

***

### invalid

> `readonly` **invalid**: `string`

#### Source

[json.ts:203](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/json.ts#L203)
