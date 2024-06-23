[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / typeGuardValue

# Function: typeGuardValue()

> **typeGuardValue**\<`T`\>(`obj`, `checkEquality`?): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

Creates a type guard function that checks if a value is mapped to a key in the object, record, or enum.

## Type parameters

• **T** *extends* `Record`\<`string`, `unknown`\>

The type to guard.

## Parameters

• **obj**: `Record`\<`string`, `unknown`\>

The object with keys mapped to values.

• **checkEquality?**: [`Combine`](../type-aliases/Combine.md)\<`unknown`, `unknown`, `boolean`\>= `undefined`

A function to compare object values to the target value.

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

- The type guard for the object,
 which returns `true` if the value is mapped to a key in `obj`, and `false` otherwise.

## Source

[objects.ts:151](https://github.com/softcraft-development/typonomy/blob/b0e16bd041f316a076ebba1edb1d4cf521b110ee/src/objects.ts#L151)
