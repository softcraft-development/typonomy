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

[arrays.ts:111](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/arrays.ts#L111)
