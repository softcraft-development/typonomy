[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / keysForValue

# Function: keysForValue()

> **keysForValue**\<`T`\>(`obj`, `target`, `checkEquality`?): [`Bag`](../type-aliases/Bag.md)\<keyof `T`\>

Returns all keys (if any) that are mapped to the target value.

## Type parameters

• **T** *extends* `object`

## Parameters

• **obj**: `T`

The record or enum to search.

• **target**: `unknown`

The value to search for.

• **checkEquality?**: [`Combine`](../type-aliases/Combine.md)\<`unknown`, `unknown`, `boolean`\>= `undefined`

A function to compare object values to the target value.

## Returns

[`Bag`](../type-aliases/Bag.md)\<keyof `T`\>

An optional array of keys that have the specified value.

## Source

[objects.ts:104](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/objects.ts#L104)
