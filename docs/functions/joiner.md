[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / joiner

# Function: joiner()

> **joiner**(`separator`): [`Combine`](../type-aliases/Combine.md)\<[`Possible`](../type-aliases/Possible.md)\<`string`\>, [`Possible`](../type-aliases/Possible.md)\<`string`\>, [`Optional`](../type-aliases/Optional.md)\<`string`\>\>

Create a Combine that concatenates two strings with a given separator.
If both values are `Nullish`, return `undefined`.
If one value is `Nullish`, return the other string.
Can be used as a Reducer for strings as well.

## Parameters

• **separator**: `string`= `","`

The string used to join two strings. Defaults to `,`.

## Returns

[`Combine`](../type-aliases/Combine.md)\<[`Possible`](../type-aliases/Possible.md)\<`string`\>, [`Possible`](../type-aliases/Possible.md)\<`string`\>, [`Optional`](../type-aliases/Optional.md)\<`string`\>\>

A function that joins strings using `separator` when both strings are not `Nullish`,
  or returns the other string when one is `Nullish`
  or `undefined` when both are `Nullish`.

## Source

[strings.ts:30](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/strings.ts#L30)
