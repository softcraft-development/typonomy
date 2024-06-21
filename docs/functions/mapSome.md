[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / mapSome

# Function: mapSome()

> **mapSome**\<`F`, `T`\>(`value`, `mapper`): [`Some`](../type-aliases/Some.md)\<`T`\>

Transforms `Some<F>` to `Some<T>`.
If the value is plural, transform each element into a new `T[]`

## Type parameters

• **F**

• **T**

## Parameters

• **value**: [`Some`](../type-aliases/Some.md)\<`F`\>

The `Some<F>` to map.

• **mapper**: [`Combine`](../type-aliases/Combine.md)\<`F`, `number`, `T`\>

The mapping function to apply. If `some` is singular, then the second parameter will be `0`.

## Returns

[`Some`](../type-aliases/Some.md)\<`T`\>

The transformed `Some<T>`.

## Source

[arrays.ts:157](https://github.com/softcraft-development/typonomy/blob/85e3fd32f5ede40463c64a3e9eb5ea415d4f2898/src/arrays.ts#L157)
