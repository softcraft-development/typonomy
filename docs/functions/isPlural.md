[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isPlural

# Function: isPlural()

> **isPlural**\<`T`\>(`value`): `value is T[]`

Checks if the given `Bag<T>` is an array of `T`.
Note that an empty array, or an array of one element, or an array of `undefined`
are all still considered plural.

## Type parameters

• **T**

## Parameters

• **value**: [`Bag`](../type-aliases/Bag.md)\<`T`\>

The `Bag<T>` to check.

## Returns

`value is T[]`

`true` if the value is an `Array<T>`, `false` if it is a single `T` or `undefined`.

## Source

[bags.ts:76](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/bags.ts#L76)
