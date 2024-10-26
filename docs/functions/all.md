[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / all

# Function: all()

> **all**\<`T`\>(...`predicates`): [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

Create a `Predicate` that returns true if all input `Predicate` are true.

## Type parameters

• **T**

The type of value to test.

## Parameters

• ...**predicates**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>[]

The `Predicate` to test against.

## Returns

[`Predicate`](../type-aliases/Predicate.md)\<`T`\>

A `Predicate` that returns true if all input `Predicate` are true.

## Source

[logic.ts:9](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/logic.ts#L9)
