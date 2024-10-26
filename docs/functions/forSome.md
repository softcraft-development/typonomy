[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / forSome

# Function: forSome()

> **forSome**\<`T`\>(`some`, `callback`): `void`

Apply a callback to each element in a `Some<T>`,
unless the callback breaks execution.

## Type parameters

• **T**

The type of value in the `Some`.

## Parameters

• **some**: [`Some`](../type-aliases/Some.md)\<`T`\>

The `Some<T>` on which to apply the callback.

• **callback**: [`Combine`](../type-aliases/Combine.md)\<[`Defined`](../type-aliases/Defined.md)\<`T`\>, `number`, `void`\>

The callback function to apply. If `some` is singular, then the index will be `0`.

## Returns

`void`

## Source

[some.ts:31](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/some.ts#L31)
