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

[json.ts:169](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/json.ts#L169)

## Properties

### cause?

> `optional` `readonly` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Source

[json.ts:169](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/json.ts#L169)

***

### invalid

> `readonly` **invalid**: `string`

#### Source

[json.ts:169](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/json.ts#L169)
