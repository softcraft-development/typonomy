[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / curry

# Function: curry()

> **curry**\<`A`, `B`, `R`\>(`combine`): [`Transform`](../type-aliases/Transform.md)\<`A`, [`Transform`](../type-aliases/Transform.md)\<`B`, `R`\>\>

Convert a Combine function into a Transform function.
This function transforms the first argument of the Combine function into another Transform function.
In turn, this second function transforms the second Combine argument into the return value.
Thus, `curry` converts an arity-2 function into two arity-1 functions.

See also:
  * `yrruc`, which does the same, except with the opposite argument order.
  * `uncurry`, which does the opposite transformation.

## Type parameters

• **A**

• **B**

• **R**

## Parameters

• **combine**: [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

The function to curry.

## Returns

[`Transform`](../type-aliases/Transform.md)\<`A`, [`Transform`](../type-aliases/Transform.md)\<`B`, `R`\>\>

A curried function that takes the first argument and returns a function that takes the second argument.

## Source

[fp.ts:138](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/fp.ts#L138)
