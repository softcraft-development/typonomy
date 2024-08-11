[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / transformIf

# Function: transformIf()

> **transformIf**\<`T`, `X`, `R`\>(`typeGuard`, `transform`, `fallback`): [`Transform`](../type-aliases/Transform.md)\<`T` \| `X`, `R`\>

If a `value` of type `X` matches the type guard for `T`, then transform it using `Transform<T,R>`.
Otherwise, transform it using the `fallback` `Transform<X,R>`.

Note that `Transform` functions do not necessarily need to consider their input values,
i.e.: they can be `Thunk<R>`.
This is useful for returning default values, especially for the `fallback` transform.

If `R` is `void`, then the transforms can be callbacks, ie: `Action<T>` and `Action<X>`.

## Type parameters

• **T**

The type to be checked by the type guard.

• **X**

The type of the input value.

• **R**

The type of the transformed value.

## Parameters

• **typeGuard**: [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

The `TypeGuard<T> used to check the value.
@param transform - The transform to apply to the value if the type guard returns `true`.
@param fallback - The transform to  apply to the value if the type guard returns `false`.

• **transform**: [`Transform`](../type-aliases/Transform.md)\<`T`, `R`\>

• **fallback**: [`Transform`](../type-aliases/Transform.md)\<`X`, `R`\>

## Returns

[`Transform`](../type-aliases/Transform.md)\<`T` \| `X`, `R`\>

- The transformed value or the default value.

## Source

[fp.ts:332](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/fp.ts#L332)
