[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / unyrruc

# Function: unyrruc()

> **unyrruc**\<`A`, `B`, `R`\>(`curried`): [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

Convert a curried function into a `Combine` function.
The function to uncurry is a `Transform` that returns a `Transform`.
The parameter to the first `Transform` becomes the first parameter of the resulting Combine function.
`uncurry` is thus the opposite transformation of `curry`,
and so converts two arity-1 functions into an arity-2 function.

See also:
  * `uncurry`, which does the same, except with the opposite argument order.
  * `yrruc`, which does the opposite transformation.

## Type parameters

• **A**

• **B**

• **R**

## Parameters

• **curried**: [`Transform`](../type-aliases/Transform.md)\<`B`, [`Transform`](../type-aliases/Transform.md)\<`A`, `R`\>\>

The function to uncurry.

## Returns

[`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

A `Combine` whose first parameter is that of the first curried Transform,
 and second parameter is that of the resulting Transform.

## Source

[fp.ts:380](https://github.com/softcraft-development/typonomy/blob/eea886e2cab97560257369acf8e7d17e5016c6e5/src/fp.ts#L380)
