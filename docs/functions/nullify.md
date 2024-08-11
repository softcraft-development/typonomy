[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / nullify

# Function: nullify()

> **nullify**\<`T`\>(`value`): [`Nullable`](../type-aliases/Nullable.md)\<`T`\>

Converts undefined to null, or returns the original value.

## Type parameters

• **T**

## Parameters

• **value**: [`Possible`](../type-aliases/Possible.md)\<`T`\>

The value to convert.

## Returns

[`Nullable`](../type-aliases/Nullable.md)\<`T`\>

`null` if the value is `undefined`, or the original value otherwise.

## Source

[typeGuards.ts:257](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/typeGuards.ts#L257)
