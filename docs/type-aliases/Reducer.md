[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / Reducer

# Type alias: Reducer()\<S, V, K\>

> **Reducer**\<`S`, `V`, `K`\>: (`state`, `value`, `key`) => `S`

A function combines a previous state, a value, and a key into a new state.
Since the old and new state are of the same type, this "reduces" the value and key into the new state.

## Type parameters

• **S**

The type of the state.

• **V**

The type of the value.

• **K**

The type of the key.
 Typically a string, though frequently a number, in which case it's often called an "index".

## Parameters

• **state**: `S`

The current state. Note that this value may be mutated, depending on the reducer.

• **value**: `V`

The value to be applied to the state.

• **key**: `K`

The key or index associated with the value.

## Returns

`S`

## Source

[func.ts:43](https://github.com/softcraft-development/typonomy/blob/ac449b6265e0e88e666105085e6c109ec445538b/src/func.ts#L43)
