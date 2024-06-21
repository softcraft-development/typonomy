[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / transformSome

# Function: transformSome()

> **transformSome**\<`F`, `T`\>(`value`, `transform`): [`Some`](../type-aliases/Some.md)\<`T`\>

Transforms `Some<F>` to `Some<T>`.
If the value is plural, transform each element into a new `T[]`

## Type parameters

• **F**

• **T**

## Parameters

• **value**: [`Some`](../type-aliases/Some.md)\<`F`\>

The `Some<F>` to transform.

• **transform**: [`Transform`](../type-aliases/Transform.md)\<`F`, `T`\>

The transform function to apply.

## Returns

[`Some`](../type-aliases/Some.md)\<`T`\>

The transformed `Some<T>`.

## Source

[arrays.ts:134](https://github.com/softcraft-development/typonomy/blob/9e2d0980378fcdcaa426a5b6cdba20880ae25840/src/arrays.ts#L134)
