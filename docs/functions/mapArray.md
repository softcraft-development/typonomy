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

[arrays.ts:205](https://github.com/softcraft-development/typonomy/blob/a62fc03e32b184f07c3799ae239136e6b1077839/src/arrays.ts#L205)
