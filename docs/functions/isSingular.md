[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isSingular

# Function: isSingular()

> **isSingular**\<`T`\>(`value`): `value is T`

Checks if the given `Some<T>` is a single `T`

## Type parameters

• **T**

## Parameters

• **value**: [`Some`](../type-aliases/Some.md)\<`T`\>

The `Some<T>` to check.

## Returns

`value is T`

Returns true if the value is a single `T`, false if it is an `Array<T>`.

## Source

[arrays.ts:177](https://github.com/softcraft-development/typonomy/blob/fe50b8023c82b88ddae1a279519fbfc3eededb46/src/arrays.ts#L177)
