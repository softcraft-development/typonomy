[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / unwrap

# Function: unwrap()

> **unwrap**\<`T`\>(`value`): [`Optional`](../type-aliases/Optional.md)\<[`Some`](../type-aliases/Some.md)\<`T`\>\>

Unwraps an array, returning the array, the only element of the array, or `undefined` if there are no elements.

## Type parameters

• **T**

The type of the array elements.

## Parameters

• **value**: `T`[]

The array to unwrap

## Returns

[`Optional`](../type-aliases/Optional.md)\<[`Some`](../type-aliases/Some.md)\<`T`\>\>

The the first array element if it's the only one,
  the whole array if there's more than one element,
  or `undefined` if the array is empty.

## Source

[arrays.ts:368](https://github.com/softcraft-development/typonomy/blob/30acaf0c9fc726297ecfec68c62e8d1edc67bc52/src/arrays.ts#L368)
