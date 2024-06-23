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

[arrays.ts:306](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/arrays.ts#L306)
