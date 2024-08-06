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

[fp.ts:302](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/fp.ts#L302)
