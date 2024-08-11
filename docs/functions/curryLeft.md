[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / curryLeft

# Function: curryLeft()

> **curryLeft**\<`A`, `B`, `C`, `R`\>(`fn`): [`Transform`](../type-aliases/Transform.md)\<`A`, [`Combine`](../type-aliases/Combine.md)\<`B`, `C`, `R`\>\>

Convert an arity-3 function into a Transform function.
This function transforms the first argument of the function
into a Combine function for the second and third arguments.
Thus, `curryLeft` converts an arity-3 function into an arity-1 function and arity-2 function.
To fully curry the original function, pass the results into `curry` or `yrruc` as appropriate.

See also `curryMiddle` and `curryRight`, which do the same for the second and third arguments, respectively.

## Type parameters

• **A**

The type of the first argument of the input function.

• **B**

The type of the second argument of the input function.

• **C**

The type of the third argument of the input function.

• **R**

The return type of the function.

## Parameters

• **fn**

The function to curry.

## Returns

[`Transform`](../type-aliases/Transform.md)\<`A`, [`Combine`](../type-aliases/Combine.md)\<`B`, `C`, `R`\>\>

A curried function that takes the first argument
 and returns a function that takes the second and third arguments.

## Source

[fp.ts:158](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/fp.ts#L158)
