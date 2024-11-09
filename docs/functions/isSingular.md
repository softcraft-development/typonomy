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

[bags.ts:87](https://github.com/softcraft-development/typonomy/blob/eea886e2cab97560257369acf8e7d17e5016c6e5/src/bags.ts#L87)
