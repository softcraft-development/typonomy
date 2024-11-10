[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / forArray

# Function: forArray()

> **forArray**\<`T`\>(`array`, `callback`): `void`

Apply a callback to each element in an array,
unless the callback throws `BreakExecution`,
in which case further execution halts.

## Type parameters

• **T**

The type of elements in the array.

## Parameters

• **array**: `T`[]

The array to iterate over.

• **callback**

The callback function to apply to each element and index.

## Returns

`void`

## Source

[arrays.ts:68](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/arrays.ts#L68)
