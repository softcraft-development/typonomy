[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / AssertError

# Class: AssertError\<X\>

## Extends

- `Error`

## Type parameters

• **X**

## Constructors

### new AssertError()

> **new AssertError**\<`X`\>(`value`, `assertion`, `messageFactory`): [`AssertError`](AssertError.md)\<`X`\>

#### Parameters

• **value**: `X`

• **assertion**: `string`

• **messageFactory**: [`AssertMessageFactory`](../type-aliases/AssertMessageFactory.md)\<`X`\>= `assertErrorMessage`

#### Returns

[`AssertError`](AssertError.md)\<`X`\>

#### Overrides

`Error.constructor`

#### Source

[assertions.ts:8](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/assertions.ts#L8)

## Properties

### assertion

> `readonly` **assertion**: `string`

#### Source

[assertions.ts:10](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/assertions.ts#L10)

***

### value

> `readonly` **value**: `X`

#### Source

[assertions.ts:9](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/assertions.ts#L9)
