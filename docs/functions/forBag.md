[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / forBag

# Function: forBag()

> **forBag**\<`T`\>(`bag`, `callback`): `void`

Apply a callback to each element in a `Bag<T>`,
unless the callback breaks execution.

## Type parameters

• **T**

The type of value in the `Bag`.

## Parameters

• **bag**: [`Bag`](../type-aliases/Bag.md)\<`T`\>

The `Bag<T>` on which to apply the callback.

• **callback**

The callback function to apply. If `bag` is singular, then the index will be `0`.

## Returns

`void`

## Source

[bags.ts:46](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/bags.ts#L46)
