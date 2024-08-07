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

• **callback**: [`Combine`](../type-aliases/Combine.md)\<[`Defined`](../type-aliases/Defined.md)\<`T`\>, `number`, `void`\>

The callback function to apply. If `some` is singular, then the index will be `0`.

## Returns

`void`

## Source

[some.ts:33](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/some.ts#L33)
