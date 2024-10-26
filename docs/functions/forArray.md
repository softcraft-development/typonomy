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

[arrays.ts:68](https://github.com/softcraft-development/typonomy/blob/d8b6722e8f9213512ecbf239a27330f22316ef6d/src/arrays.ts#L68)
