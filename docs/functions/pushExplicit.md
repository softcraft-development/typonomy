[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / pushExplicit

# Function: pushExplicit()

> **pushExplicit**\<`T`\>(`array`, `value`): [`Explicit`](../type-aliases/Explicit.md)\<`T`\>[]

If the `value` is not null or undefined, push it into the existing array.
Otherwise, return the array unchanged.

## Type parameters

• **T**

The type of elements in the array.

## Parameters

• **array**: `Exclude`\<`T`, [`Nullish`](../type-aliases/Nullish.md)\>[]

The array to mutate.

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The new element.

## Returns

[`Explicit`](../type-aliases/Explicit.md)\<`T`\>[]

- The array, which includes the value if it is not `null` or `undefined`.

## Source

[arrays.ts:127](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/arrays.ts#L127)
