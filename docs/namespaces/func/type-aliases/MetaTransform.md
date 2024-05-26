[**Typonomy**](../../../README.md) • **Docs**

***

[Typonomy](../../../globals.md) / [func](../README.md) / MetaTransform

# Type alias: MetaTransform()\<A, B, R\>

> **MetaTransform**\<`A`, `B`, `R`\>: (`fn`) => [`Transform`](Transform.md)\<`B`, `R`\>

A function that transforms one Transform function into another.
If you want a function that transforms one type <B> to another type <R>,
but only know/have a function that converts another type <A> to that same type <R>,
a MetaTransform will help get you from <A> to <B>.

## Typeparam

A The input type that you have.

## Typeparam

B The input type that you want.

## Typeparam

R The output type.

## Type parameters

• **A**

• **B**

• **R**

## Parameters

• **fn**: [`Transform`](Transform.md)\<`A`, `R`\>

The Transform function that you have.

## Returns

[`Transform`](Transform.md)\<`B`, `R`\>

## Source

[func.ts:32](https://github.com/softcraft-development/typonomy/blob/c30f5566e83e88e3863d7deac9a23d3cd7721621/src/func.ts#L32)
