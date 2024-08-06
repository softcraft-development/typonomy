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

[types.ts:17](https://github.com/softcraft-development/typonomy/blob/c5db2fa8cb85771ae57ef1e5ca7f405fc63a6f0d/src/types.ts#L17)
