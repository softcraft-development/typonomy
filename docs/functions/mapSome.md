[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / mapSome

# Function: mapSome()

> **mapSome**\<`T`, `R`\>(`some`, `mapper`): [`Some`](../type-aliases/Some.md)\<`R`\>

Transforms `Some<T>` to `Some<R>`.
If the value is plural, transform each element into a new `T[]`.
If the mapper breaks execution, return an empty array.

## Type parameters

• **T**

The type to transform from.

• **R**

The type to transform to.

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`T`\>

The `Some<T>` to map.

• **mapper**: [`IndexedMapper`](../type-aliases/IndexedMapper.md)\<`T`, `R`\>

The mapping function to apply. If `some` is singular, then the second parameter will be `0`.

## Returns

[`Some`](../type-aliases/Some.md)\<`R`\>

An `R` for a single `T`,
 or an array of `R` for an array of `T`,
 or an empty array if the mapper breaks execution on a single `T`.

## Source

[arrays.ts:256](https://github.com/softcraft-development/typonomy/blob/5469316e6ff7a55df7069c91f81292468fab4b62/src/arrays.ts#L256)
