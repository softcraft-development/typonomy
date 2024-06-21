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

[arrays.ts:143](https://github.com/softcraft-development/typonomy/blob/6cd020f80278694e706a0b517cce1e3ecb0a4458/src/arrays.ts#L143)
