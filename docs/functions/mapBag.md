[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / mapBag

# Function: mapBag()

> **mapBag**\<`T`, `R`\>(`bag`, `mapper`): [`Bag`](../type-aliases/Bag.md)\<`R`\>

Transforms `Bag<T>` to `Bag<R>`.
If the value is plural, return a new array of transformed elements.
Note that the new array may be shorter than the original if the mapper breaks execution.
If the value is singular or `undefined`, return the transformed value,
or `undefined` if the mapper breaks execution.

## Type parameters

• **T**

The type to transform from.

• **R**

The type to transform to.

## Parameters

• **bag**: [`Bag`](../type-aliases/Bag.md)\<`T`\>

The `Bag<T>` to map.

• **mapper**: [`Mapper`](../type-aliases/Mapper.md)\<[`Optional`](../type-aliases/Optional.md)\<`T`\>, `R`\>

The mapping function to apply. If `bag` is singular, then the index will be `0`.

## Returns

[`Bag`](../type-aliases/Bag.md)\<`R`\>

A `Bag<R>` containing the transformed values.

## Source

[bags.ts:106](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/bags.ts#L106)
