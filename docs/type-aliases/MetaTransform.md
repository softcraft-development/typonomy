[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / MetaTransform

# Type alias: MetaTransform()\<A, B, R\>

> **MetaTransform**\<`A`, `B`, `R`\>: (`fn`) => [`Transform`](Transform.md)\<`B`, `R`\>

A function that transforms one Transform function into another.
If you want a function that transforms one type <B> to another type <R>,
but only know/have a function that converts another type <A> to that same type <R>,
a MetaTransform will help get you from <A> to <B>.

## Type parameters

• **A**

The input type that you have.

• **B**

The input type that you want.

• **R**

The output type.

## Parameters

• **fn**: [`Transform`](Transform.md)\<`A`, `R`\>

The Transform function that you have.

## Returns

[`Transform`](Transform.md)\<`B`, `R`\>

## Source

[types.ts:119](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/types.ts#L119)
