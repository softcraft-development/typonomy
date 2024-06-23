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

• **mapper**: [`IndexedMapper`](../type-aliases/IndexedMapper.md)\<`T`, `R`\>

The `Mapper` to transform one element type to the other.

## Returns

`R`[]

The mapped array.

## Source

[arrays.ts:196](https://github.com/softcraft-development/typonomy/blob/cac11b20828d50b550eeacd6b4954a5f2aa411b3/src/arrays.ts#L196)
