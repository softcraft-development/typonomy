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

• **value**: [`Optional`](../type-aliases/Optional.md)\<[`Some`](../type-aliases/Some.md)\<`T`\>\>

The value or array of values to wrap, if present.

## Returns

`T`[]

A the value if it's already an array, or a new array that contains the value if it is not `undefined`.

## Source

[arrays.ts:321](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/arrays.ts#L321)
