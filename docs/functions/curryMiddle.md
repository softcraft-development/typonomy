[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / curryMiddle

# Function: curryMiddle()

> **curryMiddle**\<`A`, `B`, `C`, `R`\>(`fn`): [`Transform`](../type-aliases/Transform.md)\<`B`, [`Combine`](../type-aliases/Combine.md)\<`A`, `C`, `R`\>\>

Convert an arity-3 function into a Transform function.
This function transforms the second argument of the function
into a Combine function for the first and third arguments.
Thus, `curryMiddle` converts an arity-3 function into an arity-1 function and arity-2 function.
To fully curry the original function, pass the results into `curry` or `yrruc` as appropriate.

See also `curryLeft` and `curryRight`, which do the same for the first and third arguments, respectively.

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

[`Transform`](../type-aliases/Transform.md)\<`B`, [`Combine`](../type-aliases/Combine.md)\<`A`, `C`, `R`\>\>

A curried function that takes the second argument
 and returns a function that takes the first and third arguments.

## Source

[fp.ts:178](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/fp.ts#L178)
