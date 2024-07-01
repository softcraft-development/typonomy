[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isSingular

# Function: isSingular()

> **isSingular**\<`T`\>(`value`): `value is T`

Checks if the given `Bag<T>` is a single `T`.

## Type parameters

• **T**

## Parameters

• **value**: [`Bag`](../type-aliases/Bag.md)\<`T`\>

The `Bag<T>` to check.

## Returns

`value is T`

`true` if the value is a single `T`, `false` if it is an `Array<T>` or `undefined`.

## Source

[arrays.ts:196](https://github.com/softcraft-development/typonomy/blob/1b8341dc287f5d4629e29cda9ae815b4e8592c92/src/arrays.ts#L196)
