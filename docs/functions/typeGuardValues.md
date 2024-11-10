[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / typeGuardValues

# Function: typeGuardValues()

> **typeGuardValues**\<`T`\>(`obj`, `checkEquality`?): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\[keyof `T`\]\>

Creates a type guard function that checks if a value is mapped to a key in the object.
Typically used for enum type guards, where the values are the primary constituents of the enum.
Also works for other key-value maps like `object` and `Record`,
though it makes less sense to base a type guard on mapped values for those types.

## Type parameters

• **T** *extends* `object`

The type to guard.

## Parameters

• **obj**: `T`

The object with keys mapped to values.

• **checkEquality?**: [`Combine`](../type-aliases/Combine.md)\<`unknown`, `unknown`, `boolean`\>= `undefined`

A function to compare object values to the target value.

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\[keyof `T`\]\>

- The type guard for the object,
 which returns `true` if the value is mapped to a key in `obj`, and `false` otherwise.

## Source

[objects.ts:240](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/objects.ts#L240)
