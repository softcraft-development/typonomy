[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / onBreakExecution

# Function: onBreakExecution()

> **onBreakExecution**\<`R`\>(`exception`, `returnValue`): `R`

Return a value if the exception is a `BreakExecution`, or (re)throw it otherwise.
The typical use case is to call this from a `catch(exception)` block where `BreakExecution` is expected.

## Type parameters

• **R**

The type of the return value.

## Parameters

• **exception**: `unknown`

Any object, which is expected to

• **returnValue**: `R`

The value to return if the exception is a `BreakExecution`.

## Returns

`R`

The `returnValue` if the exception is a `BreakExecution`; otherwise `exception` is thrown.

## Throws

The `exception` if it is not a `BreakExecution`.

## Source

[break.ts:55](https://github.com/softcraft-development/typonomy/blob/fe50b8023c82b88ddae1a279519fbfc3eededb46/src/break.ts#L55)
