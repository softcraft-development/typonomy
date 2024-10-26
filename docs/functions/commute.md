[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / commute

# Function: commute()

> **commute**\<`A`, `B`, `R`\>(`combine`): [`Combine`](../type-aliases/Combine.md)\<`B`, `A`, `R`\>

Swap the argument order of a Combine (arity-2) function.

## Type parameters

• **A**

The type of the first argument of the input Combine.

• **B**

The type of the second argument of the input Combine.

• **R**

The return type of the function.

## Parameters

• **combine**: [`Combine`](../type-aliases/Combine.md)\<`A`, `B`, `R`\>

The function to commute.

## Returns

[`Combine`](../type-aliases/Combine.md)\<`B`, `A`, `R`\>

A new Combine that takes the arguments in reverse order.

## Source

[fp.ts:13](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/fp.ts#L13)
