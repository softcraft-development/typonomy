[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / uncurry

# Function: uncurry()

> **uncurry**\<`A`, `B`, `R`\>(`curried`): [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

Convert a curried function into a `Combine` function.
The function to uncurry is a `Transform` that returns a `Transform`.
The parameter to the first `Transform` becomes the first parameter of the resulting Combine function.
`uncurry` is thus the opposite transformation of `curry`.

## Type parameters

• **A**

• **B**

• **R**

## Parameters

• **curried**: [`Transform`](../type-aliases/Transform.md)\<`A`, [`Transform`](../type-aliases/Transform.md)\<`B`, `R`\>\>

The function to uncurry.

## Returns

[`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

A `Combine` whose first parameter is that of the first curried Transform,
 and second parameter is that of the resulting Transform.

## Source

[fp.ts:362](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/fp.ts#L362)
