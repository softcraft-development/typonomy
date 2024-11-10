[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / reduceIf

# Function: reduceIf()

> **reduceIf**\<`S`, `V`, `X`, `K`\>(`typeGuard`, `reducer`): [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V` \| `X`, `K`\>

Reduce a `value` if it matches the type guard for `V`.
Otherwise, ignore it and return the current state.

## Type parameters

• **S**

The type of the state.

• **V**

The type of value to reduce.

• **X**

The type of value to ignore.

• **K**

The type of the key.

## Parameters

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`V`\>

The `TypeGuard<V>` to check if the value should be reduced.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `K`\>

The `Reducer<S,V,K>` to reduce matching values.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`S`, `V` \| `X`, `K`\>

A Reducer that accepts either `V` or `X` values.

## Source

[fp.ts:301](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/fp.ts#L301)
