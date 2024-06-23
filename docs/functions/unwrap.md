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

[arrays.ts:299](https://github.com/softcraft-development/typonomy/blob/ed30302645156be7a3415a48b3f38706435f25d3/src/arrays.ts#L299)
