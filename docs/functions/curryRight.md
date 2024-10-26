[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / curryRight

# Function: curryRight()

> **curryRight**\<`A`, `B`, `C`, `R`\>(`fn`): [`Transform`](../type-aliases/Transform.md)\<`C`, [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>\>

Convert an arity-3 function into a Transform function.
This function transforms the third argument of the function
into a Combine function for the first and second arguments.
Thus, `curryMiddle` converts an arity-3 function into an arity-1 function and arity-2 function.
To fully curry the original function, pass the results into `curry` or `yrruc` as appropriate.

See also `curryLeft` and `curryMiddle`, which do the same for the first and second arguments, respectively.

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

[`Transform`](../type-aliases/Transform.md)\<`C`, [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>\>

A curried function that takes the third argument
 and returns a function that takes the first and second arguments.

## Source

[fp.ts:198](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/fp.ts#L198)
