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

## Parameters

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`V`\>

The `TypeGuard<V>` to check if the value should be reduced.

• **reducer**: [`Reducer`](../type-aliases/Reducer.md)\<`S`, `V`, `K`\>

The `Reducer<S,V,K>` to reduce matching values.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`S`, `V` \| `X`, `K`\>

The final state.

## Source

[fp.ts:302](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/fp.ts#L302)
