[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / forSome

# Function: forSome()

> **forSome**\<`T`\>(`some`, `callback`): `void`

Apply a callback to each element in a `Some<T>`,
unless the callback throws `BreakException`,
in which case further execution halts.

## Type parameters

• **T**

The type of value(s).

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`T`\>

The `Some<T>` to apply.

• **callback**

The callback function to apply. If `some` is singular, then the index will be `0`.

## Returns

`void`

## Source

[arrays.ts:146](https://github.com/softcraft-development/typonomy/blob/30acaf0c9fc726297ecfec68c62e8d1edc67bc52/src/arrays.ts#L146)
