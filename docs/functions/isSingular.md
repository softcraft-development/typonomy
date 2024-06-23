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

[arrays.ts:168](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/arrays.ts#L168)
