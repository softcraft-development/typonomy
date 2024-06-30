[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isPlural

# Function: isPlural()

> **isPlural**\<`T`\>(`value`): `value is T[]`

Checks if the given `Bag<T>` is an array of `T`.
Note that an empty array, or an array of one element, is still considered plural.

## Type parameters

• **T**

## Parameters

• **value**: [`Bag`](../type-aliases/Bag.md)\<`T`\>

The `Bag<T>` to check.

## Returns

`value is T[]`

`true` if the value is an `Array<T>`, `false` if it is a single `T` or `undefined`.

## Source

[arrays.ts:185](https://github.com/softcraft-development/typonomy/blob/5469316e6ff7a55df7069c91f81292468fab4b62/src/arrays.ts#L185)
