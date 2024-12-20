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

[json.ts:208](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/json.ts#L208)

## Properties

### cause?

> `optional` `readonly` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Source

[json.ts:208](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/json.ts#L208)

***

### invalid

> `readonly` **invalid**: `string`

#### Source

[json.ts:208](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/json.ts#L208)
