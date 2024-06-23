[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / BreakExecution

# Class: BreakExecution

A signal to break out of the typical execution flow.
Typonomy iteration functions (which typically start with `for*`, `map*`, or `reduce*`) will `catch` this signal
and use it to short-circuit the iteration.
Note that this looks like an `Error`, and can be `throw`n and `catch`ed like one, but is not an `Error`.

## Constructors

### new BreakExecution()

> **new BreakExecution**(`message`): [`BreakExecution`](BreakExecution.md)

Creates a new instance of the BreakExecution class.

#### Parameters

• **message**: `string`= `"Break Execution"`

#### Returns

[`BreakExecution`](BreakExecution.md)

#### Source

[func.ts:105](https://github.com/softcraft-development/typonomy/blob/37d2aadc75ec0bb1bcd45938f3aae7730dc0182e/src/func.ts#L105)

## Properties

### message

> **message**: `string`

#### Source

[func.ts:100](https://github.com/softcraft-development/typonomy/blob/37d2aadc75ec0bb1bcd45938f3aae7730dc0182e/src/func.ts#L100)

## Methods

### toString()

> **toString**(): `string`

Returns the break message.

#### Returns

`string`

The `message` used to construct the `BreakExecution`.

#### Source

[func.ts:113](https://github.com/softcraft-development/typonomy/blob/37d2aadc75ec0bb1bcd45938f3aae7730dc0182e/src/func.ts#L113)
