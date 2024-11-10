[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isSingular

# Function: isSingular()

> **isSingular**\<`T`\>(`value`): `value is Defined<T>`

Checks if the given `Bag<T>` is a single `T`.

## Type parameters

• **T**

## Parameters

• **value**: [`Bag`](../type-aliases/Bag.md)\<`T`\>

The `Bag<T>` to check.

## Returns

`value is Defined<T>`

`true` if the value is a single `T`, `false` if it is an `Array<T>` or `undefined`.

## Source

[bags.ts:87](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/bags.ts#L87)
