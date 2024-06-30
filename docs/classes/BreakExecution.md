[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / BreakExecution

# Class: BreakExecution

A signal to break out of the typical execution flow, and optionally include a final result.
Typonomy iteration functions (which typically start with `for*`, `map*`, or `reduce*`) will `catch` this signal
and use it to short-circuit the iteration.
Note that this looks like an `Error`, and can be `throw`n and `catch`ed like one, but is not an `Error`.

## Constructors

### new BreakExecution()

> **new BreakExecution**(`message`): [`BreakExecution`](BreakExecution.md)

Creates a new instance of the BreakExecution class.

#### Parameters

• **message**: `string`= `"Break Execution"`

The reason why execution was aborted. Defaults to "Break Execution".

#### Returns

[`BreakExecution`](BreakExecution.md)

#### Source

[break.ts:18](https://github.com/softcraft-development/typonomy/blob/fe50b8023c82b88ddae1a279519fbfc3eededb46/src/break.ts#L18)

## Properties

### message

> `readonly` **message**: `string`

The reason why execution was aborted.

#### Source

[break.ts:12](https://github.com/softcraft-development/typonomy/blob/fe50b8023c82b88ddae1a279519fbfc3eededb46/src/break.ts#L12)

## Methods

### toString()

> **toString**(): `string`

Returns the break message.

#### Returns

`string`

The `message` used to construct the `BreakExecution`.

#### Source

[break.ts:26](https://github.com/softcraft-development/typonomy/blob/fe50b8023c82b88ddae1a279519fbfc3eededb46/src/break.ts#L26)
