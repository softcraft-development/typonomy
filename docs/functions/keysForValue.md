[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / keysForValue

# Function: keysForValue()

> **keysForValue**\<`T`\>(`obj`, `target`, `checkEquality`?): [`Optional`](../type-aliases/Optional.md)\<[`Some`](../type-aliases/Some.md)\<keyof `T`\>\>

Returns all keys (if any) that are mapped to the target value.

## Type parameters

• **T** *extends* `object`

## Parameters

• **obj**: `T`

The record or enum to search.

• **target**: `unknown`

The value to search for.
 *

• **checkEquality?**: [`Combine`](../type-aliases/Combine.md)\<`unknown`, `unknown`, `boolean`\>= `undefined`

A function to compare object values to the target value.

## Returns

[`Optional`](../type-aliases/Optional.md)\<[`Some`](../type-aliases/Some.md)\<keyof `T`\>\>

An optional array of keys that have the specified value.

## Source

[objects.ts:47](https://github.com/softcraft-development/typonomy/blob/a62fc03e32b184f07c3799ae239136e6b1077839/src/objects.ts#L47)
