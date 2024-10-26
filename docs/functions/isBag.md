[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isBag

# Function: isBag()

> **isBag**\<`T`\>(`value`, `typeGuard`): `value is Bag<T>`

Checks a value is a `Bag` of values that could match a specific type.

## Type parameters

• **T**

The type to check.

## Parameters

• **value**: `unknown`

The value to check.

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

A function to check individual values

## Returns

`value is Bag<T>`

`true` the value is of the specified type,
 `undefined`, an array of that type or `undefined`, or an empty array; `false` otherwise.

## Source

[bags.ts:61](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/bags.ts#L61)
