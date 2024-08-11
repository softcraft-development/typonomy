[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / mapSome

# Function: mapSome()

> **mapSome**\<`T`, `R`\>(`some`, `mapper`): [`Some`](../type-aliases/Some.md)\<`R`\>

Transforms `Some<T>` to `Some<R>`.
If the value is plural, return a new array of transformed elements.
Note that the new array may be shorter than the original if the mapper breaks execution.
If the value is singular return the transformed value,
or an empty array if the mapper breaks execution.

## Type parameters

• **T**

The type to transform from.

• **R**

The type to transform to.

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`T`\>

The `Some<T>` to map.

• **mapper**: [`Mapper`](../type-aliases/Mapper.md)\<[`Defined`](../type-aliases/Defined.md)\<`T`\>, [`Defined`](../type-aliases/Defined.md)\<`R`\>\>

The mapping function to apply. If `some` is singular, then the index will be `0`.

## Returns

[`Some`](../type-aliases/Some.md)\<`R`\>

A `Some<R>` containing the transformed values.
 May be an empty array if the mapper breaks execution on a singular `some`.

## Source

[some.ts:54](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/some.ts#L54)
