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

[arrays.ts:383](https://github.com/softcraft-development/typonomy/blob/30acaf0c9fc726297ecfec68c62e8d1edc67bc52/src/arrays.ts#L383)
