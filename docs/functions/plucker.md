[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / plucker

# Function: plucker()

> **plucker**\<`T`, `K`\>(`property`): [`Transform`](../type-aliases/Transform.md)\<`T`, `T`\[`K`\]\>

Returns a Transform that extracts the specified property from an object.

## Type parameters

• **T**

The type of the object that contains the property.

• **K** *extends* `string` \| `number` \| `symbol`

The key of T to extract. Note that this should be the same value as the `property`.

## Parameters

• **property**: `K`

The name of the property to extract. Note that this should be the same value as `K`

## Returns

[`Transform`](../type-aliases/Transform.md)\<`T`, `T`\[`K`\]\>

A transform function that takes an object and returns the value of the specified property.

## Source

[objects.ts:108](https://github.com/softcraft-development/typonomy/blob/dfbcc96600b9b9b8c6faf47f3caef423e4f1568c/src/objects.ts#L108)
