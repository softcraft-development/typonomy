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

[arrays.ts:112](https://github.com/softcraft-development/typonomy/blob/e1364998248d4274156807a851bf36cc6159b829/src/arrays.ts#L112)
