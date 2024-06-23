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

[func.ts:291](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/func.ts#L291)
