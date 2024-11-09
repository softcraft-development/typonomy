[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / Bag

# Type alias: Bag\<T\>

> **Bag**\<`T`\>: `undefined` \| `T` \| `T`[]

Zero, one, or more values of type `T`.
Zero values are represented as `undefined`.
One value is represented as `T`.
More than one value is represented as `Array<T>`.
Note that, if `T` itself includes `undefined`, then `Bag<T>` could be `Array<T | undefined>`.

## Type parameters

• **T**

The type of value.

## Source

[types.ts:17](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/types.ts#L17)
