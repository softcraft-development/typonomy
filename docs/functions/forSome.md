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

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`T`\>

The `Some<T>` to apply.

• **callback**

The callback function to apply. If `some` is singular, then the index will be `0`.

## Returns

`void`

## Source

[arrays.ts:129](https://github.com/softcraft-development/typonomy/blob/b0e16bd041f316a076ebba1edb1d4cf521b110ee/src/arrays.ts#L129)
