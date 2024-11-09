[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / yrruc

# Function: yrruc()

> **yrruc**\<`A`, `B`, `R`\>(`combine`): [`Transform`](../type-aliases/Transform.md)\<`B`, [`Transform`](../type-aliases/Transform.md)\<`A`, `R`\>\>

Convert a Combine function into a Transform function.
This function transforms the second argument of the Combine function into another Transform function.
In turn, this second function transforms the first Combine argument into the return value.
Thus, `curry` converts an arity-2 function into two arity-1 functions.

See also:
  * `curry`, which does the same, except with the opposite argument order.
  * `uncurry`, which does the opposite transformation.

## Type parameters

• **A**

• **B**

• **R**

## Parameters

• **combine**: [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

The function to curry.

## Returns

[`Transform`](../type-aliases/Transform.md)\<`B`, [`Transform`](../type-aliases/Transform.md)\<`A`, `R`\>\>

A curried function that takes the second argument and returns a function that takes the first argument.

## Source

[fp.ts:397](https://github.com/softcraft-development/typonomy/blob/eea886e2cab97560257369acf8e7d17e5016c6e5/src/fp.ts#L397)
