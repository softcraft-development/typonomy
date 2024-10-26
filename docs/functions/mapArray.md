[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / mapArray

# Function: mapArray()

> **mapArray**\<`T`, `R`\>(`array`, `mapper`): `R`[]

Transform an array of one type to another type.
Note that the output array will have the same number of elements as the input array
unless the mapper throws a `BreakExecution`.

## Type parameters

• **T**

The type of the elements in the input array.

• **R**

The type of the elements in the output array.

## Parameters

• **array**: `T`[]

The input array.

• **mapper**: [`Mapper`](../type-aliases/Mapper.md)\<[`Optional`](../type-aliases/Optional.md)\<`T`\>, `R`\>

The function to transform one element type to the other.

## Returns

`R`[]

The mapped array.

## Source

[arrays.ts:111](https://github.com/softcraft-development/typonomy/blob/cee340f062935faae6d8d20bbf994df4a652481c/src/arrays.ts#L111)
