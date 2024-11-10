[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / convertToJson

# Function: convertToJson()

> **convertToJson**(`value`, `onUnconvertible`): [`Json`](../type-aliases/Json.md)

Converts an arbitrary value to `Json` as best as possible.
* Some values are preserved as-is:
  *  `null`
  *  `string`
  *  `boolean`
  *  `number` if they are `Finite`.
* Arrays are recursively converted to `Json[]`.
* Objects are recursively converted to `Record<string, Json>`.
  * Keys are converted to strings.
* Any other value becomes `null`, including:
  * `undefined`
  * `NaN`
  * `Infinity`
  * `-Infinity`

## Parameters

• **value**: `unknown`

The value to convert.

• **onUnconvertible**: [`Transform`](../type-aliases/Transform.md)\<`unknown`, [`Json`](../type-aliases/Json.md)\>= `undefined`

## Returns

[`Json`](../type-aliases/Json.md)

A `Json` value that represents the input value.

## Source

[json.ts:28](https://github.com/softcraft-development/typonomy/blob/1c47fc13034f4e53267c72ada03a418616dc092e/src/json.ts#L28)
