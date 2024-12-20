[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / AssertError

# Class: AssertError\<X\>

Represents an error thrown when a type assertion is invalid.

## Extends

- `Error`

## Type parameters

• **X**

The type of the value that caused the assertion to fail.

## Constructors

### new AssertError()

> **new AssertError**\<`X`\>(`value`, `assertion`, `message`): [`AssertError`](AssertError.md)\<`X`\>

Creates an instance of `AssertError`.

#### Parameters

• **value**: `X`

The value that caused the assertion to fail.

• **assertion**: `string`

A description of the assertion that failed.

• **message**: `string`

An explanatory message.

#### Returns

[`AssertError`](AssertError.md)\<`X`\>

#### Overrides

`Error.constructor`

#### Source

[assertions.ts:19](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/assertions.ts#L19)

## Properties

### assertion

> `readonly` **assertion**: `string`

A description of the assertion that failed.

#### Source

[assertions.ts:21](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/assertions.ts#L21)

***

### value

> `readonly` **value**: `X`

The value that caused the assertion to fail.

#### Source

[assertions.ts:20](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/assertions.ts#L20)

## Methods

### withMessageFactory()

> `static` **withMessageFactory**\<`X`\>(`value`, `assertion`, `messageFactory`): [`AssertError`](AssertError.md)\<`X`\>

#### Type parameters

• **X** = `unknown`

#### Parameters

• **value**: `X`

• **assertion**: `string`

• **messageFactory**: [`Combine`](../type-aliases/Combine.md)\<`X`, `string`, `string`\>= `assertErrorMessage`

#### Returns

[`AssertError`](AssertError.md)\<`X`\>

#### Source

[assertions.ts:27](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/assertions.ts#L27)
