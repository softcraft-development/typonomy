[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / some

# Function: some()

> **some**\<`T`\>(...`predicates`): [`Predicate`](../type-aliases/Predicate.md)\<`T`\>

Create a Predicate that returns true if any input `Predicate` is true.

## Type parameters

• **T**

The type of value to test.

## Parameters

• ...**predicates**: [`Predicate`](../type-aliases/Predicate.md)\<`T`\>[]

The `Predicate` to test against.

## Returns

[`Predicate`](../type-aliases/Predicate.md)\<`T`\>

A `Predicate` that returns true if any input `Predicate` are true.

## Source

[logic.ts:51](https://github.com/softcraft-development/typonomy/blob/71207c5f8a51cd78ebdeff79293f44e522cae748/src/logic.ts#L51)
