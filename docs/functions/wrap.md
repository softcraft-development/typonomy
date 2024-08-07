[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / wrap

# Function: wrap()

> **wrap**\<`T`\>(`value`): `T`[]

Wraps a value or an array of values into an array.
If the input is already an array, return it as is.
If the input is a single defined value, wrap it in a new array.
If the input is `undefined`, return an empty array.

## Type parameters

• **T**

The type of the array elements.

## Parameters

• **value**: [`Bag`](../type-aliases/Bag.md)\<`T`\>

The value or array of values to wrap, if present.

## Returns

`T`[]

A the value if it's already an array, or a new array that contains the value if it is not `undefined`.

## Source

[arrays.ts:200](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/arrays.ts#L200)
