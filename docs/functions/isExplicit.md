[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isExplicit

# Function: isExplicit()

> **isExplicit**\<`T`\>(`value`): `value is Exclude<T, Nullish>`

Checks if a value is not `Nullish`.

## Type parameters

• **T**

The type when it is not `null` or `undefined`.

## Parameters

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The value to check.

## Returns

`value is Exclude<T, Nullish>`

`false` if the value is `null` or `undefined`; `true` otherwise.

## Source

[nullish.ts:65](https://github.com/softcraft-development/typonomy/blob/a265c54b67d3009e0095d9a5a897bf61d10478cf/src/nullish.ts#L65)
