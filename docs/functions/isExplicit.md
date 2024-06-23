[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / isExplicit

# Function: isExplicit()

> **isExplicit**\<`T`\>(`value`): `value is Explicit<T>`

Checks if a value is not `Nullish`.

## Type parameters

• **T**

The type when it is not `null` or `undefined`.

## Parameters

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The value to check.

## Returns

`value is Explicit<T>`

`false` if the value is `null` or `undefined`; `true` otherwise.

## Source

[typeGuards.ts:56](https://github.com/softcraft-development/typonomy/blob/a62fc03e32b184f07c3799ae239136e6b1077839/src/typeGuards.ts#L56)
