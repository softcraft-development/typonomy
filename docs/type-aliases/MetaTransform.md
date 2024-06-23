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

[func.ts:46](https://github.com/softcraft-development/typonomy/blob/b0e16bd041f316a076ebba1edb1d4cf521b110ee/src/func.ts#L46)
