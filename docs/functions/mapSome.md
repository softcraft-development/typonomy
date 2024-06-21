[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / mapSome

# Function: mapSome()

> **mapSome**\<`T`, `R`\>(`some`, `mapper`): [`Some`](../type-aliases/Some.md)\<`R`\>

Transforms `Some<T>` to `Some<R>`.
If the value is plural, transform each element into a new `T[]`

## Type parameters

• **T**

• **R**

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`T`\>

The `Some<T>` to map.

• **mapper**: [`Combine`](../type-aliases/Combine.md)\<`T`, `number`, `R`\>

The mapping function to apply. If `some` is singular, then the second parameter will be `0`.

## Returns

[`Some`](../type-aliases/Some.md)\<`R`\>

The transformed `Some<R>`.

## Source

[arrays.ts:170](https://github.com/softcraft-development/typonomy/blob/14556f6ce24da12ae1545e4a4295c60ae5e18fe4/src/arrays.ts#L170)
