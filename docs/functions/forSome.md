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

[arrays.ts:119](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/arrays.ts#L119)
